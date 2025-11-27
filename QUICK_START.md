# Quick Start Guide

Get the BNCC Feedback System up and running in 3 minutes!

## Prerequisites
- Node.js 16+ installed
- npm package manager

## Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the application (frontend + backend)
npm run dev
```

That's it! The application will open in your browser.

## Access Points

- **Public Form:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin
- **API Server:** http://localhost:5000/api

## Test the Application

### Submit Feedback
1. Go to http://localhost:5173
2. Fill the form:
   - Name: John Doe
   - Email: john@example.com
   - Event: BNCC Bootcamp 2024
   - Division: LnT
   - Rating: 5 stars
   - Add comments/suggestions
3. Click "Submit Feedback"

### View in Admin Panel
1. Go to http://localhost:5173/admin
2. See your submission in the table
3. Try:
   - Changing status (open → in-review → resolved)
   - Editing the feedback
   - Using filters and search
   - Deleting feedback

## Folder Structure

```
feedback-bncc/
├── backend/          # Express API server
├── src/              # React frontend
│   └── components/   # React components
├── package.json      # Dependencies and scripts
└── README.md         # Full documentation
```

## Available Scripts

```bash
npm run dev       # Run both frontend & backend
npm run client    # Run frontend only (port 5173)
npm run server    # Run backend only (port 5000)
npm run build     # Build for production
```

## Data Storage

Feedback is stored in: `backend/data/feedbacks.json`

This file is auto-created on first run. You can view/edit it directly if needed.

## API Endpoints

```
POST   /api/feedback      # Create
GET    /api/feedback      # Read all
GET    /api/feedback/:id  # Read one
PUT    /api/feedback/:id  # Update
DELETE /api/feedback/:id  # Delete
```

## Need Help?

- Full documentation: [README.md](README.md)
- API documentation: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Issues: https://github.com/michellaprojects/feedback-bncc/issues

---

**Happy coding! 🚀**
