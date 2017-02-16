require('../models/content');
require('../models/services');
require('../models/uploads');
var mongoose = require('mongoose');
var Content = mongoose.model('contents');
var Services = mongoose.model('services');
var Uploads = mongoose.model('uploads');
var fs = require('fs');
var path = require('path');


exports.getContent = function(page){
     return function(req, res) {
		if(req.session.success){
            Services.findOne({name: "times"}, function(err, data){
                var firstTime = data.time1;
				var secondTime = data.time2;
				Content.findOne({name: page}, function(err, data){
                    res.render('admin-content.jade',{title : page, content: data.text, contentType: page, first: firstTime, second: secondTime})
				});
			});			
		}
		else{
			req.session.error = 'Access denied!';
			res.redirect('/login');
		}
    }
};

exports.addSermon = function() {
    return function (req, res) {
        var mainPath = './public/files/';
        fs.rename(mainPath + req.file.filename, mainPath + req.file.filename + '.pdf', function (err) {
            if (err) return handleError(err);
            else{
                var linkedSermon = '<a href=/sermons/' + req.file.filename + '.pdf target="_blank">'+req.body.data+'</a>';

                var newDoc = new Uploads({name: linkedSermon, path: req.file.filename});
                newDoc.save(function (err) {
                    if (err) return handleError(err);
                });
                var time =  new Date().toString().slice(0,15);
                var deleteButton = '<a href="javascript:void(0);" onclick="deleteRow(this)">delete</a>';
                var output  = '<td>' + linkedSermon + '</td>' + '<td>' + time + '</td>' + '<td>' + deleteButton + '</td>';
                res.send(output);
            }
        });

    };
};

exports.deleteSermon = function() {
    return function (req) {
        Uploads.remove({name: {$regex : req.body.data}}, function (){
            console.log("Entry deleted");
        });
    };
};

exports.getSermon = function(page){
    return function(req, res) {
        if(req.session.success){
            Services.findOne({name: "times"}, function(err, data){
                var firstTime = data.time1;
                var secondTime = data.time2;
                Uploads.find({}, function (err, dbfiles) {
                        if (err) return handleError(err);
                        var table = "";
                        for (var i = dbfiles.length-1; i >= 0; i--) {
                            var time = dbfiles[i]._id.getTimestamp().toString().slice(0,15);
                            var sermonLink = '<a href=/sermons/' + dbfiles[i].path + '.pdf target="_blank">'+dbfiles[i].name+'</a>';
                            var deleteButton = '<a href="javascript:void(0);" onclick="deleteRow(this)">delete</a>';
                            table += "<tr><td>" + sermonLink + "</td><td>" + time + "</td><td>" + deleteButton + '</td></tr>'
                        }

                        Content.findOne({name: page}, function(err){
                            if (err) return handleError(err);
                            res.render('admin-sermon.jade',{title : page, contentType: page, first: firstTime, second: secondTime, table: table})
                        });
                });
            });
        }
        else{
            req.session.error = 'Access denied!';
            res.redirect('/login');
        }
    }
};

exports.getFile = function() {
    return function(req,res) {
        var path = req.path.slice(9,41);
        Uploads.findOne({path: path}, function (err, data) {
            var dataPath = __dirname + "/../public/files/" + data.path + '.pdf';
            fs.readFile(dataPath, function(err,data) {
                res.contentType("application/pdf");
                res.send(data);
            });
        });
    }
};

exports.editContent = function() {
    return function (req, res) {
            var parseMe = JSON.parse(req.body.data);
            console.log(parseMe);
            Content.update(
                {name: parseMe.title},
                {$set: {text: parseMe.text}},
                function (err) {
                    if (err) return handleError(err);
                    else {

                        var output = req.body.data;
                        res.send(output);
                    }
                }
            );
        }
};

exports.editTimes = function() {
    return function (req, res) {
        var parseMe = JSON.parse(req.body.data);
        Services.update(
            {name: parseMe.name},
            {$set: {time1: parseMe.first, time2: parseMe.second}},
            function (err) {
                if (err) return handleError(err);
                res.redirect('back'); //redirects to the same page you are on
            }
        )
    }
};






