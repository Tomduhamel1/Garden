const fs = require('fs');
const path = require('path');

const SECTION_COMPONENTS = [
  'OriginationCharges.tsx',
  'DidNotShopFor.tsx', 
  'DidShopFor.tsx',
  'TaxesAndFees.tsx',
  'Prepaids.tsx',
  'Escrow.tsx',
  'OtherCharges.tsx'
];

const MISSING_FIELDS_TO_ADD = {
  // Core UCD fields missing from line items
  'is_optional': {
    type: 'checkbox',
    defaultValue: 'false',
    label: 'Optional'
  },
  'not_required': {
    type: 'checkbox', 
    defaultValue: 'false',
    label: 'Not Required'
  },
  'paid_before_closing': {
    type: 'number',
    defaultValue: '0',
    label: 'Paid Before Closing'
  }
};

function addMissingFieldsToComponent(componentPath) {
  const filePath = path.join(__dirname, 'src', 'components', 'orders', componentPath);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Component not found: ${componentPath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if component already has the fields
  const hasBooleanFields = content.includes('is_optional') || content.includes('not_required');
  
  if (hasBooleanFields) {
    console.log(`✅ ${componentPath} already has UCD boolean fields`);
    return;
  }

  // Find table rows that represent line items
  const lineItemPattern = /(<tr[^>]*>[\s\S]*?data-schema-key={`[^`]*\.line_\d+\.[^`]+`}[\s\S]*?<\/tr>)/g;
  const matches = content.match(lineItemPattern);
  
  if (!matches) {
    console.log(`⚠️  No line item patterns found in ${componentPath}`);
    return;
  }

  console.log(`🔧 Adding missing UCD fields to ${componentPath}...`);

  // For each section component, we need to add columns for is_optional and not_required
  // This requires modifying both the table headers and the row cells

  // Add table headers first
  const headerPattern = /(<thead>[\s\S]*?<\/thead>)/;
  const headerMatch = content.match(headerPattern);
  
  if (headerMatch) {
    const originalHeader = headerMatch[0];
    // Add new column headers before the closing </tr>
    const modifiedHeader = originalHeader.replace(
      /(<\/tr>\s*<\/thead>)/,
      `          <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600" style={{ width: '80px' }}>Optional</th>
          <th className="py-3 px-4 text-center text-sm text-gray-300 border-b border-gray-600" style={{ width: '80px' }}>Not Req</th>
$1`
    );
    
    content = content.replace(originalHeader, modifiedHeader);
    modified = true;
  }

  // Add cells to each row
  const rowPattern = /(<tr[^>]*>[\s\S]*?)(data-schema-key={`([^`]*\.line_\d+)\.[^`]+`})([\s\S]*?)(<\/tr>)/g;
  
  content = content.replace(rowPattern, (match, rowStart, schemaKeyMatch, schemaPrefix, rowMiddle, rowEnd) => {
    // Add the new cells before the closing </tr>
    const newCells = `
        <td className="border-r border-gray-600 text-center">
          <input 
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
            data-schema-key={\`${schemaPrefix}.is_optional\`}
            checked={getValue(\`${schemaPrefix}.is_optional\`) === 'true'}
            onChange={handleInputChange}
          />
        </td>
        <td className="text-center">
          <input 
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
            data-schema-key={\`${schemaPrefix}.not_required\`}
            checked={getValue(\`${schemaPrefix}.not_required\`) === 'true'}
            onChange={handleInputChange}
          />
        </td>`;
    
    return rowStart + schemaKeyMatch + rowMiddle + newCells + rowEnd;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${componentPath} with missing UCD fields`);
  }
}

function main() {
  console.log('🚀 Adding missing UCD fields to section components...\n');
  
  SECTION_COMPONENTS.forEach(component => {
    addMissingFieldsToComponent(component);
  });
  
  console.log('\n✨ Completed UCD field addition process');
}

main();