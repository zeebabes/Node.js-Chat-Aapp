const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('chatMessage', msg => {
    console.log(`User ${socket.id}: ${msg}`);
    io.emit('chatMessage', `User: ${msg}`);
  });

  socket.on('adminReply', msg => {
    console.log(`Admin: ${msg}`);
    io.emit('chatMessage', `Admin: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => console.log('Chat app running on port 3000'));
