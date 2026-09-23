// ============================================
// EXAMPLE 4: MIME Types and Serving Different File Types - Task 4
// ============================================
// This example shows how to serve different file types (HTML, CSS, JS)
// with correct Content-Type headers
// This helps with: TODO Task 4 - Serve CSS Files

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3004;
const PUBLIC_DIR = path.join(__dirname, '..', 'starter', 'public');

// MIME types tell the browser what kind of file it's receiving
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);
    
    // Map URLs to files
    let filePath;
    if (req.url === '/') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    } 
    else if (req.url.startsWith('/styles/')) {
        // Request for CSS file
        filePath = path.join(PUBLIC_DIR, req.url);
        
        // Security check: prevent path traversal attacks
        // Someone could try /styles/../../../etc/passwd
        const normalizedPath = path.normalize(filePath);
        if (!normalizedPath.startsWith(PUBLIC_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('403 - Forbidden: Path traversal detected');
            return;
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
        return;
    }
    
    // Get file extension to determine MIME type
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'text/plain';
    
    console.log(`  File: ${filePath}`);
    console.log(`  Extension: ${extname}`);
    console.log(`  Content-Type: ${contentType}`);
    
    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File doesn't exist
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - File Not Found');
            } else {
                // Other error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Server Error');
            }
        } else {
            // Success - send file with correct Content-Type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('This server can serve HTML and CSS files!');
    console.log('The index.html will automatically load its CSS stylesheet.');
});

// KEY CONCEPTS:
// - path.extname() gets file extension (e.g., '.css', '.html')
// - MIME types tell browser how to interpret the file
// - Wrong Content-Type = browser won't display file correctly
// - req.url.startsWith() checks if URL begins with certain path
// - path.normalize() resolves '..' and prevents security issues
// - Always validate file paths for security!
