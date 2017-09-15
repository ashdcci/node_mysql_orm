process.env.NODE_CONFIG_DIR = __dirname + '/config/';
var express 		= require('express');
var parser 		= require('body-parser');
var app         	= express();
var config = require('config');
var engine = require('ejs-mate');
var http	 	= require('http');
var morgan	 	= require('morgan');
var server = http.createServer(app);
var index = require('./routes/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/**
 * Allow Origin
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * initialize session
 */
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

/**
 * passport init with session
 */
app.use(passport.initialize())
app.use(passport.session())


// passport.use(new LocalStrategy(users.authenticate(username,password,callback)))
// passport.serializeUser(users.serializeUser(user,callback))
// passport.deserializeUser(users.deserializeUser(id,callback))

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

/**
 * Set and get Configurations
 */
app.set('port', process.env.PORT || config.get('site.port'));
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', config.get('site.views'));
app.use('/', index);
app.use(morgan(config.get('morgan.mode')));

/**
 * Listen to server Port
 */
server.listen(app.get('port'),function(){
  console.log("Connected & Listen to port "+app.get('port')+" ");
});
