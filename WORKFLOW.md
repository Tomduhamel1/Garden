# Garden Development Workflow Instructions 📋

## 🎯 Quick Reference

### Claude Code Commands (in chat)
- **`continue garden`** - Start/resume development work
- **`save progress`** - Save current state before ending session

### Terminal Commands
- **`npm run dev`** - Start the application (both frontend & backend)
- **`npm run verify`** - Check actual progress
- **`npm run begin`** - Check status at session start (optional)
- **`npm run end`** - Auto-commit and save at session end (optional)

---

## 📖 Complete Workflow

### 1️⃣ Starting a New Work Session

#### In Claude Code Chat:
```
continue garden
```

Claude will:
- Read all project files
- Check current progress (runs verify-progress.js)
- Show you status (e.g., "Backend: 100%, Frontend: 0%, Overall: 30%")
- Ask: "Should we continue with [specific next task]?"

You respond: "Yes" or tell Claude what you want to work on instead

#### Optional - In Terminal (for your own reference):
```bash
cd /Users/macbook/Documents/GitHub/garden
npm run begin
```
This shows YOU the progress, but Claude already knows.

---

### 2️⃣ Running the Application

#### Start Everything (Recommended):
```bash
# In Terminal, from garden folder:
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3002

**Note**: Backend is on port 3002 (not 3001) to avoid conflict with your other app!

#### Or Run Separately:
```bash
# Terminal 1 - Backend:
cd backend && npm run dev

# Terminal 2 - Frontend:
cd frontend && npm run dev
```

---

### 3️⃣ During Development

Just work normally with Claude. Claude automatically:
- Writes code
- Updates files
- Tracks what's being done

You can check progress anytime:
```bash
# In Terminal:
npm run verify
```

---

### 4️⃣ Saving Your Work

#### Before Ending Claude Session:
```
save progress
```

Claude will:
- Update NEXT.md with current work status
- Update HANDOFF.md with session accomplishments
- Update PROGRESS.md with completed tasks
- Update STATUS.json with metrics
- Tell you: "Progress saved. Next session will continue with [task]"

Claude automatically:
- Commits all changes with descriptive message
- Pushes to GitHub
- No manual git commands needed!

---

## 🔄 Starting Next Session

When you come back (even in a new Claude conversation):

1. **Type**: `continue garden`
2. **Claude reads everything** and knows where you left off
3. **Continue working** from where you stopped

---

## 📊 Understanding Progress

When you see progress reports:
- **Backend**: 100% ✅ (DONE - auth, database, API)
- **Frontend**: 0% (Not started - 0/35 components)
- **Overall**: 30% (Backend done, frontend next)

---

## 🚨 Important Notes

### Ports
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3002 (NOT 3001!)
- **Database**: PostgreSQL on localhost:5432

### Git/GitHub
- Repo: https://github.com/Tomduhamel1/Garden.git
- `save progress` automatically pushes to GitHub
- Everything in `node_modules/` is ignored (not pushed)

### File Locations
- **Your project**: `/Users/macbook/Documents/GitHub/garden`
- **Backend code**: `backend/src/`
- **Frontend code**: `frontend/src/`
- **HTML prototypes**: `html-prototypes/` (reference for React components)

---

## 🆘 Troubleshooting

### "Port already in use"
- Backend is set to port 3002 (not 3001)
- Frontend uses 5173 (Vite default)

### "Cannot find module"
- Run `npm run install:all` to install dependencies

### "Database connection failed"
- Make sure PostgreSQL is running
- Database name: `garden`
- User: `macbook`

### Claude doesn't know where we are
- Type: `continue garden`
- Claude will read all files and figure it out

---

## 📝 Summary Cheat Sheet

```bash
# Daily workflow:
1. Claude: "continue garden"        # Start work
2. Terminal: npm run dev            # Run app  
3. [Do your work with Claude]
4. Claude: "save progress"          # Save & auto-push to GitHub
```

That's it! The system maintains context automatically between sessions.

---

*Last updated: 2025-08-14*
*Backend: Complete | Frontend: Next Priority*