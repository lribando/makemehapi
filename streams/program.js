'use strict';
var Hapi = require('hapi');
var Path = require('path');
var fs = require('fs');
var rot13 = require("rot13-transform");

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});


  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      var rstream = fs.createReadStream('input.txt');
      reply(rstream.pipe(rot13()));
    }
  });


server.start(function() {
  console.log('Server running at:', server.info.uri);
});