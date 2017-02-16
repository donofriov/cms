var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
	name: String,
	text: String});

mongoose.model('contents', contentSchema);