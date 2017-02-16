var config = require('./config');
var express = require('express');
var jade = require('jade');
var router = express.Router();
var multer = require('multer');
var bodyParser = require("body-parser");
var session = require('express-session');

module.exports = function(){
	var app = express();
	app.set('views', './views');
	app.set('view engine', 'jade');
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(session({
	  secret: config.sessionSecret,
	  resave: false,
	  saveUninitialized: false
	}));
	app.use(multer({dest:'./public/files/'}).single('file'));
	app.engine('jade', jade.__express);

	require('../routes/userRoutes.js')(app);
	require('../routes/adminRoutes.js')(app);
	
	return app
}