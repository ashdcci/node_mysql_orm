process.env.NODE_CONFIG_DIR = __dirname + '/config/';
var express 		= require('express');
var parser 		= require('body-parser');
var app         	= express();
var config = require('config');
var http	 	= require('http');
var server = http.createServer(app);
var index = require('./routes/index');

/**
 * Allow Origin
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

/**
 * Set and get Configurations
 */
app.set('port', process.env.PORT || config.get('site.port'));
app.use('/', index);

/**
 * Listen to server Port
 */
server.listen(app.get('port'),function(){
  console.log("Connected & Listen to port "+app.get('port')+" ");
});
