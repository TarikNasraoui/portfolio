  
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    address: String,
    phone: String,
    role: String,
    password: String
});

var User = new mongoose.model('User', schema);

module.exports = User;