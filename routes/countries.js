/**
 * Created by abdulbasit on 9/29/2015.
 */
var express = require('express');
//var mongooose = require('mongooose');
var router = express.Router();
var user = require('../models/userModel.js');
var countryCtrl = require('../controllers/countryController.js');
var authCtrl = require('../controllers/authController.js');

/* GET users listing. */
module.exports = function(app){
    router.post('/',countryCtrl.create);
    router.use(authCtrl.authMiddleWare);
    router.get('/',countryCtrl.get);
    router.get('/:id',countryCtrl.getById);
    router.put('/:id',countryCtrl.put);
    router.delete('/:id',countryCtrl.delete);


    // router.delete('/',userCtrl.delte);






    return router;
}




