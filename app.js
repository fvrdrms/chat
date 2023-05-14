const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')
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

dotenv.config({ path: './.env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})
  
server.listen(3000, ()  => {
    console.log('Listening on *3000');
});