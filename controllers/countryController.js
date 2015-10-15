/**
 * Created by abdulbasit on 9/29/2015.
 */
var express = require('express');
var country = require('../models/countryModel.js');

/* GET users listing. */

countryobj = {};

countryobj.get = function(req,res,next){
    console.log("here ere")
    country.find(function(err,countries){
        if (err) throw err;
        res.json({succcess:true,data:countries})
    })
}


countryobj.getById = function(req,res,next){
    country.find({id:req.params.id},function(err,countries){
        if (err) throw err;
        res.json({succcess:true,data:countries})
    })

}


countryobj.put = function(req,res,next){
    country.findOne({_id:req.params.id},function(err,countryu){
        if (err) throw err;
        for(prop in req.body){
            if(prop!="_id")
            countryu[prop] = req.body[prop];
        }
        countryu.save();
        country.find(function(err,countries){
            if (err) throw err;
            res.json({succcess:true,data:countries})
        })

    })
}


countryobj.delete = function(req,res,next){
    console.log("----delete request----"+req.params.id)
    country.find({ _id:req.params.id }).remove(function(){
        country.find(function(err,countries){
            // if (err) throw err;
            res.json({succcess:true,data:countries})
        })
    } );
}


countryobj.create = function(req,res,next){
    var newcountry = new  country(req.body);
    newcountry.save(function(err,c){
        if (err) throw err;
        country.find(function(err,countries){
           // if (err) throw err;
            res.json({succcess:true,data:countries})
        })
       // res.json({ success: true, data: });
    })
}
module.exports = countryobj;

