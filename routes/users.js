var express = require('express');
//var mongooose = require('mongooose');
var router = express.Router();
var user = require('../models/userModel.js');
var userCtrl = require('../controllers/userController.js');
var authCtrl = require('../controllers/authController.js');

/* GET users listing. */
module.exports = function(app){
  router.post('/',userCtrl.create);
  router.use(authCtrl.authMiddleWare);
  router.get('/',userCtrl.get);
  router.get('/:id',userCtrl.getById);
  router.put('/',userCtrl.put);


 // router.delete('/',userCtrl.delte);






  return router;
}




