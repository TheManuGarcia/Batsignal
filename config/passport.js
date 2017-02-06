/**
 * Created by briandaves on 10/20/15.
 */
//Load the Node Packages that we need

var LocalStrategy = require('passport-local').Strategy;

//Load up user model

var User = require('../app/models/user');

// Expose this function to our app using module.exports

module.exports = function(passport) {

    //passport session setup

    //required for persistent login sessions

    //passport needs ability to serialize and unserialize users out of session

    //======== Used to serialize the user for the session =======//
    passport.serializeUser(function(user,done){
       done(null,user.id);
    });
    // ======= Used to deserialize the user ============//
    passport.deserializeUser(function(id, done){
       User.findById(id, function(err, user){
          done(err,user);
       });
    });

    //========= LOCAL SIGNUP =========//
    // USE NAME STRATEGIES SINCE THERE ARE ONE FOR LOGIN AND ONE FOR SIGNUP //
    // By default, if there was no name, it would be called 'local' //

    passport.use('local-signup', new LocalStrategy ({
        //default, local strategy uses username and password.
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true //allows to pass back the entire request to the callback
    },
        function(req, username, password, done){

            //Asynchronous
            // User.findOne won't fire unless data is sent back
            process.nextTick(function(){

                //find a user whose username is the same as the forms username
                //check to see if the user trying to login already exists
                User.findOne({'local.username' : username}, function(err,user){
                    //if there are errors, return the error
                    if(err)
                        return done(err);
                    //check to see if there's already a user with that username
                    if(user){
                        return done(null, false, req.flash('signupMessage', 'Sorry old Chum that username is already taken.'))
                    } else{
                        //if there is no user with that username
                        //create the user
                        var newUser = new User();

                        //set the user's local credentials
                        newUser.local.username = username;
                        newUser.local.password = newUser.generateHash(password);

                        //save the user
                        newUser.save(function(err) {
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }


                });

            });

    }));


    //====== LOCAL LOGIN ======= \\
    // Use named strategies since we have one for login and one for signup/
    //by default if there was no name, it would be called 'local'.

    passport.use('local-login', new LocalStrategy({
        //by default, local strategy uses username and password
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true //allows to pass back the entire request to the callback
    },
        function(req, username, password, done){ //callback with username and password from our form
         //find a user whose username is the same as the forms username
            //checking if the user trying to login already exists
            User.findOne({'local.username' : username}, function(err, user){
                //if there are any errors, return the error before anything else
                if(err)
                    return done(err);
                //if no user is found, return the message
                if(!user)
                    return done(null, false, req.flash('loginMessage', 'Password or User incorrect'));
                //if user is found but the password is wrong
                if(!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Sorry old chum, password or username incorrect'));

                //all is fine, return successful user
                return done(null,user);
            });

    }));
};