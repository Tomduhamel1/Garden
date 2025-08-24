#!/usr/bin/env node

/**
 * Automated Field Wiring Fix Script
 * Finds all data-schema-key attributes missing getValue/onChange handlers
 * and adds them automatically
 */

const fs = require('fs');
const path = require('path');

// Find all React component files
function findComponentFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      files.push(...findComponentFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.endsWith('.test.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Check if a field already has getValue wiring
function hasGetValue(content, schemaKey) {
  const escapedKey = schemaKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const getValuePattern = new RegExp(`getValue\\s*\\(\\s*[\`'"]${escapedKey}[\`'"]\\s*\\)`, 'g');
  return getValuePattern.test(content);
}

// Fix input fields missing getValue/onChange
function fixInputField(content) {
  let fixedContent = content;
  let changesCount = 0;

  // Pattern to match input/select/textarea with data-schema-key but missing getValue
  const inputPattern = /<(input|select|textarea)([^>]*?)data-schema-key\s*=\s*{`([^`]+)`}([^>]*?)>/g;
  
  fixedContent = fixedContent.replace(inputPattern, (match, tag, beforeKey, schemaKey, afterKey) => {
    // Skip if already has getValue
    if (hasGetValue(match, schemaKey)) {
      return match;
    }
    
    // Skip hidden inputs
    if (match.includes('type="hidden"')) {
      return match;
    }
    
    // Skip read-only inputs that shouldn't be wired
    if (match.includes('readOnly') && !match.includes('value=')) {
      return match;
    }
    
    // Skip checkboxes (they need special handling)
    if (match.includes('type="checkbox"')) {
      return match;
    }
    
    // Add getValue and onChange if not present
    let newMatch = match;
    
    // Add value attribute if not present
    if (!newMatch.includes('value=') && !newMatch.includes('defaultValue=')) {
      const valueAttr = `value={getValue(\`${schemaKey}\`) || ''}`;
      newMatch = newMatch.replace(/data-schema-key/, `${valueAttr}\n            data-schema-key`);
    }
    
    // Add onChange if not present
    if (!newMatch.includes('onChange=')) {
      const onChangeAttr = `onChange={handleInputChange}`;
      newMatch = newMatch.replace(/data-schema-key/, `${onChangeAttr}\n            data-schema-key`);
    }
    
    changesCount++;
    return newMatch;
  });

  return { content: fixedContent, changes: changesCount };
}

// Process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that don't use useOrderData
    if (!content.includes('useOrderData')) {
      return { file: filePath, changes: 0, skipped: 'No useOrderData hook' };
    }
    
    // Skip files without data-schema-key
    if (!content.includes('data-schema-key')) {
      return { file: filePath, changes: 0, skipped: 'No data-schema-key attributes' };
    }
    
    const result = fixInputField(content);
    
    if (result.changes > 0) {
      // Write the fixed content back
      fs.writeFileSync(filePath, result.content, 'utf8');
      return { file: filePath, changes: result.changes };
    }
    
    return { file: filePath, changes: 0, skipped: 'No changes needed' };
  } catch (error) {
    return { file: filePath, changes: 0, error: error.message };
  }
}

// Main execution
function main() {
  console.log('🔧 Starting Field Wiring Fix Script...\n');
  
  const srcDir = path.join(process.cwd(), 'src', 'components');
  if (!fs.existsSync(srcDir)) {
    console.error('❌ src/components directory not found');
    process.exit(1);
  }
  
  const componentFiles = findComponentFiles(srcDir);
  console.log(`📁 Found ${componentFiles.length} component files\n`);
  
  let totalChanges = 0;
  let processedFiles = 0;
  let skippedFiles = 0;
  let errorFiles = 0;
  
  const results = componentFiles.map(processFile);
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${path.basename(result.file)}: Error - ${result.error}`);
      errorFiles++;
    } else if (result.skipped) {
      console.log(`⏭️  ${path.basename(result.file)}: ${result.skipped}`);
      skippedFiles++;
    } else if (result.changes > 0) {
      console.log(`✅ ${path.basename(result.file)}: Fixed ${result.changes} fields`);
      totalChanges += result.changes;
      processedFiles++;
    } else {
      skippedFiles++;
    }
  });
  
  console.log('\n📊 Summary:');
  console.log(`   Fixed files: ${processedFiles}`);
  console.log(`   Skipped files: ${skippedFiles}`);
  console.log(`   Error files: ${errorFiles}`);
  console.log(`   Total field fixes: ${totalChanges}`);
  
  if (totalChanges > 0) {
    console.log('\n🎉 Field wiring fixes complete!');
    console.log('💡 Run the development server to verify changes work correctly.');
  } else {
    console.log('\n✨ All fields already properly wired!');
  }
}

main();