const express= require('express');
const app = express();
const path = require('path');
const UserRouter = require('./routers/UserRouter')
var cookieParser = require('cookie-parser')
app.use(cookieParser());

const port = process.env.PORT || 4001; 

var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './public/uploads'))
    },
    filename: function (req, file, cb) {
    console.log(file);
    let index = file.originalname.lastIndexOf('.');
    let extension = file.originalname.slice(index, file.originalname.length)
    console.log(extension);
      cb(null, file.fieldname + '-' + Date.now() + extension)
    }
  })
   
var upload = multer({ storage: storage })

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

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

app.listen(port)