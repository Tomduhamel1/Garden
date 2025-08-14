#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🚀 Starting Garden session...\n');

// 1. Show git status first
console.log('📊 Current git status:');
try {
  const status = execSync('git status --short', { encoding: 'utf8' });
  if (status.trim()) {
    console.log(status);
  } else {
    console.log('✅ Working directory clean\n');
  }
} catch (error) {
  console.log('Could not get git status\n');
}

// 2. Run verification
console.log('🔍 Checking current state...');
execSync('node verify-progress.js', { stdio: 'inherit' });

// 3. Show last session info from HANDOFF.md
console.log('\n📋 Last session summary:');
try {
  const handoffContent = fs.readFileSync('HANDOFF.md', 'utf8');
  const lines = handoffContent.split('\n');
  
  // Find and show the "What Was Accomplished" section
  const accomplishedIndex = lines.findIndex(line => line.includes('What Was Accomplished'));
  if (accomplishedIndex >= 0) {
    console.log('\nLast accomplishments:');
    for (let i = accomplishedIndex + 2; i < Math.min(accomplishedIndex + 10, lines.length); i++) {
      if (lines[i].trim() && !lines[i].startsWith('#')) {
        console.log(lines[i]);
      } else if (lines[i].startsWith('##')) {
        break;
      }
    }
  }
} catch (error) {
  console.log('Could not read HANDOFF.md');
}

// 4. Show immediate next tasks
console.log('\n🎯 Immediate priorities:');
try {
  const nextContent = fs.readFileSync('NEXT.md', 'utf8');
  const lines = nextContent.split('\n');
  const immediateSection = lines.findIndex(line => line.includes('IMMEDIATE'));
  
  if (immediateSection >= 0) {
    let taskCount = 0;
    for (let i = immediateSection + 2; i < lines.length && taskCount < 5; i++) {
      if (lines[i].trim() && !lines[i].startsWith('#')) {
        console.log(lines[i]);
        if (lines[i].match(/^\d+\./)) taskCount++;
      } else if (lines[i].startsWith('##')) {
        break;
      }
    }
  }
} catch (error) {
  console.log('Could not read NEXT.md');
}

// 5. Show quick summary
const report = JSON.parse(fs.readFileSync('verification-report.json', 'utf8'));
const progress = report.summary.actualProgress || 0;

console.log('\n📈 Current Progress: ' + progress + '%');
console.log('   Backend: ' + (report.summary.backendReady ? '✅ Complete' : '❌ Not ready'));
console.log('   Frontend: ' + (report.summary.frontendReady ? '✅ Complete' : '❌ Not ready'));
console.log('   Database: ' + (report.summary.databaseReady ? '✅ Complete' : '❌ Not ready'));

console.log('\n✨ Session started! Continue with the immediate priorities above.');
console.log('💡 When done, run: npm run end\n');