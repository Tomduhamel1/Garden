-- Migration to convert other_charges from array to object format with line_XX keys
-- and update field names to match the new structure

UPDATE orders
SET cdf_data = jsonb_set(
  cdf_data,
  '{other_charges}',
  jsonb_build_object(
    'line_01', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->0->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->0->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->0->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->0->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->0->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->0->>'paid_by_others')::numeric, 0)
    ),
    'line_02', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->1->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->1->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->1->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->1->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->1->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->1->>'paid_by_others')::numeric, 0)
    ),
    'line_03', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->2->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->2->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->2->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->2->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->2->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->2->>'paid_by_others')::numeric, 0)
    ),
    'line_04', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->3->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->3->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->3->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->3->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->3->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->3->>'paid_by_others')::numeric, 0)
    ),
    'line_05', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->4->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->4->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->4->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->4->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->4->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->4->>'paid_by_others')::numeric, 0)
    ),
    'line_06', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->5->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->5->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->5->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->5->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->5->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->5->>'paid_by_others')::numeric, 0)
    ),
    'line_07', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->6->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->6->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->6->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->6->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->6->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->6->>'paid_by_others')::numeric, 0)
    ),
    'line_08', jsonb_build_object(
      'description', COALESCE(cdf_data->'other_charges'->7->>'description', ''),
      'payee_name', COALESCE(cdf_data->'other_charges'->7->>'payee_name', ''),
      'borrower_amount', COALESCE((cdf_data->'other_charges'->7->>'paid_by_borrower')::numeric, 0),
      'borrower_poc_amount', COALESCE((cdf_data->'other_charges'->7->>'paid_before_closing')::numeric, 0),
      'seller_amount', COALESCE((cdf_data->'other_charges'->7->>'paid_by_seller')::numeric, 0),
      'seller_poc_amount', 0,
      'other_amount', COALESCE((cdf_data->'other_charges'->7->>'paid_by_others')::numeric, 0)
    ),
    'line_09', jsonb_build_object(
      'description', '',
      'payee_name', '',
      'borrower_amount', 0,
      'borrower_poc_amount', 0,
      'seller_amount', 0,
      'seller_poc_amount', 0,
      'other_amount', 0
    ),
    'line_10', jsonb_build_object(
      'description', '',
      'payee_name', '',
      'borrower_amount', 0,
      'borrower_poc_amount', 0,
      'seller_amount', 0,
      'seller_poc_amount', 0,
      'other_amount', 0
    )
  )
)
WHERE jsonb_typeof(cdf_data->'other_charges') = 'array';