var assert = require('assert');
var dWebZero = require('../index.js');
var repo = dWebZero(require('./fixtures/conf.json'));

repo.put({
	name: 'format',
	port: 5555,
	host: 'example.com'
});

assert.equal(repo.get('http://{format}/'), 'http://example.com:5555/');

var get = repo.get('format');

assert.deepEqual({name:get.name, port:get.port, host:get.host}, {name:'format', port:5555, host:'example.com'});

process.exit(0);
