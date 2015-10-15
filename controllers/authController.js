/**
 * Created by abdulbasit on 9/29/2015.
 */
var user = require('../models/userModel.js')
var jwt    = require('jsonwebtoken');
var configs = require('../config/config.js');
auth = {};

auth.authenticateSignIn = function(req,res,next){
 user.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, configs.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                user.token = token;
                user.counter = 12;
                user.save();
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    data :user
                });
            }

        }

    });
}
auth.getUserByToken = function(req, res, next) {

}
auth.authMiddleWare = function(req, res, next) {

//next();

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var userid = req.body.userid || req.query.userid || req.headers['userid'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, configs.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

        /*user.findOne({_id:userid,token:token},function(err,user){
            if (!user) {
                return res.json({ success: false, message: 'Failed to authenticate user.' });
            }
            else
           // next();
            var b;

        })*/

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }



};



module.exports = auth;