const express = require('express');
const app = express();
app.use(express.static("public"));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/styles.css');
    res.sendFile(__dirname + '/scripts.js');
    res.sendFile(__dirname + '/darktoggle-dark.svg');
    res.sendFile(__dirname + '/darktoggle-light.svg');
  });
  
io.on('connection', (socket) => {
console.log('a user connected');
socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
  
server.listen(3000, ()  => {
    console.log('Listening on *3000');
});
