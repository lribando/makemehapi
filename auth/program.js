'use strict';
var Hapi = require('hapi');
var Basic = require('hapi-auth-basic');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

var user = {
  username: 'hapi',
  password: 'auth'
}

var validate = function(request, username, password, callback) {
  var isValid = username === user.username && password === user.password;
  return callback(null, isValid, {username: user.name, password: user.password})
}

server.register(Basic, function(err) {
  if (err) {
    throw err;
  }
  server.auth.strategy('simple', 'basic', {validateFunc: validate});
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'simple',
      handler: function (request, reply) {
        reply();
      }
    }
  });
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});