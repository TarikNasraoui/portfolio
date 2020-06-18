var express = require('express');
var router = express.Router();
const passport = require('passport')
var profile = require('../controller/profile');
// Load Profile Model
const Profile = require('../model/profile');
// Load User User
const User = require('../model/user');



router.get('/', passport.authenticate('jwt', {session : false}), profile.find);

router.post('/', passport.authenticate('jwt', {session : false}), profile.createProfile);

router.get('/slogan/:slogan', profile.findBySlogan);
router.get('/all_profile', profile.findAllProfile);
router.get('/:_id', profile.findByUserId);




// router.get('/slogan/:slogan', (req, res) => {
//     // const errors = {}
//     Profile.findOne({slogan : req.params.slogan})
//     .populate('user',['username','firstName'])
//     .then(profile => {
//         if(!profile) {
//             // errors.noprofile = 'There is no profile for this user'
//             res.status(404).json({'errors':'error'})
//         }
//         res.json(profile)
//     })
//     .catch(err=> res.status(404).json(err))

// })
module.exports = router;
  