var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(Inert, function (err) {
  if (err) {
    throw err;
  }
  server.route({
    path: '/index',
    method: 'GET',
    handler: {
      file: Path.join(__dirname, 'html/index.html')
    }
  });
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});