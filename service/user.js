(function () {
    const bcrypt = require('bcryptjs')
    var mongoose = require('mongoose');
    var user = mongoose.model('User');
  
    exports.createUser = function (data, callback) {
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(data.password, salt, (err, hash)=> {
                if(err) throw err;
                data.password = hash;
                user.create(data).then((response) => {
                    callback(null, response);
                }, (error) => {
                    callback(error, null);
                });
            })
        })      
    };

    exports.findUser = function (query, callback) {
        user.findOne(query, callback);
    }


    exports.updateUserById = function (id, data, callback) {
        user.findByIdAndUpdate({
            _id: id
        }, data, (err, response) => {
            callback(err, response);
        });
    }


    exports.updateUser = function (query, data, options, callback) {
        user.findOneAndUpdate(query, data, options, (err, response) => {
            callback(err, response);
        });
    }

    exports.deleteUser = function (query, callback) {
        user.deleteOne(query, callback);
    }

})()