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

module.exports = BlacklistModel;
