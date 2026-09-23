// ============================================
// EXAMPLE 2: URL Routing - Task 2
// ============================================
// This example shows how to handle different URLs (routes)
// This helps with: TODO Task 2 - Route Mapping

const http = require('http');
const PORT = 3002;

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    
    // Check which URL was requested and respond accordingly
    if (req.url === '/') {
        // Home page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home Page</h1><p>Welcome to the home page!</p>');
    }
    else if (req.url === '/about') {
        // About page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1><p>This is the about page!</p>');
    }
    else if (req.url === '/contact') {
        // Contact page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Contact Page</h1><p>Contact us here!</p>');
    }
    else {
        // Unknown route - 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1><p>The page you requested does not exist.</p>');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Try these URLs:');
    console.log('  http://localhost:3002/');
    console.log('  http://localhost:3002/about');
    console.log('  http://localhost:3002/contact');
    console.log('  http://localhost:3002/nonexistent (will show 404)');
});

// KEY CONCEPTS:
// - req.url contains the path the user requested (e.g., '/', '/about')
// - Use if-else if-else to check different URLs
// - Each route can send different content
// - Unknown routes should return 404 status
