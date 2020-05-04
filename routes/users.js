var express = require('express');
var router = express.Router();
var user = require('../controller/user');
const jwt = require('jsonwebtoken')
const passport = require('passport')


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/create', user.create);

router.post('/login', user.login);


router.get('/current', passport.authenticate('jwt', {session : false}), user.current);



router.get('/user/:username', user.find);


router.put('/updatebyid', user.updateById);


router.put('/update', user.update);

router.delete('/delete', user.delete);

module.exports = router;