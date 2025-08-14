# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔴 WORKFLOW COMMANDS

When user types these EXACT phrases, follow the protocol:

### `continue garden`
1. Read this file (CLAUDE.md) to understand project
2. Run `node verify-progress.js` internally to check actual state
3. Read NEXT.md to see IN PROGRESS and immediate tasks
4. Read HANDOFF.md for session notes
5. Give status summary with percentages
6. Ask: "Should we continue with [specific task from NEXT.md]?"

### `save progress`
1. Update NEXT.md with current work in IN PROGRESS section
2. Update HANDOFF.md with what was accomplished
3. Update STATUS.json with current metrics
4. Document any incomplete work clearly
5. Respond: "Progress saved. Next session will continue with [specific task]"

## Project Overview

Garden is a comprehensive real estate closing management system (Qualia competitor) - a full-stack application with React TypeScript frontend and Node.js/Express backend using Sequelize ORM with PostgreSQL database. The project includes extensive HTML prototypes that define the UI patterns and layout structure.

**Business Context**: Building a $500/mo alternative to Qualia's $1500/mo pricing with 1-month MVP timeline.
**Product Roadmap**: See `PRODUCT-ROADMAP.md` for detailed timeline and priorities

## Common Commands

### Development
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run dev` - Start both frontend and backend in development mode concurrently
- `npm run start` - Start both frontend (preview) and backend in production mode concurrently

### Frontend (React + TypeScript + Vite)
- `cd frontend && npm run dev` - Start development server (port 5173)
- `cd frontend && npm run build` - Build for production (TypeScript compile + Vite build)
- `cd frontend && npm run lint` - Run ESLint with TypeScript rules
- `cd frontend && npm run preview` - Preview production build locally
- `cd frontend && npm run start` - Alias for preview

### Backend (Node.js + Express + Sequelize)
- `cd backend && npm run dev` - Start with nodemon for auto-reload (port 3001)
- `cd backend && npm run start` - Start production server
- No test scripts configured yet

## Architecture

### Frontend Stack
- **Framework**: React 19.1.0 with TypeScript 5.8
- **Build Tool**: Vite 7.0 with Hot Module Replacement
- **Styling**: Tailwind CSS v4 (latest alpha) with PostCSS and Autoprefixer
- **Linting**: ESLint 9.30 with TypeScript-ESLint and React Hooks rules
- **Entry Points**: `src/main.tsx` → `src/App.tsx`

### Backend Stack
- **Runtime**: Node.js with Express 5.1.0
- **Security**: Helmet 8.1, CORS 2.8.5, Morgan logging
- **Database ORM**: Sequelize 6.37 with MySQL dialect
- **Configuration**: Environment variables via dotenv
- **Server Port**: 3001 (or PORT env variable)
- **API Health Check**: `/api/health` endpoint

### Database Architecture
- **System**: MySQL with Sequelize ORM (transitioning to PostgreSQL for JSONB support)
- **Environments**: development, test, production (config in `backend/config/config.json`)
- **Connection**: localhost:3306, root user (no password by default)
- **Schema Documentation**: 
  - Database design: `schema/database-schema.md`
  - **Implementation guide: `schema/SCHEMA-GUIDE.md`** (CRITICAL - defines all 1,150+ fields)
  - Qualia schema: `schema/qualia-schema.md`
  - UCD mapping: `schema/ucd-qualia-mapping.csv`
- **Key Tables**: orders (with JSONB for CDF data), contacts, properties, payoffs
- **Current Models**: User model implemented with firstName, lastName, email
- **Schema Size**: 1,150+ fields when all arrays expanded (see SCHEMA-GUIDE.md)

## Project Structure

```
garden/
├── frontend/              # React TypeScript application
│   ├── src/
│   │   ├── App.tsx       # Main React component (currently default Vite template)
│   │   ├── main.tsx      # Application entry point
│   │   └── App.css       # Component styles
│   ├── vite.config.ts    # Vite configuration
│   └── package.json      # Frontend dependencies
├── backend/              # Node.js Express API
│   ├── src/
│   │   └── index.js      # Express server with middleware setup
│   ├── models/           # Sequelize models
│   │   ├── index.js     # Model loader
│   │   └── user.js      # User model definition
│   ├── migrations/       # Database migrations directory
│   ├── config/
│   │   └── config.json  # Database configuration
│   └── package.json     # Backend dependencies
├── html-prototypes/      # 35+ HTML mockups with Qualia-style UI
└── schema/
    └── database-schema.md # Complete database design documentation
```

## HTML Prototypes Pattern

The `html-prototypes/` directory contains 35+ static HTML pages that define the UI/UX patterns for the Garden application. These serve as the blueprint for React component development.

### Design System
- **Theme**: Dark mode with `bg-gray-900` backgrounds
- **Layout**: Consistent three-column structure (sidebar, main, rail)
- **Typography**: White text on dark backgrounds
- **Icons**: Font Awesome integrated
- **Styling**: Tailwind CSS classes throughout

### Standard Page Structure
```html
<body class="bg-gray-900 text-white">
  <div class="flex h-screen">
    <!-- Left Sidebar (w-72) -->
    <section class="w-72 bg-gray-800 border-r border-gray-600">
      <!-- Navigation and menu items -->
    </section>

    <!-- Main Content (flex-1) -->
    <section class="flex-1 bg-gray-900 overflow-y-auto">
      <!-- Page header with icon, title, and section label -->
      <!-- Form content with tables and inputs -->
    </section>

    <!-- Right Rail (w-64) -->
    <section class="w-64 bg-gray-800 border-l border-gray-600">
      <!-- Chat, Tasks, Notes sections -->
    </section>
  </div>
</body>
```

### UI Components
- **Tables**: Dark backgrounds (`bg-gray-800`) with gray borders
- **Form Fields**: 
  - Read-only: `bg-gray-600 text-gray-400`
  - Editable: `bg-gray-700` with blue focus states
- **Headers**: Section headers with icons and colored labels
- **Data Attributes**: All inputs include `data-schema-key` for data binding

### Implemented Sections
1. **Basic Info**: Order details, property information, parties
2. **Contacts**: Borrower, seller, agent information management
3. **Loan**: Loan terms, amounts, lender information
4. **Charges**: All fee sections (origination, services, government fees)
5. **Disclosures**: TRID compliance pages (loan terms, payments, calculations)
6. **Proceeds**: Borrower and seller proceeds with payment management
7. **Documents**: Document management interface
8. **Accounting**: Escrow and financial tracking
9. **Dashboard**: Overview and metrics display

## Development Workflow

### Setting Up
1. Clone repository
2. Run `npm run install:all` to install all dependencies
3. Run `npm run dev` to start both frontend and backend concurrently

### Adding Features
1. Review relevant HTML prototypes for UI patterns
2. Check `schema/database-schema.md` for data model requirements
3. Create Sequelize models matching the schema
4. Build React components following the prototype patterns
5. Implement Express API endpoints for data operations

### Code Patterns
- Frontend components should match HTML prototype structure
- Use existing Tailwind classes from prototypes
- Follow dark theme color scheme consistently
- Implement data-schema-key attributes for form binding
- Maintain three-column layout pattern
- **CRITICAL**: Support array indices for all repeating elements (see SCHEMA-GUIDE.md)
- Line items use padded format: `line_01`, `line_02`, etc.
- Entity arrays use zero-based indexing: `[0]`, `[1]`, `[2]`, `[3]`

## Schema Implementation

### Critical Schema Files
1. **`schema/SCHEMA-GUIDE.md`** - Complete implementation guide with all 1,150+ fields
2. **`schema/qualia-schema.md`** - Qualia's naming conventions and structure
3. **`schema/ucd-qualia-mapping.csv`** - Field-by-field UCD to Qualia mapping
4. **`schema/ucd-qualia-mapping-expanded.csv`** - Array size summary

### Array Limits (MUST IMPLEMENT)
- Borrowers/Sellers: 4 instances max
- Payoffs: 4 instances max  
- Origination charges: 8 line items (line_01 to line_08)
- Borrower credits: 17 line items (line_01 to line_17)
- Borrower debits: 15 line items (line_01 to line_15)
- See SCHEMA-GUIDE.md Section "Array Limits by Section" for complete list

### Data Storage Strategy
Use PostgreSQL JSONB columns for flexible array storage:
- `cdf_data` - All CDF namespace data
- `contacts_data` - All contacts with arrays
- `properties_data` - Property and tax information
- `payoffs_data` - Existing loan payoffs