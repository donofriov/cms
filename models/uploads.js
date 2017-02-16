var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadsSchema = new Schema({
    name: String,
    path: String});

mongoose.model('uploads', uploadsSchema);
