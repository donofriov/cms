var users = require('../controllers/users.server.controller');

module.exports = function(app){
	//gets
	app.get('/', users.getContent('home'));
	app.get('/sermon', users.getSermon('sermon'));
	app.get('/ministry', users.getContent('ministry'));
	app.get('/community', users.getContent('community'));
	app.get('/events', users.getContent('events'));
	app.get('/aboutus', users.getContent('aboutus'));
	app.get('/login', users.getLogin());


	// posts
	app.post('/login', users.postLogin());

};

