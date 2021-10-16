var express = require('express');
var router = express.Router();
var Usercontroller= require('../controllers/UserController');

router.post('/signup', Usercontroller.signup);

module.exports = router;