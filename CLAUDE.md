# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garden is a full-stack web application (Qualia clone) with a React TypeScript frontend and Node.js backend using Sequelize ORM with MySQL database.

## Common Commands

### Development
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run dev` - Start both frontend and backend in development mode concurrently

### Frontend (React + TypeScript + Vite)
- `cd frontend && npm run dev` - Start development server
- `cd frontend && npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `cd frontend && npm run lint` - Run ESLint
- `cd frontend && npm run preview` - Preview production build

### Backend (Node.js + Express + Sequelize)
- `cd backend && npm run start` - Start backend server
- Backend uses Sequelize CLI for database operations but no start script is defined in package.json

## Architecture

### Frontend Structure
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with HMR
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint with TypeScript rules
- **Entry Point**: `src/main.tsx` → `src/App.tsx`

### Backend Structure
- **Framework**: Express.js with security middleware (helmet, cors, morgan)
- **Database**: Sequelize ORM configured for MySQL
- **Models**: Located in `backend/models/` (currently has User model)
- **Migrations**: Located in `backend/migrations/`
- **Configuration**: Database config in `backend/config/config.json`

### Database Configuration
- Uses MySQL as the database
- Three environments: development, test, production
- Default connection: localhost:3306 with root user
- User model has: firstName, lastName, email fields

## Project Structure

```
garden/
├── frontend/          # React TypeScript app
│   ├── src/
│   │   ├── App.tsx    # Main app component
│   │   └── main.tsx   # App entry point
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js Express API
│   ├── models/        # Sequelize models
│   ├── migrations/    # Database migrations
│   ├── config/        # Database configuration
│   └── package.json   # Backend dependencies
└── schema/            # Database schema documentation
```

## Development Notes

- The project uses concurrently to run both frontend and backend simultaneously
- Frontend runs on Vite's default port (typically 5173)
- Backend configuration suggests Express setup but no main server file was found
- Database uses Sequelize with MySQL dialect
- No test commands are currently configured in backend