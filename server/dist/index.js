'use strict';

var _hapi = require('hapi');

var server = new _hapi.Server();

server.connection({
  port: 8000,
  routes: {
    cors: true
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function handler(request, reply) {
    reply('Hello');
  }
});

server.start(function (err) {
  if (err) throw err;

  console.log('Server running at ' + server.info.uri);
});