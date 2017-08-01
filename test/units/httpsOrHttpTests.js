'use strict';

const path = require('path');

const assert = require('assertthat'),
      express = require('express');

const httpsOrHttp = require('../../lib/httpsOrHttp');

suite('httpsOrHttp', () => {
  test('is a function.', done => {
    assert.that(httpsOrHttp).is.ofType('function');
    done();
  });

  test('throws an error if options is missing.', done => {
    assert.that(() => {
      httpsOrHttp();
    }).is.throwing('Options is missing.');
    done();
  });

  test('throws an error if app is missing.', done => {
    assert.that(() => {
      httpsOrHttp({});
    }).is.throwing('App is missing.');
    done();
  });

  test('throws an error if certificate is missing.', done => {
    assert.that(() => {
      httpsOrHttp({ app: 'not-missing' });
    }).is.throwing('Certificate is missing.');
    done();
  });

  test('throws an error if ports are missing.', done => {
    assert.that(() => {
      httpsOrHttp({ certificate: 'not-missing', app: 'not-missing' });
    }).is.throwing('Ports are missing.');
    done();
  });

  test('throws an error if http port is missing.', done => {
    assert.that(() => {
      httpsOrHttp({ certificate: 'not-missing', app: 'not-missing', ports: {}});
    }).is.throwing('Http port is missing.');
    done();
  });

  test('throws an error if https port is missing.', done => {
    assert.that(() => {
      httpsOrHttp({ certificate: 'not-missing', app: 'not-missing', ports: { http: 'not-missing' }});
    }).is.throwing('Https port is missing.');
    done();
  });

  test('throws an error if callback is missing.', done => {
    assert.that(() => {
      httpsOrHttp({ certificate: 'not-missing', app: 'not-missing', ports: { http: 'not-missing', https: 'not-missing' }});
    }).is.throwing('Callback is missing.');
    done();
  });

  test('check if callback for HTTPS server called.', done => {
    assert.that(() => {
      const app = express();

      httpsOrHttp({ app, certificate: path.join(__dirname, '..', 'certificates', 'localhost'), ports: { http: 8000, https: 9000 }}, done);
    }).is.not.throwing();
  });

  test('check if callback for HTTP server called.', done => {
    assert.that(() => {
      const app = express();

      httpsOrHttp({ app, certificate: path.join(__dirname, '..', 'certificates', 'empty'), ports: { http: 8000, https: 9000 }}, done);
    }).is.not.throwing();
  });
});
