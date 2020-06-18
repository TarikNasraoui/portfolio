const Joi = require('joi');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


var userService = require('../service/user');
var ProfileService = require('../service/profile');
const User = require('../model/user');
const Profile = require('../model/profile');
const keys = require('../config/keys')

exports.find = function (req, res) {
    ProfileService.findProfile({user : req.user.id}, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(404).send('No Data Found');
        }
    });
}

exports.findAllProfile = function (req, res) {
    console.log('here')
    ProfileService.findAll(null,function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(404).send('No Data Found');
        }
    });
}

exports.createProfile = function (req, res) {
    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.title) profileFields.title = req.body.title
    if(req.body.slogan) profileFields.slogan = req.body.slogan
    if(req.body.about) profileFields.about = req.body.about
      // Skils split into array
    if(typeof req.body.services !== 'undefined') {
        profileFields.services = req.body.services.split(',')
    }
    ProfileService.findProfile({user : req.user.id}, function (error, response) {
        if (error) {
            console.log('test')
            res.status(404).send(error);
            return;
        }
        if (response) {
            console.log('test')
            ProfileService.updateProfile({ user: req.user.id },
                {$set : profileFields},
                { new: true },function (error, response) {
                if (response) {
                    res.status(201).send(response);
                   
                } else if (error) {
                    res.status(400).send(error);
                }
            });
        }
        if (!response) {
            ProfileService.createProfile(profileFields, function (error, response) {
                if (response) {
                    res.status(201).send(response);
                   
                } else if (error) {
                    res.status(400).send(error);
                }
            });

            
        }
    });



}

exports.findBySlogan = function (req, res) {
    ProfileService.findProfile({slogan : req.params.slogan}, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(404).send('No Data Found');
        }
    });
}

exports.findByUserId = function (req, res) {

    ProfileService.findProfile({_id : req.params._id}, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(404).send('No Data Found');
        }
    });
}



// router.get('/slogan/:slogan', (req, res) => {
//     // const errors = {}
//     Profile.findOne({slogan : req.params.slogan})
//     // .populate('user', ['name', 'avatar'])
//     .then(profile => {
//         if(!profile) {
//             // errors.noprofile = 'There is no profile for this user'
//             res.status(404).json({'errors':'error'})
//         }
//         res.json(profile)
//     })
//     .catch(err=> res.status(404).json(err))

// })

// router.get('/all', (req, res) => {
//     const errors = {}
//     Profile.find()
//     .populate('user', ['name', 'avatar'])
//     .then(profiles => {
//         if(!profiles) {
//             errors.noprofile = 'There is no profile for this user'
//             res.status(404).json(errors)
//         }
//         res.json(profiles)
//     })
//     .catch(err=> res.status(404).json({profiles : 'This no profile for this user'}))
// })