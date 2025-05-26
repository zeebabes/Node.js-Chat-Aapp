const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(__dirname));

const users = {};

io.on('connection', socket => {
  console.log('User connected:', socket.id);
  users[socket.id] = socket;

  // When user sends a message
  socket.on('chatMessage', msg => {
    console.log(`User ${socket.id}: ${msg}`);
    // Echo to admin interface or others
    socket.broadcast.emit('chatMessage', `User: ${msg}`);
  });

  // When admin sends a reply
  socket.on('adminReply', reply => {
    console.log(`Admin: ${reply}`);
    socket.broadcast.emit('chatMessage', `Admin: ${reply}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete users[socket.id];
  });
});

server.listen(3000, () => console.log('Chat app running on port 3000'));
