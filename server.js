const express= require('express');
const app = express();
const path = require('path');
const UserRouter = require('./routers/UserRouter')
var cookieParser = require('cookie-parser')
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())


// Use public folder
app.use('/public', express.static(path.join(__dirname, '/public')))

// Use html

app.use('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/html/home.html'))
} )
app.use('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/html/login.html'))
} )
app.use('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/html/register.html'))
} )
app.use('/changepass', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/html/changepass.html'))
} )

//Use Router
app.use('/api/user/', UserRouter)

app.listen(4001, console.log(' Port Listen: 4001') )