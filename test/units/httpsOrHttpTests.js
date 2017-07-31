'use strict';

const assert = require('assertthat');

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

  test('throws an error if ports is missing.', done => {
    assert.that(() => {
      httpsOrHttp({ certificate: 'not-missing', app: 'not-missing' });
    }).is.throwing('Ports is missing.');
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
});
