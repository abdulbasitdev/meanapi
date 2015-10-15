/**
 * Created by abdulbasit on 9/29/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    email: String,
    counter:Number,
    token: String,
    userType: {type:String, default:'user'}
}));