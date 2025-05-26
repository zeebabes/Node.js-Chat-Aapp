const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like index.html) from the current directory
app.use(express.static(__dirname));

// WebSocket logic
io.on('connection', socket => {
    console.log('User connected');
    socket.on('disconnect', () => console.log('User disconnected'));
});

// Start server
server.listen(3000, () => console.log('Chat app running on port 3000'));
