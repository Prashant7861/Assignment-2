# Workshop 02 – Building a Node.js HTTP Server

## Overview
In this workshop, you will learn the fundamentals of **Node.js HTTP server** and **routing** by building a simple web server from scratch without using any frameworks.

This workshop focuses on **practical understanding** of how web servers work at a fundamental level.

---

## Learning Objectives
By the end of this workshop, you should be able to:
- Create an HTTP server using Node.js built-in `http` module
- Implement routing to serve different HTML pages
- Serve static files (HTML, CSS) with correct MIME types
- Handle 404 (Not Found) and 500 (Server Error) responses
- Understand the basics of HTTP request/response cycle

---

## Topics Covered
- Node.js `http` module
- File system operations with `fs` module
- Path handling with `path` module
- HTTP status codes and headers
- MIME types for different file extensions
- Basic routing and error handling
- (Bonus) Creating JSON API endpoints

---

## Prerequisites
Before starting this workshop, make sure you have:
- Basic knowledge of JavaScript
- Understanding of HTML and CSS
- Installed:
  - Node.js (LTS version recommended)
  - npm (comes with Node.js)
  - Git
  - A code editor (VS Code recommended)

---

## Project Description
You will build:
> **A simple HTTP web server that serves multiple HTML pages, CSS files, and handles custom error pages**

The server will:
- Serve a homepage, about page, and contact page
- Load CSS stylesheets for proper styling
- Display custom 404 and 500 error pages
- (Bonus) Provide a JSON API endpoint for current date/time

---

## Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Laurea-FullStack-2026/Workshop02_Nodejs.git
cd Workshop02_Nodejs
```

### 2️⃣ Navigate to the starter folder
```bash
cd starter
```

### 3️⃣ Install dependencies
```bash
npm install
```
*Note: This project uses only Node.js core modules, so no external dependencies are needed.*

### 4️⃣ Start working on the tasks
Open `server.js` and follow the TODO comments to complete each task.

---

## Project Structure

```
Workshop02_Nodejs/
├── starter/              # Your working directory
│   ├── server.js        # Main server file (complete the TODOs here)
│   ├── package.json     # Project configuration
│   ├── public/          # Static files directory
│   │   ├── index.html   # Home page
│   │   ├── about.html   # About page
│   │   ├── contact.html # Contact page
│   │   ├── 404.html     # Custom 404 error page
│   │   ├── 500.html     # Custom 500 error page
│   │   └── styles/
│   │       └── style.css # Stylesheet
│   └── README.md
│
├── Solution/            # Complete solution (for reference only)
│   └── server.js        # Fully implemented server
│
├── requirement.md       # Detailed task requirements
└── README.md           # This file
```

---

## Tasks Overview

Complete the following tasks in order:

### ✅ Task 1 – Start the Server
- Implement `server.listen()` to start the server on port 3000
- Log a message when the server starts

### ✅ Task 2 – Add Routing
- Map URL paths to HTML files:
  - `/` → `index.html`
  - `/about` → `about.html`
  - `/contact` → `contact.html`

### ✅ Task 3 – Serve HTML Files
- Read files using `fs.readFile()`
- Send appropriate HTTP response with correct status codes and headers

### ✅ Task 4 – Serve CSS Files
- Handle requests for CSS files from `/styles/` folder
- Implement path traversal security check

### ✅ Task 5 – Error Handling
- Implement `handle404()` function for 404 errors
- Implement `handleServerError()` function for 500 errors

### 🌟 Task 6 (Bonus) – Create API Endpoint
- Create `/api/time` endpoint that returns current date/time as JSON

---

## Running Your Server

1. Make sure you're in the `starter` directory
2. Run the server:
   ```bash
   node server.js
   ```
3. Open your browser and visit:
   - `http://localhost:3000` - Home page
   - `http://localhost:3000/about` - About page
   - `http://localhost:3000/contact` - Contact page
   - `http://localhost:3000/nonexistent` - Test 404 error
   - `http://localhost:3000/api/time` - Test API endpoint (bonus)

4. Stop the server: Press `Ctrl + C` in the terminal

---

## Testing Your Implementation

### Manual Testing Checklist
- [ ] Server starts without errors
- [ ] Home page loads at `http://localhost:3000`
- [ ] About page loads at `/about`
- [ ] Contact page loads at `/contact`
- [ ] CSS styles are applied correctly
- [ ] Custom 404 page appears for invalid URLs
- [ ] (Bonus) `/api/time` returns JSON with current time

---

## Common Issues & Troubleshooting

### Port Already in Use
**Error:** `EADDRINUSE: address already in use`
**Solution:** 
- Stop any other server running on port 3000
- Or change the PORT constant in `server.js`

### CSS Not Loading
**Problem:** HTML loads but no styling appears
**Check:**
- The CSS file path in HTML matches the server route
- MIME type for CSS is set correctly
- Path traversal security check allows the CSS file

### 404/500 Pages Not Showing
**Check:**
- `handle404()` and `handleServerError()` are properly implemented
- HTML files exist in the `public` folder

---

## Learning Resources

- [Node.js HTTP Module Documentation](https://nodejs.org/api/http.html)
- [Node.js File System Documentation](https://nodejs.org/api/fs.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

---

## Submission

After completing all tasks:
1. Test your server thoroughly
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Complete Workshop 02 - HTTP Server"
   git push origin main
   ```
3. Verify your repository on GitHub

---

## Need Help?

- Review the comments in `server.js` for detailed hints
- Check the `Solution` folder for reference (try to solve it yourself first!)
- Refer to `requirement.md` for detailed task specifications
- Ask your instructor or teaching assistant

---

## Next Steps

After completing this workshop, you'll be ready to:
- Learn about Express.js framework (which simplifies routing)
- Explore middleware concepts
- Build REST APIs
- Add database integration

---

**Good luck and happy coding! 🚀**
