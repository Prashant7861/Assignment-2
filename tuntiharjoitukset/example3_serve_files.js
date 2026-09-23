// ============================================
// EXAMPLE 3: Reading and Serving Files - Task 3
// ============================================
// This example shows how to read HTML files and send them to the client
// This helps with: TODO Task 3 - Serve Files

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3003;
const PUBLIC_DIR = path.join(__dirname, '..', 'starter', 'public');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);
    
    // Determine which file to serve
    let filePath;
    if (req.url === '/') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    } else if (req.url === '/about') {
        filePath = path.join(PUBLIC_DIR, 'about.html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
        return;
    }
    
    // Read the file from disk
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Error reading file
            console.error('Error reading file:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Server Error: Could not read file');
        } else {
            // Successfully read file - send it to client
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Serving files from:', PUBLIC_DIR);
    console.log('Try: http://localhost:3003/ or http://localhost:3003/about');
});

// KEY CONCEPTS:
// - fs.readFile(path, callback) reads a file from disk
// - Callback has two parameters: err and content
// - If err exists, something went wrong (file not found, no permission, etc.)
// - If no error, content contains the file data
// - res.writeHead(statusCode, headers) sets the response status and headers
// - res.end(content, encoding) sends the content to the client
// - Always handle both success and error cases!
