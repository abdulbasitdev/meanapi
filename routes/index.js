var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var user = require('../models/userModel.js');
var auth = require('../controllers/authController.js');
var userCtrl = require('../controllers/userController.js');

/* GET home page. */


module.exports = function(app){

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/get', userCtrl.getUserByToken);
  router.post('/authenticate',auth.authenticateSignIn);
  return router;
};
