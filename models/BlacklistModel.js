const mongoose = require('../connectDB');

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
