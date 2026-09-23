// ============================================
// EXAMPLE 1: Basic HTTP Server - Task 1
// ============================================
// This example shows how to create and start a basic HTTP server
// This helps with: TODO Task 1 - Start the Server

const http = require('http');

const PORT = 3001; // Using different port to avoid conflicts

// Create a simple server
const server = http.createServer((req, res) => {
    // For now, just respond with a simple message
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello! This is a basic HTTP server.');
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Try opening this URL in your browser!');
    console.log('Press Ctrl+C to stop the server');
});

// KEY CONCEPTS:
// - server.listen(PORT, callback) starts the server
// - The callback function runs when server starts successfully
// - console.log() helps you know the server is ready
// - The server keeps running until you stop it (Ctrl+C)
