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

module.exports = router;
  