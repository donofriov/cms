var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var servicesSchema = new Schema({
	name: String,
	time1: String,
	time2: String});

mongoose.model('services', servicesSchema);