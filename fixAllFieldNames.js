#!/usr/bin/env node

/**
 * Comprehensive script to fix ALL field naming issues across all components
 * This corrects both namespace and field name issues based on the schema
 */

const fs = require('fs');
const path = require('path');

// Complete field corrections based on analysis
const NAMESPACE_CORRECTIONS = {
  'cdf.': 'cdfData.',
  'contacts.': 'contactsData.',
  'properties.': 'propertiesData.',
  'payoffs.': 'payoffsData.',
  'calculations.': 'calculationsData.',
  'documents.': 'documentsData.',
};

// Field name corrections (at the end of the path)
const FIELD_NAME_CORRECTIONS = {
  'borrower_amount': 'paid_by_borrower',
  'before_borrower_amount': 'paid_before_closing',
  'seller_amount': 'paid_by_seller',
  'before_seller_amount': '', // This field doesn't exist - remove it
  'paid_by_others_amount': 'paid_by_others',
  'others_amount': 'paid_by_others',
  'statement_text': 'description', // For credit/debit sections
};

// Fields that should be completely removed (they don't exist in schema)
const FIELDS_TO_REMOVE = [
  'before_seller_amount',
];

function fixComponentFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { found: false };
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changeCount = 0;
  let removedCount = 0;
  
  // First, fix all namespace issues
  Object.entries(NAMESPACE_CORRECTIONS).forEach(([wrong, correct]) => {
    // Fix in data-schema-key attributes
    const keyRegex = new RegExp(`data-schema-key="${wrong}`, 'g');
    const keyMatches = content.match(keyRegex);
    if (keyMatches) {
      content = content.replace(keyRegex, `data-schema-key="${correct}`);
      changeCount += keyMatches.length;
    }
    
    // Fix in getValue calls
    const getValueRegex = new RegExp(`getValue\\(['"]${wrong}`, 'g');
    const getValueMatches = content.match(getValueRegex);
    if (getValueMatches) {
      content = content.replace(getValueRegex, `getValue('${correct}`);
      changeCount += getValueMatches.length;
    }
    
    // Fix in any string literals that reference the path
    const literalRegex = new RegExp(`['"]${wrong}`, 'g');
    const literalMatches = content.match(literalRegex);
    if (literalMatches) {
      content = content.replace(literalRegex, `'${correct}`);
      changeCount += literalMatches.length;
    }
  });
  
  // Then fix field names
  Object.entries(FIELD_NAME_CORRECTIONS).forEach(([wrong, correct]) => {
    if (correct === '') {
      // Field should be removed - we'll handle this separately
      return;
    }
    
    // Fix field names at the end of paths
    const fieldRegex = new RegExp(`\\.${wrong}(["')]|\\s|$)`, 'g');
    const fieldMatches = content.match(fieldRegex);
    if (fieldMatches) {
      content = content.replace(fieldRegex, `.${correct}$1`);
      changeCount += fieldMatches.length;
    }
  });
  
  // Remove entire input/tr/div blocks that contain fields that don't exist
  FIELDS_TO_REMOVE.forEach(fieldToRemove => {
    // Pattern to find JSX elements containing this field
    const patterns = [
      // Input field pattern
      new RegExp(`<input[^>]*data-schema-key="[^"]*\\.${fieldToRemove}"[^>]*>`, 'g'),
      // Table row pattern (for fields in tables)
      new RegExp(`<tr[^>]*>[\\s\\S]*?data-schema-key="[^"]*\\.${fieldToRemove}"[\\s\\S]*?</tr>`, 'g'),
      // Div pattern
      new RegExp(`<div[^>]*>[\\s\\S]*?data-schema-key="[^"]*\\.${fieldToRemove}"[\\s\\S]*?</div>`, 'g'),
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, '');
        removedCount += matches.length;
      }
    });
  });
  
  // Ensure all getValue calls have proper fallbacks
  content = content.replace(/getValue\(([^)]+)\)(?!\s*\|\|)/g, "getValue($1) || ''");
  
  // Fix checkbox fields to use false instead of empty string
  const checkboxFields = ['is_optional', 'not_required', 'on_title', 'on_loan', 'has_exchange'];
  checkboxFields.forEach(field => {
    const regex = new RegExp(`getValue\\(([^)]*\\.${field}[^)]*)\\)\\s*\\|\\|\\s*['"]`, 'g');
    content = content.replace(regex, "getValue($1) || false");
  });
  
  // Write back if changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    return { 
      found: true, 
      changed: true, 
      changeCount, 
      removedCount 
    };
  }
  
  return { 
    found: true, 
    changed: false 
  };
}

function main() {
  const componentsDir = path.join(__dirname, 'frontend/src/components/orders');
  const componentFiles = fs.readdirSync(componentsDir)
    .filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));
  
  console.log('🔧 Fixing field names across all components...\n');
  
  let totalFixed = 0;
  let totalChanges = 0;
  let totalRemoved = 0;
  
  componentFiles.forEach(file => {
    const filePath = path.join(componentsDir, file);
    const result = fixComponentFile(filePath);
    
    if (result.found) {
      if (result.changed) {
        console.log(`✅ Fixed ${file}:`);
        console.log(`   - ${result.changeCount} field references updated`);
        if (result.removedCount > 0) {
          console.log(`   - ${result.removedCount} non-existent fields removed`);
        }
        totalFixed++;
        totalChanges += result.changeCount;
        totalRemoved += result.removedCount;
      } else {
        console.log(`ℹ️  ${file}: Already correct`);
      }
    }
  });
  
  // Also fix components in other directories
  const otherDirs = [
    'frontend/src/components',
    'frontend/src/components/documents',
    'frontend/src/pages',
  ];
  
  console.log('\n📂 Checking other directories...\n');
  
  otherDirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath)
        .filter(f => (f.endsWith('.tsx') || f.endsWith('.jsx')) && f !== 'index.tsx');
      
      files.forEach(file => {
        const filePath = path.join(fullPath, file);
        const result = fixComponentFile(filePath);
        
        if (result.found && result.changed) {
          console.log(`✅ Fixed ${dir}/${file}: ${result.changeCount} changes`);
          totalFixed++;
          totalChanges += result.changeCount;
          totalRemoved += result.removedCount;
        }
      });
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Total files fixed: ${totalFixed}`);
  console.log(`   Total field references updated: ${totalChanges}`);
  console.log(`   Total non-existent fields removed: ${totalRemoved}`);
  console.log('='.repeat(60));
  
  console.log('\n✅ All components have been updated with correct field names!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the changes in each component');
  console.log('2. Test with sample data to ensure fields save correctly');
  console.log('3. Use Schema Inspector to verify data persistence');
  console.log('4. Add any missing fields that were not in HTML prototypes');
}

main();