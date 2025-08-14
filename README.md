# Garden - Real Estate Closing Management System 🏡

A modern, affordable alternative to Qualia for real estate closing management. Garden provides comprehensive tools for managing closing disclosures, settlement statements, and the entire real estate closing process.

## 🎯 Project Goals

- **Affordable**: $500/month vs competitors' $1500+/month
- **Fast**: 1-month MVP timeline
- **Comprehensive**: Full closing disclosure and HUD-1 generation
- **Modern**: React + TypeScript frontend with PostgreSQL backend

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Tomduhamel1/Garden.git
cd garden

# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3002

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: PostgreSQL with JSONB for flexible schema
- **Authentication**: JWT-based auth

### Project Structure
```
garden/
├── frontend/          # React TypeScript application
├── backend/           # Express API with Sequelize
├── html-prototypes/   # 35+ HTML mockups (UI reference)
└── schema/           # Database schema documentation
```

## 📊 Current Progress

- ✅ **Backend**: 100% Complete
  - PostgreSQL database with JSONB columns
  - JWT authentication system
  - Full CRUD API for orders
  - 12 API endpoints implemented

- ⏳ **Frontend**: 0% Complete (Next Priority)
  - 0/35 components converted
  - React structure to be implemented

**Overall Progress**: 30%

## 🔧 Development Commands

```bash
# Start both frontend and backend
npm run dev

# Run verification/progress check
npm run verify

# Session management (for Claude Code)
npm run begin          # Start work session
npm run end           # End work session
```

## 📋 Features

### Completed
- Database schema supporting MISMO UCD standards
- Order management with JSONB storage
- User authentication and authorization
- Audit logging system

### In Progress
- React component library
- Form validation system
- Calculation engine

### Planned
- PDF generation (Closing Disclosure, HUD-1)
- Check printing
- Fee API integration
- Document management

## 🤝 Development Workflow

This project uses Claude Code for rapid development. The workflow is documented in CLAUDE.md.

### For Claude Code Sessions:
1. Type `continue garden` to resume work
2. Type `save progress` before ending session

## 📚 Documentation

- `CLAUDE.md` - Development guidelines and workflow
- `PRODUCT-ROADMAP.md` - Detailed development timeline
- `schema/SCHEMA-GUIDE.md` - Complete database schema (1,150+ fields)
- `PROGRESS.md` - Detailed task checklist

## 📄 License

Private project - All rights reserved

## 👥 Team

- Development: Claude Code + Human collaboration
- Target Users: Small to medium title companies

---

*Built with speed and efficiency using Claude Code*