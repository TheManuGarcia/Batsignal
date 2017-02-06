/**
 * Created by briandaves on 10/20/15.
 */
//Get all the packages that we need

var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var userRouter = require('./app/routes');
var batRouter = require('./app/batRouter');


//check this to see if it can be changed DB
var configDB = require('./config/database.js');

//CONFIGURATION
mongoose.connect(configDB.url); //connect to DB

require('./config/passport')(passport); //pass passport for configuration

//SET UP EXPRESS APPLICATION

app.use(morgan('dev')); //logs every request to the console (handy?)
app.use(cookieParser()); //read cookies(needed for auth)
app.use(bodyParser()); //get information from htmls forms
/////for db posting///




//=====TESSTTT!!!!!! ========\\
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs'); //set up ejs for templating

app.engine('jade', require('jade').__express);





//REQUIRED FOR PASSPORT

app.use(session({ secret: 'batmanisbadass'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in sessions
app.use('/batfriends',batRouter);
app.use('/',userRouter); //indexRouter


//FOR JADE TEST
app.use('/uploads', uploads);
//======ROUTES==========//


//LAUNCH
app.listen(port);
console.log('Listening on port: ' + port);





