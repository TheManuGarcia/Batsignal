/**
 * Created by briandaves on 10/20/15.
 */
//Load our node Packages

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Define the schema for our user model

var userSchema = mongoose.Schema({

    local : {
        username    : String,
        password    : String,

        friends      : [{
            friendname: String,
            friendemail: String,
        }]


    },
    facebook        : {
        id          : String,
        token       : String,
        email       : String,
        name        : String,
    },
    twitter         : {
        id          : String,
        token       : String,
        displayName : String,
        username    : String,
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    }
});

// ===== METHODS ======\\

// Generating a Hash

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if password is valid

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);