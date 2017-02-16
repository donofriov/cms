process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var mongoose = require('./config/mongoose');



var app = express();

var db = mongoose();

app.listen(3000);

console.log('Listening on port 3000');

module.exports = app;