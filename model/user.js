  
var mongoose = require('mongoose');

var Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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

var User = new mongoose.model('User', Userschema);

module.exports = User;