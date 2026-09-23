# Workshop 02 - Node.js HTTP Server with Routing

This project demonstrates a simple Node.js HTTP server with routing capabilities.

## Features

✅ **Task 1**: HTTP server running on port 3000  
✅ **Task 2**: Routing implementation mapping requests to HTML files  
✅ **Task 3**: HTML pages served (index, about, contact)  
✅ **Task 4**: CSS files served from /styles directory  
✅ **Task 5**: Error handling (404 for unknown paths)  
✅ **Task 6** (Bonus): `/api/time` endpoint returning current date/time in JSON  

## Project Structure

```
starter/
├── server.js                 # Main server file
├── package.json             # Project configuration
├── public/                  # Public directory for static files
│   ├── index.html          # Home page
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   └── styles/
│       └── style.css       # Stylesheet
└── .gitignore              # Git ignore file
```

## Installation

No external dependencies required! This project uses only Node.js core modules.

```bash
cd starter
```

## Running the Server

```bash
npm start
```

Or directly:

```bash
node server.js
```

The server will start on `http://localhost:3000`

## Available Routes

- `GET /` → Home page (index.html)
- `GET /about` → About page (about.html)
- `GET /contact` → Contact page (contact.html)
- `GET /styles/style.css` → CSS stylesheet
- `GET /api/time` → Current date/time in JSON format
- Any unknown path → 404 error page

## Testing the Server

Once the server is running, you can test it:

1. **Open in browser**: Navigate to `http://localhost:3000`
2. **Test API endpoint**: Visit `http://localhost:3000/api/time` or use curl:
   ```bash
   curl http://localhost:3000/api/time
   ```
3. **Test 404 handling**: Visit any non-existent route like `http://localhost:3000/unknown`

## Implementation Details

### Routing Logic
The server maps incoming requests to appropriate files:
- Root path (`/`) serves `index.html`
- `/about` serves `about.html`
- `/contact` serves `contact.html`
- `/styles/*` serves CSS files from the styles directory
- Unknown paths return a 404 error page

### Error Handling
- **404 Not Found**: Custom HTML page for missing resources
- **500 Server Error**: Handled for unexpected server errors
- All errors are logged to console for debugging

### Bonus Feature
The `/api/time` endpoint returns current date/time in JSON:
```json
{
  "datetime": "2026-01-21T13:00:00.000Z",
  "timestamp": 1769000000000
}
```

## Technologies Used

- Node.js (core modules only)
  - `http` - HTTP server
  - `fs` - File system operations
  - `path` - Path handling

## License
Copyright © 2026 Jari Kovis, Laurea Fullstack 2026

ISC
