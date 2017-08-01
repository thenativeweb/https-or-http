'use strict';

const http = require('http'),
      https = require('https');

const express = require('express'),
      getCertificate = require('get-certificate');

const httpsOrHttp = function (options, callback) {
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

  let certificate;

  try {
    certificate = getCertificate(options.certificateDirectory);
  } catch (ex) {
    certificate = undefined;
  }

  if (certificate) {
    https.createServer({ key: certificate.privateKey, cert: certificate.certificate }, options.app).listen(options.ports.https, () => {
      const redirectApp = express();

      redirectApp.get(/.*/, (req, res) => {
        res.redirect(`https://${req.headers.host.replace(`:${options.ports.http}`, `:${options.ports.https}`)}${req.url}`);
      });

      http.createServer(redirectApp).listen(options.ports.http, () => {
        callback(null, {
          app: { protocol: 'https', port: options.ports.https },
          redirect: { protocol: 'http', port: options.ports.http }
        });
      });
    });

    return;
  }

  http.createServer(options.app).listen(options.ports.http, () => {
    callback(null, {
      app: { protocol: 'http', port: options.ports.http }
    });
  });
};

module.exports = httpsOrHttp;
