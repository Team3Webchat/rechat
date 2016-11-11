'use strict';

var _hapi = require('hapi');

var server = new _hapi.Server();

console.log(process.env.PORT);

server.connection({
  port: process.env.PORT || 8000,
  host: '0.0.0.0',
  routes: {
    cors: true
  }
});

server.route({
  method: 'GET',
  path: '/api/test',
  handler: function handler(request, reply) {
    reply('Hello');
  }
});

server.start(function (err) {
  if (err) throw err;

  console.log('Server running at ' + server.info.uri);
});