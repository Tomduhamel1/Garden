#!/usr/bin/env node

/**
 * Extract all data-schema-key attributes from HTML prototypes
 * and create a mapping to correct schema field names
 */

const fs = require('fs');
const path = require('path');

// Map of incorrect field names to correct schema names
const FIELD_CORRECTIONS = {
  // CDF line item fields
  'borrower_amount': 'paid_by_borrower',
  'before_borrower_amount': 'paid_before_closing',
  'seller_amount': 'paid_by_seller',
  'before_seller_amount': null, // This field doesn't exist in the schema
  'paid_by_others_amount': 'paid_by_others',
  'others_amount': 'paid_by_others',
  
  // Namespace corrections
  'cdf.': 'cdfData.',
  'contacts.': 'contactsData.',
  'properties.': 'propertiesData.',
  'payoffs.': 'payoffsData.',
  'calculations.': 'calculationsData.',
  'documents.': 'documentsData.',
};

// Function to extract data-schema-key attributes from HTML
function extractSchemaKeys(htmlContent) {
  const regex = /data-schema-key="([^"]*)"/g;
  const keys = [];
  let match;
  
  while ((match = regex.exec(htmlContent)) !== null) {
    keys.push(match[1]);
  }
  
  return keys;
}

// Function to correct a field path
function correctFieldPath(fieldPath) {
  let corrected = fieldPath;
  
  // Fix namespace
  Object.entries(FIELD_CORRECTIONS).forEach(([wrong, correct]) => {
    if (wrong.endsWith('.')) {
      // Namespace correction
      if (corrected.startsWith(wrong)) {
        corrected = corrected.replace(wrong, correct);
      }
    } else if (correct !== null) {
      // Field name correction
      const parts = corrected.split('.');
      const lastPart = parts[parts.length - 1];
      if (lastPart === wrong) {
        parts[parts.length - 1] = correct;
        corrected = parts.join('.');
      }
    }
  });
  
  return corrected;
}

// Main function
function main() {
  const htmlDir = path.join(__dirname, 'html-prototypes');
  const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
  
  const allMappings = {};
  const statistics = {
    totalFiles: 0,
    totalFields: 0,
    correctedFields: 0,
    uniqueFields: new Set(),
    byComponent: {}
  };
  
  console.log('🔍 Analyzing HTML prototypes...\n');
  
  htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const keys = extractSchemaKeys(content);
    
    if (keys.length > 0) {
      statistics.totalFiles++;
      const componentName = file.replace('.html', '');
      statistics.byComponent[componentName] = {
        original: [],
        corrected: [],
        count: keys.length
      };
      
      console.log(`📄 ${file}:`);
      console.log(`   Found ${keys.length} data-schema-key attributes`);
      
      keys.forEach(key => {
        const corrected = correctFieldPath(key);
        statistics.totalFields++;
        statistics.uniqueFields.add(key);
        
        if (key !== corrected) {
          statistics.correctedFields++;
          console.log(`   ❌ ${key}`);
          console.log(`   ✅ ${corrected}`);
        }
        
        allMappings[key] = corrected;
        statistics.byComponent[componentName].original.push(key);
        statistics.byComponent[componentName].corrected.push(corrected);
      });
      
      console.log('');
    }
  });
  
  // Write mappings to file
  const outputPath = path.join(__dirname, 'field-mappings.json');
  fs.writeFileSync(outputPath, JSON.stringify(allMappings, null, 2));
  console.log(`✅ Field mappings written to: ${outputPath}\n`);
  
  // Print statistics
  console.log('📊 Statistics:');
  console.log(`   Total HTML files analyzed: ${statistics.totalFiles}`);
  console.log(`   Total fields found: ${statistics.totalFields}`);
  console.log(`   Unique fields: ${statistics.uniqueFields.size}`);
  console.log(`   Fields needing correction: ${statistics.correctedFields}`);
  console.log(`   Correction rate: ${Math.round(statistics.correctedFields / statistics.totalFields * 100)}%`);
  
  // Identify patterns
  console.log('\n🔧 Common Issues Found:');
  
  const namespaceIssues = Array.from(statistics.uniqueFields).filter(k => k.startsWith('cdf.'));
  console.log(`   Namespace issues (cdf. → cdfData.): ${namespaceIssues.length} fields`);
  
  const borrowerAmountIssues = Array.from(statistics.uniqueFields).filter(k => k.includes('borrower_amount'));
  console.log(`   borrower_amount → paid_by_borrower: ${borrowerAmountIssues.length} fields`);
  
  const sellerAmountIssues = Array.from(statistics.uniqueFields).filter(k => k.includes('seller_amount'));
  console.log(`   seller_amount → paid_by_seller: ${sellerAmountIssues.length} fields`);
  
  const beforeAmountIssues = Array.from(statistics.uniqueFields).filter(k => k.includes('before_borrower_amount') || k.includes('before_seller_amount'));
  console.log(`   before_*_amount → paid_before_closing: ${beforeAmountIssues.length} fields`);
  
  // Write detailed report
  const reportPath = path.join(__dirname, 'field-mapping-report.md');
  let report = '# Field Mapping Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += '## Summary\n\n';
  report += `- Total HTML files: ${statistics.totalFiles}\n`;
  report += `- Total fields: ${statistics.totalFields}\n`;
  report += `- Fields needing correction: ${statistics.correctedFields}\n`;
  report += `- Correction rate: ${Math.round(statistics.correctedFields / statistics.totalFields * 100)}%\n\n`;
  
  report += '## Component-by-Component Analysis\n\n';
  Object.entries(statistics.byComponent).forEach(([component, data]) => {
    report += `### ${component}\n`;
    report += `Fields: ${data.count}\n\n`;
    
    // Show corrections needed
    const corrections = data.original.map((orig, i) => {
      const corr = data.corrected[i];
      if (orig !== corr) {
        return `- ❌ \`${orig}\`\n  ✅ \`${corr}\`\n`;
      }
      return null;
    }).filter(Boolean);
    
    if (corrections.length > 0) {
      report += '**Corrections needed:**\n';
      report += corrections.join('');
    } else {
      report += '*No corrections needed*\n';
    }
    report += '\n';
  });
  
  fs.writeFileSync(reportPath, report);
  console.log(`\n📝 Detailed report written to: ${reportPath}`);
}

main();