var express = require('express');
var router = express.Router();
var UserController = require('../controller/user');
var middleware=require('../middleware/Auth');

/**
 * Api to register user
 */
router.post('/register', function(req, res) {
  UserController.addUser(req, res);
});
/**
 * Api to login user
 */
router.post('/login', function(req, res) {
  UserController.login(req, res);
});
/**
 * Api to user profile
 */
router.get('/getProfile',middleware, function(req, res) {
  UserController.getProfile(req, res);
});

/**
 * Api to update user profile
 */
router.patch('/updateProfile',middleware, function(req, res) {
  UserController.updateUser(req, res);
});

/**
 * Api to delete user profile
 */
router.delete('/deleteProfile',middleware, function(req, res) {
  UserController.updateUser(req, res);
});


module.exports = router;
