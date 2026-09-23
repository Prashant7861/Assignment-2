const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    try {
        // Ignore query strings (e.g. /about?x=1 -> /about)
        const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

        // ========================================
        // Task 6 (Bonus) - API Endpoint
        // ========================================
        // /api/time returns the current date/time as JSON
        if (pathname === '/api/time' && req.method === 'GET') {
            const now = new Date();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                datetime: now.toISOString(),
                localTime: now.toLocaleString(),
                timestamp: now.getTime()
            }));
            return;
        }


        // ========================================
        // Task 2 - Route Mapping
        // ========================================
        // Map URLs to HTML files in the public folder
        let filePath;
        if (pathname === '/') {
            // Home page
            filePath = path.join(PUBLIC_DIR, 'index.html');
        }
        else if (pathname === '/about') {
            filePath = path.join(PUBLIC_DIR, 'about.html');
        }
        else if (pathname === '/contact') {
            filePath = path.join(PUBLIC_DIR, 'contact.html');
        }

        // ========================================
        // Task 4 - Serve CSS Files
        // ========================================
        // Handle requests for CSS files from /styles/ folder
        else if (pathname.startsWith('/styles/')) {
            filePath = path.join(PUBLIC_DIR, decodeURIComponent(pathname));

            // Security: Prevent path traversal attacks (../ in URL).
            // The resolved path must stay inside public/styles.
            const stylesDir = path.join(PUBLIC_DIR, 'styles') + path.sep;
            const normalizedPath = path.normalize(filePath);
            if (!normalizedPath.startsWith(stylesDir)) {
                handle404(res);
                return;
            }
        }
        else {
            // No route matched -> 404
            handle404(res);
            return;
        }


        // ========================================
        // Task 3 - Serve Files
        // ========================================
        // Step 1: Get the file extension (e.g., '.html', '.css')
        const extname = path.extname(filePath);

        // Step 2: Get the content type from MIME_TYPES object
        const contentType = MIME_TYPES[extname] || 'text/html';

        // Step 3: Read the file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File not found
                    handle404(res);
                } else {
                    // Server error
                    handleServerError(res, err);
                }
            } else {
                // Send success response
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });

    } catch (error) {
        // Catch any unexpected errors (e.g. malformed URL encoding)
        handleServerError(res, error);
    }
});


// ========================================
// Task 5 - Error Handling Functions
// ========================================

// Function to handle 404 errors (Page Not Found)
function handle404(res) {
    const notFoundPath = path.join(PUBLIC_DIR, '404.html');

    fs.readFile(notFoundPath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Page Not Found');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}

// Function to handle 500 errors (Server Error)
function handleServerError(res, error) {
    console.error('Server error:', error);

    const serverErrorPath = path.join(PUBLIC_DIR, '500.html');

    fs.readFile(serverErrorPath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}


// ========================================
// Task 1 - Start the Server
// ========================================
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  GET /              -> index.html');
    console.log('  GET /about         -> about.html');
    console.log('  GET /contact       -> contact.html');
    console.log('  GET /styles/*.css  -> CSS files');
    console.log('  GET /api/time      -> current date/time (JSON)');
});
