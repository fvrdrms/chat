const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
const saltRounds = 10
app.use(express.static("public"));
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
dotenv.config({ path: './.env'})

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

db.connect((error) => {
  if(error) {
      console.log(error)
  } else {
      console.log("MySQL connected!")
  }
})

app.listen(4000, ()  => {
  console.log('Listening on *4000');
});
const path = require("path")

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/register", (req, res) => {
  // res.sendFile(__dirname + '/socket.io/socket.io.js');
  res.render("register")
})

app.get("/chat", (req, res) => {
  res.render("chat")
})


app.post("/auth/register", (req, res) => {    
  const { name, email, password, password_confirm } = req.body
  // db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
    let hashedPassword = bcrypt.hash(password, 8)
    // if(error){
    //       console.log(error)
    //   }
    //   if( result.length > 0 ) {
    //       return res.render('register', {
    //           message: 'This email is already in use'
    //       })
    //   } else if(password !== password_confirm) {
    //       return res.render('register', {
    //           message: 'Password Didn\'t Match!'
    //       })
    //   }
    //
    // bcrypt
    // .genSalt(saltRounds)
    // .then(salt => {
    //   console.log('Salt: ', salt)
    //   return bcrypt.hash(password, salt)
    // })
    // .then(hash => {
    //   console.log('Hash: ', hash)
    // })
    // .catch(err => console.error(err.message))
     
      db.query('INSERT INTO users SET?', {name: name, email: email, password: hashedPassword}, (err, result) => {
          // if(error) {
          //     console.log(error)
          // } else {
          //     return res.render('register', {
          //         message: 'User registered!'
          //     })
          // }
      })        
  })

    




// other imports

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//     res.sendFile(__dirname + '/styles.css');
//     res.sendFile(__dirname + '/scripts.js');
//     res.sendFile(__dirname + '/darktoggle-dark.svg');
//     res.sendFile(__dirname + '/darktoggle-light.svg');
//   });
  
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
