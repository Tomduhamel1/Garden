const fs = require('fs');
const path = require('path');

const COMPONENT_FILES = [
  'DidShopFor.tsx',
  'Escrow.tsx', 
  'Prepaids.tsx',
  'LenderCredits.tsx'
];

const FIELD_CORRECTIONS = [
  // Main amount fields
  { wrong: 'borrower_amount', correct: 'paid_by_borrower' },
  { wrong: 'seller_amount', correct: 'paid_by_seller' },
  { wrong: 'paid_by_others_amount', correct: 'paid_by_others' },
  
  // Before closing fields (seller and borrower variants both become paid_before_closing)
  { wrong: 'before_borrower_amount', correct: 'paid_before_closing' },
  { wrong: 'before_seller_amount', correct: 'paid_before_closing' }
];

function fixSchemaCompliance(filePath, componentName) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = 0;

  console.log(`\n🔧 Fixing ${componentName}...`);

  FIELD_CORRECTIONS.forEach(({ wrong, correct }) => {
    // Fix data-schema-key attributes
    const schemaKeyPattern = new RegExp(`data-schema-key={[^}]*\\.${wrong}}`, 'g');
    const schemaKeyMatches = content.match(schemaKeyPattern);
    
    if (schemaKeyMatches) {
      content = content.replace(schemaKeyPattern, (match) => {
        return match.replace(`.${wrong}}`, `.${correct}}`);
      });
      changesMade += schemaKeyMatches.length;
      console.log(`  ✅ Fixed ${schemaKeyMatches.length} data-schema-key references: ${wrong} → ${correct}`);
    }

    // Fix getValue() calls
    const getValuePattern = new RegExp(`getValue\\([^)]*\\.${wrong}[^)]*\\)`, 'g');
    const getValueMatches = content.match(getValuePattern);
    
    if (getValueMatches) {
      content = content.replace(getValuePattern, (match) => {
        return match.replace(`.${wrong}`, `.${correct}`);
      });
      changesMade += getValueMatches.length;
      console.log(`  ✅ Fixed ${getValueMatches.length} getValue() calls: ${wrong} → ${correct}`);
    }
  });

  if (changesMade > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`  🎉 ${componentName}: ${changesMade} total corrections applied`);
  } else {
    console.log(`  ℹ️  ${componentName}: No changes needed (already compliant)`);
  }

  return changesMade;
}

function main() {
  console.log('🚀 Starting automated schema compliance fixes...\n');
  
  let totalChanges = 0;
  
  COMPONENT_FILES.forEach(fileName => {
    const filePath = path.join(__dirname, 'src', 'components', 'orders', fileName);
    
    if (fs.existsSync(filePath)) {
      const changes = fixSchemaCompliance(filePath, fileName);
      totalChanges += changes;
    } else {
      console.log(`⚠️  ${fileName} not found, skipping`);
    }
  });

  console.log(`\n✨ Schema compliance fixes completed!`);
  console.log(`📊 Total corrections applied: ${totalChanges}`);
  console.log(`📋 Components processed: ${COMPONENT_FILES.length}`);
  
  if (totalChanges > 0) {
    console.log('\n🎯 Next steps:');
    console.log('1. Test components in browser');
    console.log('2. Verify data saves to correct fields');
    console.log('3. Check Closing Disclosure displays amounts');
  }
}

main();