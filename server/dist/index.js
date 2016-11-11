'use strict';

var _hapi = require('hapi');

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var environment = process.env.NODE_ENV || 'production';
var isDevMode = environment === 'development';
var server = new _hapi.Server();

server.connection({
  port: 8000,
  routes: {
    cors: environment === 'development',
    files: isDevMode ? {} : {
      relativeTo: _path2.default.join(__dirname, '../../ui/build')
    }
  }
});

if (!isDevMode) {
  server.register(_inert2.default);
  server.route({
    method: 'GET',
    path: '/',
    handler: function handler(request, reply) {
      reply.file(_path2.default.join(__dirname, '../../ui/build/index.html'));
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });
}

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