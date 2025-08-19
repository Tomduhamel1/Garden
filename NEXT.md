# Next Immediate Tasks 🎯

**Last Updated**: 2025-08-18 19:24 PST
**Current Context**: Backend complete, React app structure set up with Tailwind v4 working

## 🔴 WORKFLOW COMMANDS (IMPORTANT!)

### In Claude Code, you type:
- **`continue garden`** - Start/resume work (Claude reads all context)
- **`save progress`** - Save state before ending session

### Claude's Response to "continue garden":
1. Reads all tracking files
2. Shows current status
3. Asks: "Should we continue with [specific task]?"

### Claude's Response to "save progress":
1. Updates NEXT.md, HANDOFF.md, STATUS.json
2. Documents any incomplete work
3. Confirms what will happen next session

## 🚧 IN PROGRESS
- ✅ Backend API complete (auth + orders CRUD)
- ✅ PostgreSQL database with JSONB columns
- ✅ All migrations run
- ✅ GitHub setup complete with proper README
- ✅ Workflow documentation complete
- ✅ React app structure set up
- ✅ Tailwind CSS v4 configured and working
- ✅ BasicInfo component created (exact match to HTML prototype)
- ⏳ Need to convert remaining 34 HTML prototypes to React

## 🚨 IMMEDIATE (Next 1-2 Hours)

### 1. Convert contacts.html to React ✅ COMPLETED
### 2. Convert loan.html to React ✅ COMPLETED  
### 3. Convert basic-info.html to React ✅ COMPLETED

### 4. Convert High-Priority HTML Prototypes
**Next files to convert (in order)**:
- contacts.html → src/components/orders/Contacts.tsx
- loan.html → src/components/orders/Loan.tsx
- origination-charges.html → src/components/orders/OriginationCharges.tsx
- did-shop-for.html → src/components/orders/DidShopFor.tsx
- did-not-shop-for.html → src/components/orders/DidNotShopFor.tsx

**Important**: Each component MUST:
- Match HTML prototype EXACTLY (all fields, sections, layout)
- Use three-column layout (sidebar, main, rail)
- Include ALL form fields from the prototype
- Light theme (bg-gray-50, text-gray-900)

## 📋 NEXT SESSION (Next 3-4 Hours)

### 4. 🔐 Implement JWT Authentication
**Files to create**:
- backend/src/middleware/auth.js
- backend/src/routes/auth.js
- backend/src/controllers/authController.js

**Endpoints needed**:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh

### 5. 🛣️ Create Order CRUD API
**Files to create**:
- backend/src/routes/orders.js
- backend/src/controllers/orderController.js

**Endpoints needed**:
- POST /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id
- DELETE /api/orders/:id
- GET /api/orders (with pagination)

### 6. ⚛️ Set Up React Structure
**Tasks**:
- Clean up Vite template
- Install React Router
- Create AppShell component
- Set up Zustand store
- Configure Tailwind CSS v4

## 🔄 BLOCKED ITEMS

### Waiting for Decisions:
1. **PDF Library** (Deadline: Jan 15)
   - Option A: react-pdf (faster dev)
   - Option B: Puppeteer (better accuracy)
   - **Impact**: Blocks Week 3 document generation

2. **Hosting Provider** (Deadline: Jan 16)
   - Option A: Railway
   - Option B: Render
   - **Impact**: Blocks deployment setup

3. **State Management** (Deadline: Jan 14)
   - Option A: Zustand (simpler)
   - Option B: Redux Toolkit (more robust)
   - **Impact**: Blocks frontend development

## 📝 CONTEXT FOR NEXT CLAUDE SESSION

### Current State:
- ✅ Tracking system fully implemented
- ✅ All documentation complete
- ⏳ Database not yet created
- ⏳ No backend code written yet
- ⏳ Frontend still has Vite template

### Files to Read First:
1. `HANDOFF.md` - Session handoff notes
2. `STATUS.json` - Current system state
3. `NEXT.md` - This file
4. Run: `node verify-progress.js`

### Continue From:
- Line 0 of database setup
- Need to create PostgreSQL database
- Then create Sequelize models
- Then build API structure

## 🎯 Week 1 Goals Reminder

By end of Week 1 (Jan 17), we need:
- [ ] Database with schema
- [ ] Basic CRUD API
- [ ] JWT auth working
- [ ] React app structure
- [ ] Deployed to staging

**Progress**: 5/30 tasks complete (16.7%)
**Time Remaining**: 5 days
**Required Velocity**: 5 tasks/day

## 💡 Quick Commands

### Start New Session:
```bash
# 1. Check current state
node verify-progress.js

# 2. Read handoff
cat HANDOFF.md

# 3. Check git status
git status

# 4. Continue from NEXT.md tasks
```

### End Session:
```bash
# 1. Update all tracking files
npm run update-progress

# 2. Create handoff
npm run create-handoff

# 3. Commit everything
git add -A
git commit -m "SESSION_END: [summary]"

# 4. Run final verification
node verify-progress.js
```

## 🚀 Motivation

Remember: With Claude Code's speed, we can complete the entire backend in 1-2 days. Every task completed gets us closer to the MVP. The tracking system ensures zero lost work.

**Next concrete step**: Create PostgreSQL database

---

*This file should be updated after completing each task*
*Always work from top to bottom of IMMEDIATE section*