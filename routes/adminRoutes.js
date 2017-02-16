var admin = require('../controllers/admin.server.controller');


module.exports = function(app){
	//gets
	app.get('/admin/home', admin.getContent('home'));
	app.get('/admin/sermon', admin.getSermon('sermon'));
	app.get('/admin/community', admin.getContent('community'));
	app.get('/admin/ministry', admin.getContent('ministry'));
	app.get('/admin/events', admin.getContent('events'));
	app.get('/admin/aboutus', admin.getContent('aboutus'));
	app.get('/logout', function(req, res) {
		req.session.destroy(function(){
			res.redirect('/login');
		});
	});

	app.get('/sermons/*', admin.getFile());

    //posts
	//ajax edit/save content
	app.post('/ajax2', admin.editContent());
	//ajax add sermon
	app.post('/ajax5', admin.addSermon());
	//ajax update service times
	app.post('/timeRoute', admin.editTimes());
	//ajax delete sermon
	app.post('/delRoute', admin.deleteSermon());
};
