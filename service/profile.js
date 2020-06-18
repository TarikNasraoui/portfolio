(function () {
    const bcrypt = require('bcryptjs')
    var mongoose = require('mongoose');
    // var user = mongoose.model('User');
    var profile = mongoose.model('Profile');

    exports.findProfile = function(query, callback) {
        profile.findOne(query, callback)
        .populate('user',['username','firstName'])

    }

    exports.findAll = function(query, callback) {
        profile.find(null,callback)
        // .populate('user',['username','firstName'])

    }

    exports.createProfile = function (data, callback) {
        profile.create(data).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    };

    exports.updateProfile = function (query, data, options, callback) {
        profile.findOneAndUpdate(query, data, options).then((response) => {
            callback(null, response);
        }, (error) => {
            callback(error, null);
        });
    }


})()