-- SIMPLIFIED DATABASE MIGRATION: Fix Schema Field Names
-- Purpose: Move data from wrong field names to correct UCD-compliant field names

BEGIN;

-- Direct JSONB update approach for each section and line
UPDATE orders 
SET cdf_data = cdf_data 
  -- Origination Charges Section
  || jsonb_build_object('origination_charges', 
      COALESCE(cdf_data->'origination_charges', '{}'::jsonb)
      -- Line 01
      || CASE WHEN cdf_data->'origination_charges'->'line_01' ? 'borrower_amount' 
              THEN jsonb_build_object('line_01', 
                    COALESCE(cdf_data->'origination_charges'->'line_01', '{}'::jsonb)
                    || jsonb_build_object('paid_by_borrower', cdf_data->'origination_charges'->'line_01'->'borrower_amount')
                    || CASE WHEN cdf_data->'origination_charges'->'line_01' ? 'seller_amount'
                           THEN jsonb_build_object('paid_by_seller', cdf_data->'origination_charges'->'line_01'->'seller_amount')
                           ELSE '{}'::jsonb END
                    || CASE WHEN cdf_data->'origination_charges'->'line_01' ? 'paid_by_others_amount'
                           THEN jsonb_build_object('paid_by_others', cdf_data->'origination_charges'->'line_01'->'paid_by_others_amount')
                           ELSE '{}'::jsonb END
                    || CASE WHEN cdf_data->'origination_charges'->'line_01' ? 'before_borrower_amount'
                           THEN jsonb_build_object('paid_before_closing', cdf_data->'origination_charges'->'line_01'->'before_borrower_amount')
                           ELSE '{}'::jsonb END
                   )
              ELSE '{}'::jsonb END
      -- Line 02 
      || CASE WHEN cdf_data->'origination_charges'->'line_02' ? 'borrower_amount' 
              THEN jsonb_build_object('line_02', 
                    COALESCE(cdf_data->'origination_charges'->'line_02', '{}'::jsonb)
                    || jsonb_build_object('paid_by_borrower', cdf_data->'origination_charges'->'line_02'->'borrower_amount')
                    || CASE WHEN cdf_data->'origination_charges'->'line_02' ? 'seller_amount'
                           THEN jsonb_build_object('paid_by_seller', cdf_data->'origination_charges'->'line_02'->'seller_amount')
                           ELSE '{}'::jsonb END
                    || CASE WHEN cdf_data->'origination_charges'->'line_02' ? 'paid_by_others_amount'
                           THEN jsonb_build_object('paid_by_others', cdf_data->'origination_charges'->'line_02'->'paid_by_others_amount')
                           ELSE '{}'::jsonb END
                    || CASE WHEN cdf_data->'origination_charges'->'line_02' ? 'before_borrower_amount'
                           THEN jsonb_build_object('paid_before_closing', cdf_data->'origination_charges'->'line_02'->'before_borrower_amount')
                           ELSE '{}'::jsonb END
                   )
              ELSE '{}'::jsonb END
      -- Line 03
      || CASE WHEN cdf_data->'origination_charges'->'line_03' ? 'borrower_amount' 
              THEN jsonb_build_object('line_03', 
                    COALESCE(cdf_data->'origination_charges'->'line_03', '{}'::jsonb)
                    || jsonb_build_object('paid_by_borrower', cdf_data->'origination_charges'->'line_03'->'borrower_amount')
                    || CASE WHEN cdf_data->'origination_charges'->'line_03' ? 'seller_amount'
                           THEN jsonb_build_object('paid_by_seller', cdf_data->'origination_charges'->'line_03'->'seller_amount')
                           ELSE '{}'::jsonb END
                    || CASE WHEN cdf_data->'origination_charges'->'line_03' ? 'paid_by_others_amount'
                           THEN jsonb_build_object('paid_by_others', cdf_data->'origination_charges'->'line_03'->'paid_by_others_amount')
                           ELSE '{}'::jsonb END
                    || CASE WHEN cdf_data->'origination_charges'->'line_03' ? 'before_borrower_amount'
                           THEN jsonb_build_object('paid_before_closing', cdf_data->'origination_charges'->'line_03'->'before_borrower_amount')
                           ELSE '{}'::jsonb END
                   )
              ELSE '{}'::jsonb END
     )
WHERE cdf_data IS NOT NULL 
  AND (
    cdf_data->'origination_charges'->'line_01' ? 'borrower_amount' OR
    cdf_data->'origination_charges'->'line_02' ? 'borrower_amount' OR  
    cdf_data->'origination_charges'->'line_03' ? 'borrower_amount'
  );

-- Quick verification
SELECT 
  id,
  jsonb_pretty(cdf_data->'origination_charges'->'line_01') as migrated_line_01,
  jsonb_pretty(cdf_data->'origination_charges'->'line_02') as migrated_line_02,
  jsonb_pretty(cdf_data->'origination_charges'->'line_03') as migrated_line_03
FROM orders 
WHERE cdf_data->'origination_charges' IS NOT NULL
LIMIT 1;

COMMIT;

SELECT 'CRITICAL: Origination Charges data migration completed! Check Closing Disclosure now.' as status;