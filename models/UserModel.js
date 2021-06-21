const mongoose = require('../connectDB');


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


// UserModel.create({
//   username: 'Long1000', 
//   password: '123123'
// }).then(data=>{
//   console.log(data);
// }).catch(err =>{
//   console.log(err);
// })