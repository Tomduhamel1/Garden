-- DATABASE MIGRATION: Fix Schema Field Names
-- Purpose: Move data from wrong field names to correct UCD-compliant field names
-- Target: All existing orders with CDF data

-- CRITICAL: This migration preserves existing user data that would otherwise be lost

BEGIN;

-- Function to migrate a single line item's field names
CREATE OR REPLACE FUNCTION migrate_line_item_fields(line_data JSONB) 
RETURNS JSONB AS $$
DECLARE
  result JSONB := line_data;
BEGIN
  -- Move borrower_amount → paid_by_borrower (preserve existing paid_by_borrower)
  IF line_data ? 'borrower_amount' AND (line_data->>'borrower_amount')::NUMERIC > 0 THEN
    result := jsonb_set(result, '{paid_by_borrower}', line_data->'borrower_amount');
  END IF;
  
  -- Move seller_amount → paid_by_seller (preserve existing paid_by_seller)  
  IF line_data ? 'seller_amount' AND (line_data->>'seller_amount')::NUMERIC > 0 THEN
    result := jsonb_set(result, '{paid_by_seller}', line_data->'seller_amount');
  END IF;
  
  -- Move paid_by_others_amount → paid_by_others
  IF line_data ? 'paid_by_others_amount' AND (line_data->>'paid_by_others_amount')::NUMERIC > 0 THEN
    result := jsonb_set(result, '{paid_by_others}', line_data->'paid_by_others_amount');
  END IF;
  
  -- Move before_borrower_amount → paid_before_closing (accumulate if both exist)
  IF line_data ? 'before_borrower_amount' AND (line_data->>'before_borrower_amount')::NUMERIC > 0 THEN
    IF line_data ? 'before_seller_amount' AND (line_data->>'before_seller_amount')::NUMERIC > 0 THEN
      -- Add both before amounts together
      result := jsonb_set(result, '{paid_before_closing}', 
        to_jsonb((COALESCE((line_data->>'before_borrower_amount')::NUMERIC, 0) + 
                  COALESCE((line_data->>'before_seller_amount')::NUMERIC, 0))));
    ELSE
      result := jsonb_set(result, '{paid_before_closing}', line_data->'before_borrower_amount');
    END IF;
  ELSIF line_data ? 'before_seller_amount' AND (line_data->>'before_seller_amount')::NUMERIC > 0 THEN
    result := jsonb_set(result, '{paid_before_closing}', line_data->'before_seller_amount');
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to migrate all line items in a section
CREATE OR REPLACE FUNCTION migrate_section_fields(section_data JSONB)
RETURNS JSONB AS $$
DECLARE
  result JSONB := section_data;
  line_key TEXT;
  line_data JSONB;
BEGIN
  -- Process each line_XX key in the section
  FOR line_key IN SELECT jsonb_object_keys(section_data) WHERE jsonb_object_keys(section_data) LIKE 'line_%'
  LOOP
    line_data := section_data->line_key;
    result := jsonb_set(result, ARRAY[line_key], migrate_line_item_fields(line_data));
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Main migration: Process all orders
UPDATE orders 
SET cdf_data = (
  SELECT jsonb_build_object(
    'origination_charges', 
      CASE WHEN cdf_data ? 'origination_charges' 
           THEN migrate_section_fields(cdf_data->'origination_charges')
           ELSE cdf_data->'origination_charges' END,
    'services_borrower_did_not_shop_for',
      CASE WHEN cdf_data ? 'services_borrower_did_not_shop_for'
           THEN migrate_section_fields(cdf_data->'services_borrower_did_not_shop_for')
           ELSE cdf_data->'services_borrower_did_not_shop_for' END,
    'services_borrower_did_shop_for',
      CASE WHEN cdf_data ? 'services_borrower_did_shop_for'
           THEN migrate_section_fields(cdf_data->'services_borrower_did_shop_for')
           ELSE cdf_data->'services_borrower_did_shop_for' END,
    'taxes_and_government_fees',
      CASE WHEN cdf_data ? 'taxes_and_government_fees'
           THEN migrate_section_fields(cdf_data->'taxes_and_government_fees')
           ELSE cdf_data->'taxes_and_government_fees' END,
    'prepaid_item_information',
      CASE WHEN cdf_data ? 'prepaid_item_information'
           THEN migrate_section_fields(cdf_data->'prepaid_item_information')
           ELSE cdf_data->'prepaid_item_information' END,
    'escrow_information',
      CASE WHEN cdf_data ? 'escrow_information'
           THEN migrate_section_fields(cdf_data->'escrow_information')
           ELSE cdf_data->'escrow_information' END,
    'other_charges',
      CASE WHEN cdf_data ? 'other_charges'
           THEN migrate_section_fields(cdf_data->'other_charges')
           ELSE cdf_data->'other_charges' END
  ) || (cdf_data - ARRAY['origination_charges', 'services_borrower_did_not_shop_for', 'services_borrower_did_shop_for', 'taxes_and_government_fees', 'prepaid_item_information', 'escrow_information', 'other_charges'])
)
WHERE cdf_data IS NOT NULL;

-- Verification queries to check migration results
-- SELECT 'Migration Summary' as status;
-- SELECT 
--   count(*) as total_orders_with_cdf_data,
--   count(*) FILTER (WHERE cdf_data->'origination_charges'->'line_01' ? 'paid_by_borrower') as orders_with_migrated_origination_data
-- FROM orders WHERE cdf_data IS NOT NULL;

-- Clean up functions
DROP FUNCTION IF EXISTS migrate_line_item_fields(JSONB);
DROP FUNCTION IF EXISTS migrate_section_fields(JSONB);

COMMIT;

-- Success message
SELECT 'Schema migration completed successfully! Old field data has been moved to UCD-compliant field names.' as result;