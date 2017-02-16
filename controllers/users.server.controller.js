require('../models/content');
require('../models/services');
require('../models/uploads');
var mongoose = require('mongoose');
var Content = mongoose.model('contents');
var Services = mongoose.model('services');
var Uploads = mongoose.model('uploads');

exports.getContent = function(page){
     return function(req, res) {
		 Services.findOne({name: "times"}, function(err, data){
			var firstTime = data.time1;
			var secondTime = data.time2;
			Content.findOne({name: page}, function(err, data){
			res.render('user-content.jade',{title : page, content: data.text,first: firstTime, second: secondTime})
			});
		});
 
    };
};

exports.getSermon = function(page){
	return function(req, res) {
		Services.findOne({name: "times"}, function(err, data){
			var firstTime = data.time1;
			var secondTime = data.time2;
			Uploads.find({}, function (err, users) {
				if (err) return handleError(err);
				var table = " ";
				for (var i = users.length-1; i >= 0; i--) {
					var time = users[i]._id.getTimestamp().toString().slice(0,15);
					table += "<tr><td>" + users[i].name + "</td><td>" + time + "</td></tr>"
				}

				Content.findOne({name: page}, function(err){
					if (err) return handleError(err);
					res.render('user-sermon.jade',{title : page, contentType: page, first: firstTime, second: secondTime, table: table})
				});
			});
		});

	};
};



exports.getLogin = function(){
	return function(req, res){
		if(req.session.success){
		   res.redirect('/admin/home');
		 }
		 else if(req.session.error){
		   error = req.session.error;
		   res.render('user-login.jade',{error: error})
		    
		 }
		 else{
		   error = '';
		   res.render('user-login.jade',{error: error});
		  }
	}
}

exports.postLogin = function(){
	return function(req, res){
		if(req.body.password === 'password'){
			req.session.regenerate(function(){
				req.session.success = 'access approved';
				res.redirect('/admin/home');
			});
		} 
		else {
			req.session.regenerate(function(){
				req.session.error = 'Incorrect Password.';
				res.redirect('/login');
			});
		}
	}
}

