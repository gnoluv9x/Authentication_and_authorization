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

const BlacklistSchema = new Schema({
  token: String
}, {
    collection: 'blacklist'
});

// create Model

let BlacklistModel = mongoose.model('blacklistmodel', BlacklistSchema)

// UserModel.create({
//     username: 'duc',
//     password: '123123',
//     role: 'user'
// }).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })


module.exports = BlacklistModel;
