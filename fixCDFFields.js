#!/usr/bin/env node

/**
 * Script to fix all CDF field names across all components
 * This will update the incorrect field names to match the schema
 */

const fs = require('fs');
const path = require('path');

// Map of components and their CDF section keys
const CDF_COMPONENTS = {
  'OriginationCharges.tsx': 'origination_charges',
  'DidNotShopFor.tsx': 'services_borrower_did_not_shop_for',
  'DidShopFor.tsx': 'services_borrower_did_shop_for',
  'TaxesAndFees.tsx': 'taxes_and_government_fees',
  'Prepaids.tsx': 'prepaid_item_information',
  'Escrow.tsx': 'escrow_information',
  'OtherCharges.tsx': 'other_charges'
};

// Field name mappings (old -> new)
const FIELD_MAPPINGS = {
  'borrower_amount': 'paid_by_borrower',
  'before_borrower_amount': 'paid_before_closing',
  'seller_amount': 'paid_by_seller',
  'before_seller_amount': 'paid_before_closing_seller', // This might not be used
  'paid_by_others_amount': 'paid_by_others',
  'others_amount': 'paid_by_others'
};

function fixComponent(componentFile, sectionKey) {
  const filePath = path.join(__dirname, 'frontend/src/components/orders', componentFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;
  
  // Fix field names in data-schema-key attributes
  Object.entries(FIELD_MAPPINGS).forEach(([oldName, newName]) => {
    const oldPattern = new RegExp(`\\.${oldName}`, 'g');
    const matches = content.match(oldPattern);
    if (matches) {
      content = content.replace(oldPattern, `.${newName}`);
      changeCount += matches.length;
    }
  });
  
  // Ensure all getValue calls have || '' to prevent undefined
  content = content.replace(/getValue\(([^)]+)\)(?!\s*\|\|)/g, "getValue($1) || ''");
  
  // Ensure checkbox fields have || false
  content = content.replace(/getValue\(([^)]+is_optional[^)]+)\)\s*\|\|\s*''/g, "getValue($1) || false");
  content = content.replace(/getValue\(([^)]+not_required[^)]+)\)\s*\|\|\s*''/g, "getValue($1) || false");
  
  if (changeCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${componentFile}: ${changeCount} field names updated`);
  } else {
    console.log(`ℹ️  ${componentFile}: No changes needed`);
  }
}

console.log('🔧 Fixing CDF field names across all components...\n');

Object.entries(CDF_COMPONENTS).forEach(([component, section]) => {
  fixComponent(component, section);
});

console.log('\n✅ All CDF components updated!');
console.log('\n📝 Next steps:');
console.log('1. Review the changes in each component');
console.log('2. Test with sample data to ensure fields save correctly');
console.log('3. Update any additional fields that might be missing');