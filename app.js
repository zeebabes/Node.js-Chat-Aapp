const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(__dirname));

// Socket.IO logic
io.on('connection', socket => {
  console.log('User connected');
  socket.on('chatMessage', msg => {
    // Echo back for now — you can extend this
    socket.emit('chatMessage', `Received: ${msg}`);
  });
  socket.on('disconnect', () => console.log('User disconnected'));
});

// Start server
server.listen(3000, () => console.log('Chat app running on port 3000'));
