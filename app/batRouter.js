/**
 * Created by briandaves on 10/23/15.
 */
var express = require('express');
//var app = express();
var router = express.Router();
var friendSchema = require('./models/user');

    ////BATROUTER !!!   ANOTHER FOR THE DATABASE!! WITH JOELS HELP!

router.post('/addfriends', function(req, res) {
    var data = req.body;

    console.log('DATA!', data);



    console.log('User', req.user.local.username);

    //Find user with same username that made request
    friendSchema.findOne({'local.username': req.user.local.username}, function(err, user){
        console.log('Found user', user);
        console.log('Found local', user.local);

        //Adding new friend
        user.local.friends.push(data);

        //Saving user with new friend
        user.save(function(err){
            if(err) throw err;
        });


    })

    res.sendStatus(200);



});


router.get('/getfriends', function(req,res){
    console.log('Requested by', req.user);
    friendSchema.find({_id:req.user.id}, function(err,friendoes) {
        if (err) throw err;
        res.send(friendoes);
    });

});

module.exports = router;