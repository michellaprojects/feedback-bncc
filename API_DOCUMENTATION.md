# BNCC Feedback API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Get All Feedbacks
Retrieve all feedback submissions with optional filtering.

**Endpoint:** `GET /feedback`

**Query Parameters:**
- `status` (optional): Filter by status (`open`, `in-review`, `resolved`)
- `division` (optional): Filter by division (`LnT`, `EEO`, `PR`, `HRD`, `RnD`)
- `search` (optional): Search across name, email, event name, comment, and suggestion

**Example Requests:**
```bash
# Get all feedbacks
GET /feedback

# Filter by status
GET /feedback?status=open

# Filter by division
GET /feedback?division=LnT

# Search
GET /feedback?search=bootcamp

# Combine filters
GET /feedback?status=open&division=LnT&search=workshop
```

**Response (200 OK):**
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "BNCC Bootcamp 2024",
    "division": "LnT",
    "rating": 5,
    "comment": "Great event!",
    "suggestion": "More hands-on sessions",
    "status": "open",
    "createdAt": "2024-11-27T12:00:00.000Z"
  }
]
```

---

### 2. Get Single Feedback
Retrieve a specific feedback by ID.

**Endpoint:** `GET /feedback/:id`

**Path Parameters:**
- `id` (required): Feedback ID

**Example Request:**
```bash
GET /feedback/1234567890
```

**Response (200 OK):**
```json
{
  "id": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "BNCC Bootcamp 2024",
  "division": "LnT",
  "rating": 5,
  "comment": "Great event!",
  "suggestion": "More hands-on sessions",
  "status": "open",
  "createdAt": "2024-11-27T12:00:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Feedback not found"
}
```

---

### 3. Create Feedback
Submit new feedback.

**Endpoint:** `POST /feedback`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "BNCC Bootcamp 2024",
  "division": "LnT",
  "rating": 5,
  "comment": "Great event!",
  "suggestion": "More hands-on sessions"
}
```

**Required Fields:**
- `name` (string)
- `email` (string, valid email format)
- `eventName` (string)
- `division` (string, one of: `LnT`, `EEO`, `PR`, `HRD`, `RnD`)
- `rating` (number, 1-5)

**Optional Fields:**
- `comment` (string)
- `suggestion` (string)

**Response (201 Created):**
```json
{
  "id": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "BNCC Bootcamp 2024",
  "division": "LnT",
  "rating": 5,
  "comment": "Great event!",
  "suggestion": "More hands-on sessions",
  "status": "open",
  "createdAt": "2024-11-27T12:00:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Missing required fields: name, email, eventName, division, rating"
}
```

---

### 4. Update Feedback
Update an existing feedback.

**Endpoint:** `PUT /feedback/:id`

**Path Parameters:**
- `id` (required): Feedback ID

**Request Body:**
You can update any of the following fields:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "eventName": "Updated Event Name",
  "division": "EEO",
  "rating": 4,
  "comment": "Updated comment",
  "suggestion": "Updated suggestion",
  "status": "in-review"
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Response (200 OK):**
```json
{
  "id": "1234567890",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "eventName": "Updated Event Name",
  "division": "EEO",
  "rating": 4,
  "comment": "Updated comment",
  "suggestion": "Updated suggestion",
  "status": "in-review",
  "createdAt": "2024-11-27T12:00:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Feedback not found"
}
```

---

### 5. Delete Feedback
Delete a feedback submission.

**Endpoint:** `DELETE /feedback/:id`

**Path Parameters:**
- `id` (required): Feedback ID

**Example Request:**
```bash
DELETE /feedback/1234567890
```

**Response (200 OK):**
```json
{
  "message": "Feedback deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Feedback not found"
}
```

---

## Data Schema

### Feedback Object
```typescript
{
  id: string,           // Unique identifier (auto-generated timestamp)
  name: string,         // Submitter's name
  email: string,        // Submitter's email
  eventName: string,    // Name of the event
  division: "LnT" | "EEO" | "PR" | "HRD" | "RnD",  // Division
  rating: 1 | 2 | 3 | 4 | 5,  // Rating (1-5)
  comment: string,      // Optional comment
  suggestion: string,   // Optional suggestion
  status: "open" | "in-review" | "resolved",  // Status (default: "open")
  createdAt: string     // ISO timestamp (auto-generated)
}
```

---

## Error Responses

### 400 Bad Request
Returned when request data is invalid.
```json
{
  "error": "Error message describing what went wrong"
}
```

### 404 Not Found
Returned when requested feedback doesn't exist.
```json
{
  "error": "Feedback not found"
}
```

### 500 Internal Server Error
Returned when server encounters an error.
```json
{
  "error": "Failed to perform operation"
}
```

---

## Example Usage with cURL

### Create Feedback
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "BNCC Bootcamp 2024",
    "division": "LnT",
    "rating": 5,
    "comment": "Excellent workshop!",
    "suggestion": "More practical sessions"
  }'
```

### Get All Feedbacks
```bash
curl http://localhost:5000/api/feedback
```

### Get Feedback by ID
```bash
curl http://localhost:5000/api/feedback/1234567890
```

### Update Feedback Status
```bash
curl -X PUT http://localhost:5000/api/feedback/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'
```

### Delete Feedback
```bash
curl -X DELETE http://localhost:5000/api/feedback/1234567890
```

---

## Example Usage with JavaScript Fetch

### Create Feedback
```javascript
const response = await fetch('http://localhost:5000/api/feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    eventName: 'BNCC Bootcamp 2024',
    division: 'LnT',
    rating: 5,
    comment: 'Excellent workshop!',
    suggestion: 'More practical sessions'
  })
});

const data = await response.json();
console.log(data);
```

### Get All Feedbacks
```javascript
const response = await fetch('http://localhost:5000/api/feedback');
const feedbacks = await response.json();
console.log(feedbacks);
```

### Update Feedback
```javascript
const response = await fetch('http://localhost:5000/api/feedback/1234567890', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'in-review'
  })
});

const updated = await response.json();
console.log(updated);
```

### Delete Feedback
```javascript
const response = await fetch('http://localhost:5000/api/feedback/1234567890', {
  method: 'DELETE'
});

const result = await response.json();
console.log(result);
```
