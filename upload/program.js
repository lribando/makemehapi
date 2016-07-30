'use strict';
var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});


  server.route({
    method: 'POST',
    path: '/upload',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      }
    },

    handler: function(request, reply) {
      var body = '';
      request.payload.file.on('data', function(data) {
        body += data;
      });
      request.payload.file.on('end', function() {
        var result = {
          description: request.payload.description,
          file: {
            data: body,
            filename: request.payload.file.hapi.filename,
            headers: request.payload.file.hapi.headers
          }
        };
        return reply(JSON.stringify(result))
      });
    }
  });


server.start(function() {
  console.log('Server running at:', server.info.uri);
});