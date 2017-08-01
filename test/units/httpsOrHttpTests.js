'use strict';

const path = require('path');

const assert = require('assertthat'),
      express = require('express'),
      freeport = require('freeport');

const httpsOrHttp = require('../../lib/httpsOrHttp');

suite('httpsOrHttp', () => {
  let portHttp,
      portHttps;

  setup(done => {
    freeport((errFirst, portFirst) => {
      if (errFirst) {
        throw errFirst;
      }

      portHttp = portFirst;

      freeport((errSecond, portSecond) => {
        if (errSecond) {
          throw errSecond;
        }

        portHttps = portSecond;

        done();
      });
    });
  });

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

      httpsOrHttp({ app, certificate: path.join(__dirname, '..', 'certificates', 'localhost'), ports: { http: portHttp, https: portHttps }}, (err, result) => {
        assert.that(err).is.null();
        assert.that(result).is.equalTo({ app: { protocol: 'https', port: portHttps }, redirect: { protocol: 'http', port: portHttp }});
        done();
      });
    }).is.not.throwing();
  });

  test('check if callback for HTTP server called.', done => {
    assert.that(() => {
      const app = express();

      httpsOrHttp({ app, certificate: path.join(__dirname, '..', 'certificates', 'empty'), ports: { http: portHttp, https: portHttps }}, (err, result) => {
        assert.that(err).is.null();
        assert.that(result).is.equalTo({ app: { protocol: 'http', port: portHttp }});
        done();
      });
    }).is.not.throwing();
  });
});
