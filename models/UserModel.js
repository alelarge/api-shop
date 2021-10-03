const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    'username' : String,
    'firstname' : String,
    'lastname' : String,
    'email': String,
    'password': String,
    'avatar' : String,
    'createAt': {type: Date, default: Date.now()}
})

module.exports = mongoose.model('User', UserSchema);