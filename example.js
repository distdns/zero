var http = require('http');
var dWebZero = require('./index');

var apps = dWebZero();

apps.on('up', function(name, service) {
	console.log('[up]', service.host+':'+service.port);
});
apps.on('down', function(name, service) {
	console.log('[down]', service.host+':'+service.port);
});

var server = http.createServer(function(req, res) {
	if (req.url !== '/') {
		res.writeHead(404);
		res.end();
		return;
	}

	res.end(JSON.stringify({
		service: apps.get('greetings-martian'),
		url: apps.get('http://{greetings-martian}/#test')
	}));
});

server.listen(0, function() {
	apps.put({
		name: 'greetings-martian',
		port: server.address().port
	});

	console.log('visit: http://localhost:'+server.address().port);
});
