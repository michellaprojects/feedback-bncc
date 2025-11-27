# BNCC Feedback System

A complete feedback management application for BNCC events, featuring a clean public form and a powerful admin dashboard. Built with React, Express, and Tailwind CSS with BNCC-inspired design.

## Features

### Public Feedback Form
- Clean, minimalist design inspired by BNCC landing pages
- Easy-to-fill form with validation
- Real-time success notifications
- Star rating system
- Responsive design for mobile and desktop

### Admin Panel
- Dashboard-style interface similar to BNCC repos
- Complete CRUD operations (Create, Read, Update, Delete)
- Real-time statistics (total, open, in-review, resolved, average rating)
- Advanced filtering by status, division, and search
- Status management with color-coded badges
- Inline editing and deletion
- Sortable and responsive table view

### Backend API
- RESTful API built with Express
- JSON file-based persistence
- Complete CRUD endpoints
- Query-based filtering and search
- CORS enabled for frontend integration

## Project Structure

```
feedback-bncc/
├── backend/
│   ├── controllers/
│   │   └── feedbackController.js    # Business logic for CRUD operations
│   ├── data/
│   │   ├── storage.js                # JSON file persistence layer
│   │   └── feedbacks.json            # Data storage (auto-generated)
│   ├── routes/
│   │   └── feedback.js               # API routes
│   └── server.js                     # Express server setup
├── src/
│   ├── components/
│   │   ├── FeedbackForm.jsx          # Public feedback submission form
│   │   ├── AdminPanel.jsx            # Admin dashboard
│   │   └── EditModal.jsx             # Edit feedback modal
│   ├── App.jsx                       # Main app with routing
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Tailwind CSS imports
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite configuration
├── postcss.config.js                 # PostCSS configuration
├── package.json                      # Project dependencies
├── API_DOCUMENTATION.md              # Complete API documentation
└── README.md                         # This file
```

## Data Schema

Each feedback submission contains:

```typescript
{
  id: string,           // Unique identifier (auto-generated timestamp)
  name: string,         // Submitter's name (required)
  email: string,        // Submitter's email (required)
  eventName: string,    // Name of the event (required)
  division: "LnT" | "EEO" | "PR" | "HRD" | "RnD",  // Division (required)
  rating: 1-5,          // Rating from 1 to 5 (required)
  comment: string,      // Optional comment
  suggestion: string,   // Optional suggestion
  status: "open" | "in-review" | "resolved",  // Status (default: "open")
  createdAt: string     // ISO timestamp (auto-generated)
}
```

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/michellaprojects/feedback-bncc.git
cd feedback-bncc
```

2. **Install dependencies**
```bash
npm install
```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend (Vite):** http://localhost:5173
- **Backend (Express):** http://localhost:5000

### Run Separately

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

### Production Build

Build the frontend for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

### Public Feedback Form

1. Navigate to http://localhost:5173
2. Fill in all required fields:
   - Name
   - Email
   - Event Name
   - Division (select from dropdown)
   - Rating (use slider, 1-5 stars)
   - Comment (optional)
   - Suggestion (optional)
3. Click "Submit Feedback"
4. See success notification

### Admin Panel

1. Navigate to http://localhost:5173/admin
2. View dashboard statistics at the top
3. Use filters to narrow down feedbacks:
   - Search by name, email, event name, or content
   - Filter by status (open, in-review, resolved)
   - Filter by division
4. Manage feedbacks:
   - Change status directly from dropdown
   - Click "Edit" to modify full feedback
   - Click "Delete" to remove feedback (with confirmation)

## API Documentation

Complete API documentation is available in [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

### Quick API Reference

```
GET    /api/feedback         # Get all feedbacks (with optional filters)
GET    /api/feedback/:id     # Get specific feedback
POST   /api/feedback         # Create new feedback
PUT    /api/feedback/:id     # Update feedback
DELETE /api/feedback/:id     # Delete feedback
```

### Example API Usage

**Create feedback:**
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "BNCC Bootcamp 2024",
    "division": "LnT",
    "rating": 5,
    "comment": "Great event!",
    "suggestion": "More hands-on sessions"
  }'
```

**Get all feedbacks:**
```bash
curl http://localhost:5000/api/feedback
```

**Filter feedbacks:**
```bash
curl "http://localhost:5000/api/feedback?status=open&division=LnT"
```

## Design System

The application follows BNCC design principles:

### Colors
- Primary: Blue (#2563EB)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Neutral: Gray shades

### Typography
- Font: System sans-serif (Inter/Roboto-like)
- Clean, readable text hierarchy
- Proper spacing (24-32px padding)

### Components
- Rounded corners (medium, 8-12px)
- Subtle shadows
- Smooth transitions
- Hover effects on interactive elements

### Status Badges
- **Open:** Green background (new feedback)
- **In Review:** Yellow background (being reviewed)
- **Resolved:** Blue background (completed)

## Technologies Used

### Frontend
- **React 19** - UI framework
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite 7** - Build tool and dev server

### Backend
- **Express 5** - Web framework for Node.js
- **CORS** - Cross-Origin Resource Sharing
- **Node.js File System** - JSON file persistence

### Development Tools
- **Nodemon** - Auto-restart server on changes
- **Concurrently** - Run multiple npm scripts
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Features Breakdown

### ✅ Create (POST)
- Submit feedback from public form
- Required field validation
- Email format validation
- Division and rating validation
- Auto-generate ID and timestamp
- Default status: "open"

### ✅ Read (GET)
- View all feedbacks in admin panel
- Filter by status (open/in-review/resolved)
- Filter by division (LnT/EEO/PR/HRD/RnD)
- Search across multiple fields
- Sort by date (newest first)
- Display statistics and metrics

### ✅ Update (PUT)
- Edit feedback details via modal
- Update status via dropdown
- Inline status changes
- Update any field (name, email, event, division, rating, comments)
- Validation on update

### ✅ Delete (DELETE)
- Delete feedback with confirmation dialog
- Permanent removal from storage
- Cascade removal from UI

### ✅ Persistence
- JSON file storage in `backend/data/feedbacks.json`
- Auto-create file if not exists
- Pretty-printed JSON (readable format)
- Synchronous read/write operations
- Data survives server restarts

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Vite HMR for instant development updates
- Optimized production builds
- Code splitting with React Router
- Tailwind CSS purging for minimal CSS
- Efficient JSON file operations

## Security Considerations

This is a demo application. For production use, consider:
- Authentication and authorization
- Input sanitization
- Rate limiting
- Database instead of JSON files
- Environment variables for configuration
- HTTPS
- CSRF protection
- SQL injection prevention (if using database)

## Future Enhancements

Potential improvements:
- [ ] User authentication
- [ ] Email notifications
- [ ] Export to CSV/Excel
- [ ] Analytics dashboard
- [ ] Attachment support
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time updates with WebSockets
- [ ] Pagination for large datasets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## Author

BNCC Feedback System

## Support

For issues or questions, please open an issue on GitHub:
https://github.com/michellaprojects/feedback-bncc/issues

---

**Made with ❤️ for BNCC Community**
