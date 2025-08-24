#!/usr/bin/env node

/**
 * Fix the double .ata.ata. issue in field paths
 */

const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { found: false };
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix double .ata.ata. pattern
  content = content.replace(/\.ata\.ata\./g, '.');
  
  // Write back if changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    const matches = originalContent.match(/\.ata\.ata\./g);
    return { 
      found: true, 
      changed: true, 
      count: matches ? matches.length : 0
    };
  }
  
  return { 
    found: true, 
    changed: false 
  };
}

function main() {
  const dirs = [
    'frontend/src/components',
    'frontend/src/components/orders',
    'frontend/src/components/documents',
    'frontend/src/pages',
  ];
  
  console.log('🔧 Fixing double .ata.ata. patterns...\n');
  
  let totalFixed = 0;
  let totalChanges = 0;
  
  dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath)
        .filter(f => (f.endsWith('.tsx') || f.endsWith('.jsx')));
      
      files.forEach(file => {
        const filePath = path.join(fullPath, file);
        const result = fixFile(filePath);
        
        if (result.found && result.changed) {
          console.log(`✅ Fixed ${dir}/${file}: ${result.count} occurrences`);
          totalFixed++;
          totalChanges += result.count;
        }
      });
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Total files fixed: ${totalFixed}`);
  console.log(`   Total patterns corrected: ${totalChanges}`);
  console.log('='.repeat(60));
}

main();