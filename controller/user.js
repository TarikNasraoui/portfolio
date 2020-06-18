const Joi = require('joi');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


var userService = require('../service/user');
const User = require('../model/user');
const keys = require('../config/keys')


exports.create = function (req, res, next) {
    var body = new User(req.body);
    const schema = Joi.object().keys({ 
        username: Joi.string().min(3).required(),
        firstName: Joi.string().required(), 
        lastName: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        role: Joi.string().min(3).required(),
        password: Joi.required() 
    }); 
      const result = Joi.validate(req.body, schema); 
      // console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    userService.createUser(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
           
        } else if (error) {
            res.status(400).send(error);
        }
    });
}

exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        username: params.username
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.findUser(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}
exports.login = function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    userService.findUser({username}, function(error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            bcrypt.compare(password, response.password)
            .then(isMatch => {
                if(isMatch){

                    const payload = {id: response.id, lastName: response.lastName, firstName: response.firstName} // Create JWT avatar // Create JWT avatar
                    // Sign Token
                    jwt.sign(payload,keys.secretOrKey,
                         {expiresIn : 86400},
                         (err, token) => {
                            res.status(200).json({
                            success : true,
                            user:{
                                username: response.username,
                                lastName: response.lastName,
                                firstName: response.firstName
                            } ,
                            token: 'Bearer ' + token
                        })
                    })
                    console.log(isMatch)
                    // res.status(200).send(response);
                    // return;
                }else{
                    res.status(404).json({'error': 'No password match Found'});
                    return;
                }
            })
           
        }
        if (!response) {
            res.status(404).send('No user name Found');
        }
    })
}
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body.data || {}
    userService.updateUserById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
}

exports.update = function (req, res) {
    var body = req.body;
    var query = body.query;
    var data = body.data;
    var options = body.options
    if (!query) {
        res.status(400).send('Bad request');
        return;
    }

    userService.updateUser(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
}


exports.delete = function (req, res) {
    var body = req.body || {};
    var query = body.query;
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.deleteUser(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(body);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
}

exports.current = (req,res)=>{
    res.json({
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    })
}
