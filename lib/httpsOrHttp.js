'use strict';

const http = require('http'),
      https = require('https');

const express = require('express'),
      flaschenpost = require('flaschenpost'),
      getCertificate = require('get-certificate');

const httpsOrHttp = function (options, callback) {
  if (!options) {
    throw new Error('Options is missing.');
  }

  if (!options.app) {
    throw new Error('App is missing.');
  }

  if (!options.certificate) {
    throw new Error('Certificate is missing.');
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

  const logger = flaschenpost.getLogger();
  let certificate;

  try {
    certificate = getCertificate(options.certificate);
  } catch (ex) {
    certificate = undefined;
  }

  if (certificate) {
    https.createServer({ key: certificate.privateKey, cert: certificate.certificate }, options.app).listen(options.ports.https, () => {
      logger.info('HTTPS Server started.', { port: options.ports.https });

      const redirectApp = express();

      redirectApp.get(/.*/, (req, res) => {
        res.redirect(`https://${req.headers.host.replace(`:${options.ports.http}`, `:${options.ports.https}`)}${req.url}`);
      });

      http.createServer(redirectApp).listen(options.ports.http, () => {
        logger.info('Redirect server started.', { port: options.ports.http });

        callback();
      });
    });

    return;
  }

  http.createServer(options.app).listen(options.ports.http, () => {
    logger.info('HTTP server started.', { port: options.ports.http });

    callback();
  });
};

module.exports = httpsOrHttp;
