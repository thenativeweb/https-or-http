'use strict';

var http = require('http');

var spdy = require('spdy');

var express = require('express'),
    getCertificate = require('get-certificate');

var httpsOrHttp = function httpsOrHttp(options, callback) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.app) {
    throw new Error('App is missing.');
  }
  if (!options.certificateDirectory) {
    throw new Error('Certificate directory is missing.');
  }
  if (!options.ports) {
    throw new Error('Ports are missing.');
  }
  if (!options.ports.http) {
    throw new Error('Http port is missing.');
  }
  if (!options.ports.https) {
    throw new Error('Https port is missing.');
  }
  if (!callback) {
    throw new Error('Callback is missing.');
  }

  var certificate = void 0;

  try {
    certificate = getCertificate(options.certificateDirectory);
  } catch (ex) {
    certificate = undefined;
  }

  if (certificate) {
    spdy.createServer({ key: certificate.privateKey, cert: certificate.certificate }, options.app).listen(options.ports.https, function () {
      var redirectApp = express();

      redirectApp.get(/.*/, function (req, res) {
        res.redirect('https://' + req.headers.host.replace(':' + options.ports.http, ':' + options.ports.https) + req.url);
      });

      http.createServer(redirectApp).listen(options.ports.http, function () {
        callback(null, {
          app: { protocol: 'https', port: options.ports.https },
          redirect: { protocol: 'http', port: options.ports.http }
        });
      });
    });

    return;
  }

  http.createServer(options.app).listen(options.ports.http, function () {
    callback(null, {
      app: { protocol: 'http', port: options.ports.http }
    });
  });
};

module.exports = httpsOrHttp;