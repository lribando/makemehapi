'use strict';
var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});


  server.route({
    method: 'GET',
    path: '/chickens/{breed}',
    handler: function(request, reply) {
      reply('Hello ' + request.params.breed);
    },
    config: {
      validate: {
        params: {
          breed: Joi.string().required()
        }
      }
    }
  });


server.start(function() {
  console.log('Server running at:', server.info.uri);
});