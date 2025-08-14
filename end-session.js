#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🔚 Ending Garden session...\n');

// 1. Run verification
console.log('📊 Running verification...');
execSync('node verify-progress.js', { stdio: 'inherit' });

// 2. Update HANDOFF.md with timestamp
const handoffPath = path.join(__dirname, 'HANDOFF.md');
const now = new Date().toISOString();
const handoffContent = fs.readFileSync(handoffPath, 'utf8');

// Update the last session time at the top of HANDOFF.md
const updatedHandoff = handoffContent.replace(
  /\*\*Last Session\*\*: .*/,
  `**Last Session**: ${now}`
);

// If no Last Session line exists, add it after the title
if (!handoffContent.includes('**Last Session**')) {
  const lines = handoffContent.split('\n');
  lines.splice(2, 0, `\n**Last Session**: ${now}\n`);
  fs.writeFileSync(handoffPath, lines.join('\n'));
} else {
  fs.writeFileSync(handoffPath, updatedHandoff);
}

// 3. Git operations
console.log('\n📝 Saving all changes...');
try {
  // Check what changed
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  const changedFiles = status.split('\n').filter(line => line.trim()).length;
  
  if (changedFiles > 0) {
    console.log(`Found ${changedFiles} changed files`);
    
    // Stage all changes
    execSync('git add -A', { stdio: 'inherit' });
    
    // Get verification summary for commit message
    const report = JSON.parse(fs.readFileSync('verification-report.json', 'utf8'));
    const progress = report.summary.actualProgress || 0;
    
    // Create automatic commit message
    const commitMsg = `Progress: ${progress}% - Backend: ${report.summary.backendReady ? '✅' : '❌'}, Frontend: ${report.summary.frontendReady ? '✅' : '❌'}, DB: ${report.summary.databaseReady ? '✅' : '❌'}`;
    
    console.log(`\n💾 Committing with message: "${commitMsg}"`);
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
    
    console.log('\n✅ All changes committed!');
  } else {
    console.log('✅ No changes to commit');
  }
  
  // Show final status
  console.log('\n📊 Final git status:');
  execSync('git status --short', { stdio: 'inherit' });
  
} catch (error) {
  console.log('\n⚠️ Git operations failed:', error.message);
}

// 4. Show what's next
console.log('\n🎯 Next priorities (from NEXT.md):');
try {
  const nextContent = fs.readFileSync('NEXT.md', 'utf8');
  const lines = nextContent.split('\n');
  const immediateSection = lines.findIndex(line => line.includes('IMMEDIATE'));
  if (immediateSection >= 0) {
    for (let i = immediateSection + 2; i < Math.min(immediateSection + 8, lines.length); i++) {
      if (lines[i].trim() && !lines[i].startsWith('#')) {
        console.log(lines[i]);
      } else if (lines[i].startsWith('#')) {
        break;
      }
    }
  }
} catch (error) {
  console.log('Could not read NEXT.md');
}

console.log('\n👋 Session ended successfully!');
console.log('📝 To start next session, run: npm run session:start\n');