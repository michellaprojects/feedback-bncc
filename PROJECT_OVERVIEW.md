# BNCC Feedback System - Project Overview

## Complete Project Structure

```
feedback-bncc/
│
├── backend/                          # Backend Server (Express + Node.js)
│   ├── controllers/
│   │   └── feedbackController.js     # CRUD business logic
│   ├── data/
│   │   ├── storage.js                # JSON file persistence layer
│   │   └── feedbacks.json            # Data storage (auto-generated)
│   ├── routes/
│   │   └── feedback.js               # API route definitions
│   └── server.js                     # Express app & server setup
│
├── src/                              # Frontend (React + Vite)
│   ├── components/
│   │   ├── FeedbackForm.jsx          # Public feedback submission form
│   │   ├── AdminPanel.jsx            # Admin dashboard (table, filters, stats)
│   │   └── EditModal.jsx             # Edit feedback modal dialog
│   ├── App.jsx                       # Main app component with routing
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Tailwind CSS imports
│
├── public/                           # Static assets (auto-created by Vite)
│
├── node_modules/                     # Dependencies (npm install)
│
├── .gitignore                        # Git ignore rules
├── index.html                        # HTML entry point
├── package.json                      # Project config & dependencies
├── postcss.config.js                 # PostCSS config for Tailwind
├── vite.config.js                    # Vite bundler config
│
├── API_DOCUMENTATION.md              # Complete API reference
├── README.md                         # Full project documentation
├── QUICK_START.md                    # Quick start guide
└── PROJECT_OVERVIEW.md               # This file
```

## Tech Stack Summary

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| React Router DOM | 7.9.6 | Client-side routing |
| Vite | 7.2.4 | Build tool & dev server |
| Tailwind CSS | 4.1.17 | Utility-first styling |
| PostCSS | 8.5.6 | CSS processing |
| Autoprefixer | 10.4.22 | CSS vendor prefixes |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Express | 5.1.0 | Web framework |
| CORS | 2.8.5 | Cross-origin support |
| Node.js FS | Built-in | File system (JSON storage) |

### Development
| Technology | Version | Purpose |
|------------|---------|---------|
| Nodemon | 3.1.11 | Auto-restart server |
| Concurrently | 9.2.1 | Run multiple scripts |

## Component Architecture

### Frontend Components

```
App.jsx (Router)
├── Navigation Bar
└── Routes
    ├── / → FeedbackForm.jsx
    │   ├── Form fields (name, email, event, division, rating)
    │   ├── Success notification
    │   └── Error handling
    │
    └── /admin → AdminPanel.jsx
        ├── Statistics cards (total, open, in-review, resolved, avg rating)
        ├── Filter panel (search, status, division)
        ├── Feedback table
        │   ├── Status dropdown (inline editing)
        │   ├── Edit button → EditModal.jsx
        │   └── Delete button → Confirmation dialog
        └── Modals
            ├── EditModal.jsx (full edit form)
            └── DeleteConfirm (confirmation dialog)
```

### Backend API Structure

```
server.js (Express App)
├── Middleware
│   ├── CORS
│   └── JSON body parser
│
└── Routes (/api/feedback)
    ├── GET /           → getAllFeedbacks()
    ├── GET /:id        → getFeedback()
    ├── POST /          → createFeedback()
    ├── PUT /:id        → updateFeedbackData()
    └── DELETE /:id     → deleteFeedbackData()
        ↓
    Controllers (feedbackController.js)
        ↓
    Data Layer (storage.js)
        ↓
    JSON File (feedbacks.json)
```

## Data Flow

### Create Feedback (Public Form)
```
User fills form
    ↓
FeedbackForm.jsx validates
    ↓
POST /api/feedback
    ↓
feedbackController.createFeedback()
    ↓
storage.addFeedback()
    ↓
Write to feedbacks.json
    ↓
Return new feedback object
    ↓
Show success notification
```

### Read Feedbacks (Admin Panel)
```
AdminPanel.jsx loads
    ↓
GET /api/feedback?status=...&division=...&search=...
    ↓
feedbackController.getAllFeedbacks()
    ↓
storage.readFeedbacks()
    ↓
Apply filters (status, division, search)
    ↓
Sort by date (newest first)
    ↓
Return feedback array
    ↓
Display in table with stats
```

### Update Feedback (Admin Panel)
```
User clicks "Edit" or changes status
    ↓
EditModal.jsx or inline dropdown
    ↓
PUT /api/feedback/:id
    ↓
feedbackController.updateFeedbackData()
    ↓
storage.updateFeedback()
    ↓
Update feedbacks.json
    ↓
Return updated feedback
    ↓
Refresh UI state
```

### Delete Feedback (Admin Panel)
```
User clicks "Delete"
    ↓
Show confirmation dialog
    ↓
User confirms
    ↓
DELETE /api/feedback/:id
    ↓
feedbackController.deleteFeedbackData()
    ↓
storage.deleteFeedback()
    ↓
Remove from feedbacks.json
    ↓
Return success
    ↓
Remove from UI state
```

## API Contract

### Feedback Schema
```typescript
interface Feedback {
  id: string              // Auto-generated (timestamp)
  name: string            // Required
  email: string           // Required (valid email)
  eventName: string       // Required
  division: Division      // Required (LnT|EEO|PR|HRD|RnD)
  rating: number          // Required (1-5)
  comment?: string        // Optional
  suggestion?: string     // Optional
  status: Status          // Auto-set (open|in-review|resolved)
  createdAt: string       // Auto-generated (ISO timestamp)
}
```

### API Endpoints
```
BASE: http://localhost:5000/api

GET    /feedback              → Get all (with filters)
GET    /feedback/:id          → Get one by ID
POST   /feedback              → Create new
PUT    /feedback/:id          → Update existing
DELETE /feedback/:id          → Delete by ID
```

## Design System (BNCC Style)

### Color Palette
```css
Primary Blue:   #2563EB (bg-blue-600)
Success Green:  #10B981 (bg-green-100, text-green-800)
Warning Yellow: #F59E0B (bg-yellow-100, text-yellow-800)
Info Blue:      #3B82F6 (bg-blue-100, text-blue-800)
Danger Red:     #EF4444 (bg-red-600)
Gray:           #6B7280 to #F9FAFB (various shades)
```

### Typography
```css
Font Family: system-ui, -apple-system, "Segoe UI", sans-serif
Headings:    font-bold, text-xl to text-3xl
Body:        font-normal, text-sm to text-base
Small:       text-xs
```

### Spacing
```css
Container:   max-w-7xl mx-auto
Padding:     p-4 to p-8 (16px to 32px)
Gap:         space-x-4 to space-x-8
Margin:      mb-4 to mb-8
```

### Components
```css
Buttons:     rounded-lg, py-2 px-4, font-medium, transition-colors
Inputs:      rounded-lg, border, focus:ring-2, focus:ring-blue-500
Cards:       rounded-lg, shadow-sm, border
Badges:      rounded, px-2 py-1, text-xs, font-medium
Tables:      rounded-lg, border, hover:bg-gray-50
```

## Features Checklist

### ✅ Complete Features

#### Create (POST)
- [x] Public feedback form
- [x] Required field validation
- [x] Email format validation
- [x] Division validation (LnT, EEO, PR, HRD, RnD)
- [x] Rating validation (1-5)
- [x] Auto-generate ID (timestamp)
- [x] Auto-generate createdAt (ISO string)
- [x] Default status: "open"
- [x] Success notification
- [x] Error handling

#### Read (GET)
- [x] Admin panel with table view
- [x] Display all feedbacks
- [x] Filter by status
- [x] Filter by division
- [x] Search across fields (name, email, event, comment, suggestion)
- [x] Sort by date (newest first)
- [x] Statistics dashboard (total, open, in-review, resolved, avg rating)
- [x] Status badges with colors
- [x] Responsive design
- [x] Empty state handling

#### Update (PUT)
- [x] Edit modal with full form
- [x] Inline status dropdown editing
- [x] Update any field
- [x] Validation on update
- [x] Optimistic UI updates
- [x] Error handling

#### Delete (DELETE)
- [x] Delete button in table
- [x] Confirmation dialog
- [x] Permanent removal
- [x] UI state update
- [x] Error handling

#### Persistence
- [x] JSON file storage
- [x] Auto-create file if not exists
- [x] Pretty-printed JSON (readable)
- [x] Async read/write operations
- [x] Data survives server restarts

## Running the Application

### Development (Recommended)
```bash
npm run dev
```
Starts both servers:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Separate Servers
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Production Build
```bash
npm run build     # Build for production
npm run preview   # Preview production build
```

## Testing Guide

### Manual Testing Checklist

#### Public Form
- [ ] Submit with all required fields
- [ ] Submit without name (should fail)
- [ ] Submit without email (should fail)
- [ ] Submit with invalid email (should fail)
- [ ] Submit without division (should fail)
- [ ] Try all ratings (1-5)
- [ ] Add comment and suggestion
- [ ] Check success notification appears

#### Admin Panel
- [ ] View submitted feedback in table
- [ ] Change status via dropdown
- [ ] Filter by status (open, in-review, resolved)
- [ ] Filter by division (LnT, EEO, PR, HRD, RnD)
- [ ] Search by name
- [ ] Search by email
- [ ] Search by event name
- [ ] Click "Edit" and modify feedback
- [ ] Save edited feedback
- [ ] Click "Delete" and confirm
- [ ] Cancel delete operation
- [ ] Check statistics update correctly

#### API Testing (cURL)
```bash
# Create
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","eventName":"Test Event","division":"LnT","rating":5}'

# Read all
curl http://localhost:5000/api/feedback

# Read with filters
curl "http://localhost:5000/api/feedback?status=open&division=LnT"

# Update (replace ID)
curl -X PUT http://localhost:5000/api/feedback/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status":"resolved"}'

# Delete (replace ID)
curl -X DELETE http://localhost:5000/api/feedback/1234567890
```

## Performance Considerations

### Frontend
- Vite HMR for instant updates
- React 19 with modern optimizations
- Tailwind CSS with minimal bundle size
- Code splitting via React Router
- Optimized re-renders (useState, useEffect)

### Backend
- Express 5 (latest performance improvements)
- Minimal middleware overhead
- Efficient file I/O operations
- No database overhead (JSON file)

### Scalability Notes
For production with large datasets, consider:
- Database (PostgreSQL, MongoDB)
- Pagination (limit/offset)
- Caching (Redis)
- Real-time updates (WebSockets)
- Load balancing

## Security Notes

⚠️ This is a demo application. For production:
- Add authentication & authorization
- Implement rate limiting
- Sanitize all inputs
- Use HTTPS
- Add CSRF protection
- Use environment variables
- Implement proper logging
- Add data backup strategy

## File Sizes (Approximate)

```
backend/
  controllers/feedbackController.js   ~3 KB
  data/storage.js                     ~2 KB
  routes/feedback.js                  ~0.5 KB
  server.js                           ~0.5 KB

src/
  components/FeedbackForm.jsx         ~7 KB
  components/AdminPanel.jsx           ~12 KB
  components/EditModal.jsx            ~4 KB
  App.jsx                             ~1 KB
  main.jsx                            ~0.3 KB
  index.css                           ~0.1 KB

Total source code: ~30 KB (excluding node_modules)
```

## Environment Variables (Optional)

You can create `.env` file for configuration:

```env
# Server
PORT=5000
NODE_ENV=development

# Frontend (must start with VITE_)
VITE_API_URL=http://localhost:5000/api
```

Update code to use:
```javascript
// Backend
const PORT = process.env.PORT || 5000;

// Frontend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## Next Steps

After initial setup, you can:
1. Customize design colors to match BNCC branding
2. Add more divisions if needed
3. Add email notifications
4. Export data to CSV/Excel
5. Add charts and analytics
6. Implement user authentication
7. Add dark mode
8. Integrate with database

## Support & Resources

- [README.md](README.md) - Full documentation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- GitHub Issues: https://github.com/michellaprojects/feedback-bncc/issues

---

**Project Status:** ✅ Complete and Ready for Development

**Last Updated:** November 2025
