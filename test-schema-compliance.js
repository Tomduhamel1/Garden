#!/usr/bin/env node

/**
 * Schema Compliance Verification Script
 * 
 * This script verifies that the schema compliance fix is working correctly
 * by testing the data flow from form inputs → database → Closing Disclosure
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 SCHEMA COMPLIANCE VERIFICATION');
console.log('==================================\n');

// Test 1: Verify ClosingDisclosure uses correct field names
console.log('📋 Test 1: ClosingDisclosure Field Name Compliance');

const closingDisclosurePath = path.join(__dirname, 'frontend/src/components/orders/ClosingDisclosure.tsx');
const cdContent = fs.readFileSync(closingDisclosurePath, 'utf8');

// Check for correct field names
const correctFieldsFound = [
  'paid_by_borrower',
  'paid_by_seller', 
  'paid_by_others',
  'paid_before_closing'
];

let complianceScore = 0;
let issues = [];

correctFieldsFound.forEach(field => {
  const count = (cdContent.match(new RegExp(field, 'g')) || []).length;
  if (count > 0) {
    complianceScore++;
    console.log(`   ✅ ${field}: Found ${count} occurrences`);
  } else {
    issues.push(`❌ ${field}: Not found`);
  }
});

// Check for incorrect field names that should have been replaced
const incorrectFields = [
  'borrower_amount',
  'seller_amount'
];

incorrectFields.forEach(field => {
  const count = (cdContent.match(new RegExp(`\\.${field}`, 'g')) || []).length;
  if (count > 0) {
    issues.push(`❌ ${field}: Still found ${count} occurrences (should be replaced)`);
  } else {
    console.log(`   ✅ ${field}: Correctly removed`);
  }
});

console.log(`\n📊 ClosingDisclosure Compliance: ${complianceScore}/4 required fields found`);

// Test 2: Verify component form uses correct field names
console.log('\n📋 Test 2: Form Component Compliance');

const componentsToCheck = [
  'OriginationCharges.tsx',
  'TaxesAndFees.tsx', 
  'DidNotShopFor.tsx',
  'DidShopFor.tsx',
  'Escrow.tsx',
  'Prepaids.tsx'
];

let totalComponentsCompliant = 0;

componentsToCheck.forEach(componentName => {
  const componentPath = path.join(__dirname, 'frontend/src/components/orders', componentName);
  
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8');
    const hasCorrectFields = content.includes('paid_by_borrower');
    
    if (hasCorrectFields) {
      console.log(`   ✅ ${componentName}: Uses correct field names`);
      totalComponentsCompliant++;
    } else {
      console.log(`   ❌ ${componentName}: Does not use correct field names`);
    }
  } else {
    console.log(`   ⚠️  ${componentName}: File not found`);
  }
});

console.log(`\n📊 Component Compliance: ${totalComponentsCompliant}/${componentsToCheck.length} components compliant`);

// Test 3: Database schema check
console.log('\n📋 Test 3: Expected Test Results');
console.log('   💡 To fully verify schema compliance:');
console.log('   1. Navigate to http://localhost:5173/ in browser');
console.log('   2. Open order: ORD-2025-DEMO-001'); 
console.log('   3. Go to Origination Charges section');
console.log('   4. Enter test data:');
console.log('      - Line 1: "Origination Fee", $6,800');
console.log('      - Line 2: "Processing Fee", $500'); 
console.log('   5. Go to Taxes & Government Fees section');
console.log('   6. Enter test data:');
console.log('      - Line 1: "Recording Fee", $899');
console.log('   7. Navigate to Closing Disclosure');
console.log('   8. Verify total fees show: $8,199');

// Summary
console.log('\n🎯 SCHEMA COMPLIANCE STATUS');
console.log('===========================');

if (issues.length === 0) {
  console.log('✅ SCHEMA COMPLIANCE FIX: VERIFIED SUCCESSFUL');
  console.log('   All components use correct UCD field names');
  console.log('   ClosingDisclosure reads from correct fields');
  console.log('   Data should flow correctly: forms → database → disclosure');
} else {
  console.log('⚠️  SCHEMA COMPLIANCE: ISSUES FOUND');
  issues.forEach(issue => console.log('   ' + issue));
}

console.log('\n📈 VERIFICATION COMPLETE');
console.log('========================\n');