#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n💾 Saving current progress...\n');

// Run verification to get current state
const report = JSON.parse(execSync('node verify-progress.js', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }));

// Ask what we're in the middle of
rl.question('What are you currently working on? (or press Enter to skip): ', (currentWork) => {
  
  rl.question('What should be done next? (or press Enter to skip): ', (nextWork) => {
    
    // Update NEXT.md with current status
    const nextPath = path.join(__dirname, 'NEXT.md');
    let nextContent = fs.readFileSync(nextPath, 'utf8');
    
    // Add/update "IN PROGRESS" section at the top
    const timestamp = new Date().toISOString();
    const inProgressSection = `# Next Immediate Tasks 🎯

**Last Updated**: ${timestamp}
**Current Context**: ${currentWork || 'Continuing development'}

## 🚧 IN PROGRESS RIGHT NOW
${currentWork ? `- ${currentWork}` : '- [No active task specified]'}

## 🚨 IMMEDIATE (Next Steps)
${nextWork ? `### 1. ${nextWork}` : '### 1. Continue from IN PROGRESS above'}

`;

    // Replace the header section of NEXT.md
    const nextLines = nextContent.split('\n');
    const firstTaskIndex = nextLines.findIndex(line => line.includes('###') || line.includes('## 🚨'));
    
    if (firstTaskIndex > 0) {
      nextLines.splice(0, firstTaskIndex, ...inProgressSection.split('\n').slice(0, -1));
      nextContent = nextLines.join('\n');
    } else {
      nextContent = inProgressSection + nextContent;
    }
    
    fs.writeFileSync(nextPath, nextContent);
    
    // Update HANDOFF.md with current state
    const handoffPath = path.join(__dirname, 'HANDOFF.md');
    const handoffContent = `# Session Handoff Document 🤝

**Last Save**: ${timestamp}
**Progress**: ${report.summary?.actualProgress || 0}%

## 🚧 Currently In Progress
${currentWork || 'No active task specified'}

## ✅ Working State
- Backend: ${report.summary?.backendReady ? 'COMPLETE' : 'In Progress'}
- Frontend: ${report.summary?.frontendReady ? 'COMPLETE' : 'Not Started'} 
- Database: ${report.summary?.databaseReady ? 'COMPLETE' : 'Not Started'}
- Components: ${report.summary?.componentsConverted || 0}/${report.summary?.htmlPrototypesCount || 35}

## 📋 Next Steps
${nextWork || 'Continue from current task'}

## 💡 To Continue
When resuming, tell Claude: "${currentWork ? `Continue working on: ${currentWork}` : 'Check NEXT.md and continue'}"

---
*Auto-saved at ${timestamp}*
`;

    fs.writeFileSync(handoffPath, handoffContent);
    
    // Git commit with current state
    try {
      execSync('git add -A', { stdio: 'ignore' });
      const commitMsg = `WIP: ${currentWork || 'Development in progress'} (${report.summary?.actualProgress || 0}%)`;
      execSync(`git commit -m "${commitMsg}"`, { stdio: 'ignore' });
      console.log(`\n✅ Committed: ${commitMsg}`);
    } catch (e) {
      console.log('\n📝 Changes saved locally (no commit needed)');
    }
    
    console.log('\n✅ Progress saved successfully!');
    console.log('\n📋 To resume, tell Claude:');
    console.log(`   "${currentWork ? `Continue working on: ${currentWork}` : 'Check NEXT.md and continue'}"\n`);
    
    rl.close();
  });
});