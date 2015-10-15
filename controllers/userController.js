/**
 * Created by abdulbasit on 9/29/2015.
 */
var express = require('express');
var user = require('../models/userModel.js');
var jwt    = require('jsonwebtoken');
var configs = require('../config/config.js');
/* GET users listing. */

userobj = {};

userobj.get = function(req,res,next){
    user.find(function(err,countries){
        if (err) throw err;
        res.json({succcess:true,data:countries})
    })
}


userobj.getById = function(req,res,next){
    user.find({id:req.params.id},function(err,countries){
        if (err) throw err;
        res.json({succcess:true,data:countries})
    })

}


userobj.put = function(req,res,next){
    user.find({id:req.params.id},function(err,country){
        if (err) throw err;
        for(prop in req.body){
            country[prop] = req.body[prop];
        }
        country.save();
        res.json({succcess:true,data:countries})
    })
}


userobj.delete = function(req,res,next){

}

userobj.getUserByToken = function(req,res,next){
    user.findOne({token:req.headers['x-access-token']},function(err,thisuser){
        if (err) throw err;
        res.json({succcess:true,data:thisuser})
    })

}


userobj.create = function(req,res,next){
    console.log("------------reached here-------------");
    var newuser = new user(req.body);
    var token = jwt.sign(newuser, configs.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
    });
    newuser.token = token;
    newuser.save(function(err,user){
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true , data:newuser });
    })

}


module.exports = userobj;




