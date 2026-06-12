# Contributions Tracker

A modern full-stack web application for tracking financial contributions, promises, and expenses. Built with React, TypeScript, Tailwind CSS, and Express.

## Features

- **Money In**: Track all contributions received with contributor name, amount, date, and notes
- **Promises**: Record money promised with due dates and tracking
- **Expenses**: Monitor all expenses paid out with categories and descriptions
- **Summary Dashboard**: Real-time overview of total contributions, promises, expenses, and net balance
- **Persistent Storage**: All data is saved to a JSON file on the server
- **Shareable**: Share the link with others - everyone sees the same data
- **Password Protected Edit & Delete**: All edit and delete operations require admin password authentication
- **Edit Functionality**: Modify existing entries with password protection
- **Modern UI**: Beautiful, responsive interface with color-coded sections

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS (runs on port 5173)
- **Backend**: Express.js server (runs on port 3001)
- **Data Storage**: JSON file (`server/data.json`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended, v16+ minimum)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start both frontend and backend:
```bash
npm run dev:all
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

**Alternative**: Run them separately in different terminals:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding Contributions
1. Click on the "Money In" tab
2. Fill in the contributor's name, amount, date, and optional notes
3. Click "Add Contribution"

### Recording Promises
1. Click on the "Promises" tab
2. Enter the person's name, promised amount, promise date, and optional due date
3. Click "Add Promise"

### Tracking Expenses
1. Click on the "Expenses" tab
2. Enter the expense description, amount, date, and optional category
3. Click "Add Expense"

### Viewing Summary
The summary dashboard at the top shows:
- Total money received
- Total promises made
- Total expenses paid
- Net balance (contributions - expenses)

## Data Persistence

All data is stored in `server/data.json` on the backend server. This means:
- Data persists across browser sessions and devices
- Multiple users can access the same data by sharing the URL
- Data is stored as a simple JSON file that can be backed up or edited manually

**Important**: The `server/data.json` file is gitignored by default. Make sure to back it up if needed.

## Security

### Password Protection

All delete operations are password-protected. The admin password is stored in `server/config.js`:

```javascript
export const ADMIN_PASSWORD = '11/06/2026:22:00';
```

**To change the password:**
1. Edit `server/config.js`
2. Update the `ADMIN_PASSWORD` value
3. Restart the server

**Note**: The `server/config.js` file is gitignored to keep your password secure. Make sure to set it up on each deployment.

### How It Works

- Anyone can view data and add new entries
- **Editing** entries requires entering the admin password
- **Deleting** entries requires entering the admin password
- Password is verified on the server side
- Invalid password attempts show: **"Not authorized to make this change. Invalid password."**
- Successful changes show: **"[Item] updated/deleted successfully!"** (auto-dismisses after 3 seconds)
- Server logs password verification attempts for debugging

## Technology Stack

**Frontend:**
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date formatting

**Backend:**
- **Express.js** - Web server
- **Node.js** - Runtime
- **CORS** - Cross-origin resource sharing
- **File System (fs)** - JSON file storage

## Deployment

This app is configured for deployment on **Vercel (frontend) + Railway (backend)**.

### Quick Deploy

See [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) for a 10-minute deployment checklist.

### Full Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions.

### Environment Variables

**Frontend (Vercel):**
- `VITE_API_URL` - Your Railway backend URL + `/api`

**Backend (Railway):**
- `PORT` - Port number (default: 3001)
- `ADMIN_PASSWORD` - Your admin password
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Your Vercel frontend URL

## License

MIT
