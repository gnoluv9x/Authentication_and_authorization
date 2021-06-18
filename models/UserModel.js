const mongoose = require('mongoose');

// connect DB
mongoose.connect('mongodb://localhost/First_Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// create Schema

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 'user'
  }
}, {
    collection: 'user'
});

// create Model

let UserModel = mongoose.model('usermodel', UserSchema)

// UserModel.create({
//     username: 'duc',
//     password: '123123',
//     role: 'user'
// }).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })


module.exports = UserModel;
