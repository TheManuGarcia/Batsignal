/**
 * Created by briandaves on 10/20/15.
 */
var express = require('express');
//var app = express();
var router = express.Router();
var flash = require('connect-flash');
var path = require('path');
var passport = require('passport');
//var friendSchema = require('./models/fakeSchema');
//var friendSchema = require('./models/user');

///JADEEEE
var Uploads = require('../app/models/upload');

    //HOME PAGE

//testing path//

    router.get('/', function (req, res){
       res.render('index.ejs'); //loads index.ejs file

    });
    //LOGIN
    //show login form
    router.get('/login', function(req,res){
       //render the page and pass in any flash data
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // Process LOGIN FORM //
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', //redirects to the secure profile section
        failureRedirect : '/login', //redirects back to the signup page
        failureFlash : true //allow flash messages
    }));

    //SIGNUP

    //show signup form
    router.get('/signup', function (req, res){
       //render the page and pass flash data if exists
        res.render('signup.ejs', {message: req.flash('signupMessage') });

    });

    //process the signup form
    router.post('/signup', passport.authenticate('local-signup',{
        successRedirect : '/profile', //redirect to the secure profile section
        failureRedirect : '/signup', //redirect back to the signup page if there is an error
        failureFlash : true //allow flash messages
    }));

    //PROFILE SECTION//

//This is protected user has to be logged in to visit
//route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function(req,res){
       res.render('profile.ejs', {
          user: req.user //get the user out of session and pass to template
       });

    });

    ///JADEPROFILE

    router.get('/jadeprofile', isLoggedIn, function(req,res){
        Uploads.find({}, function (err, uploads) {
            if (err) {
                next(err);
            } else {
                res.render('profile2.jade', {uploads: uploads, user: req.user});
                //get the user out of session and pass to template
            }
        });

    });

//=======/////////+++++++++==


    //LOGOUT//

    router.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');

    });

    //route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next){

        //if user is authenticated in the session, go ahead
        if(req.isAuthenticated())
            return next();

        //if they aren't redirect them to the home page
        res.redirect('/');


    }

             //GET THE REST OF THE PAGES
    //==== ADD FRIENDS PAGE ===\\
    router.get('/add_friends', function (req,res){
       res.render('add_friends.ejs');
    });

//JADE PROFILE

router.get('/jadeprofile', function (req, res){
    res.render('profile2.jade');
})



    //==== SEND BATSIGNAL ===\\
    router.get('/batsignal', function(req,res){
       res.sendfile(path.join(__dirname, '../views/send_batsignal.html'));
    });

    //==== FRIENDS CONFIRMATION ====\\
    router.get('/friendsconfirm', function(req,res){
        res.sendfile(path.join(__dirname, '../views/friend_confirmation.html'));
    });

    //==== BATSIGNAL SENT CONFIRMATION ====\\
    router.get('/confirmation', function(req,res){
        res.sendfile(path.join(__dirname, '../views/batsignal_confirmation.html'));
    });


    //====== SEND EMAIL ========\\
    router.post('/sendbatemail', function(req, res){
        console.log(req.body);
        var api_key = "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";

        /* MAIL INFORMATION
         * Fill in the relevant information below
         *===========================================*/
    // YOUR SENDING ADDRESS
        var from_address = "BatSignal";

    // YOUR TO ADDRESS(ES)

        var to_address = req.body.myEmail;

    // SUBJECT
        var subject = "You have a new Batsignal";

    // TEXT BODY
        var text_body = "Hello I hope this reaches you";

    // HTML BODY
        var html_body = "<p>" + req.body.message + "</p>" + "<img src='https://maps.googleapis.com/maps/api/staticmap?&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:C%7C" + req.body.myLocation +"&key=AIzaSyDuL9tcP7WKdOIPRkoNEmLSJz3ule96YG8'/>";
        console.log(html_body);
        //var html_body = "<table style=\"border: solid 1px #000; background-color: #666; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td> <h2>Hello Batfriend,</h2> <p>You have a new Batsignal:</p> <p> + "req.body.message" + </p> <p>Thank you for reading this test message.</p> Love,<br/> Your friends at SendGrid</p> <p> <img src=\"http://cdn1.sendgrid.com/images/sendgrid-logo.png\" alt=\"SendGrid!\" /> </td> </tr> </table>";
        //var html_body = "<table style=\"border: solid 1px #000; background-color: #666; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td> "<p>" + "req.body.message" + "</p>" + "<img src='https://maps.googleapis.com/maps/api/staticmap?&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:C%7C" + req.body.myLocation +"&key=AIzaSyDuL9tcP7WKdOIPRkoNEmLSJz3ule96YG8'/>" </td> </tr> </table>";
        /* CREATE THE MAIL OBJECT
         *===========================================*/
    // This will send your email via SendGrid's Web API.  If you
    // wish to send it via SMTP, use the following line instead:
    // var sendgrid  = require("sendgrid")(sg_username, sg_password, {api: 'smtp'});
    //var sendgrid = require("sendgrid")(sg_username, sg_password);

        var sendgrid = require("sendgrid")(api_key);

        /* SEND THE MAIL
         *===========================================*/
        try {
            sendgrid.send({
                to:         to_address,
                from:       from_address,
                subject:    subject,
                text:       text_body,
                html:       html_body
            }, function(err, json) {
                if (err) return console.error(err);
                console.log(json);
            });
        } catch(e) {
            console.log(e);
        }

        res.send(200);


    });


module.exports = router;














