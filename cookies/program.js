'use strict';
var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.state('session', {
  path: '/',
  ttl: 10,
  encoding: 'base64json',
  domain: 'localhost'
});

server.route({
  method: 'GET',
  path: '/set-cookie',
  handler: function(request, reply) {
    reply('cookie set').state('session', {key: 'makemehapi'});
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.route({
  method: 'GET',
  path: '/check-cookie',
  handler: function(request, reply) {
    var session = request.state.session;
    if (session) {
      reply('success').state('session', { user: 'hapi' });
    } else {
      reply('unauthorized error');
    }
  }
});



server.start(function() {
  console.log('Server running at:', server.info.uri);
});