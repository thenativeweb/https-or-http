'use strict';

const path = require('path');

const assert = require('assertthat');

const getCertificate = require('../../../lib/certificates/getCertificate');

suite('getCertificate', () => {
  test('is a function.', done => {
    assert.that(getCertificate).is.ofType('function');
    done();
  });

  test('throws an error if directory is missing.', done => {
    assert.that(() => {
      getCertificate();
    }).is.throwing('Directory is missing.');
    done();
  });

  test('returns a certificate and a private key.', done => {
    const certificateDirectory = path.join(__dirname, '..', '..', 'certificates', 'localhost');

    const certificate = getCertificate(certificateDirectory);

    assert.that(certificate).is.ofType('object');
    assert.that(certificate.certificate).is.startingWith('-----BEGIN CERTIFICATE-----');
    assert.that(certificate.certificate).is.endingWith('-----END CERTIFICATE-----');
    assert.that(certificate.privateKey).is.startingWith('-----BEGIN RSA PRIVATE KEY-----');
    assert.that(certificate.privateKey).is.endingWith('-----END RSA PRIVATE KEY-----');
    done();
  });

  test('throws an error if the given directory does not exist.', done => {
    const certificateDirectory = path.join(__dirname, '..', '..', 'certificates', 'non-existent');

    assert.that(() => {
      getCertificate(certificateDirectory);
    }).is.throwing('Directory not found.');
    done();
  });

  test('throws an error if the given directory is empty.', done => {
    const certificateDirectory = path.join(__dirname, '..', '..', 'certificates', 'empty');

    assert.that(() => {
      getCertificate(certificateDirectory);
    }).is.throwing('Certificate not found.');
    done();
  });

  test('throws an error if the certificate is missing.', done => {
    const certificateDirectory = path.join(__dirname, '..', '..', 'certificates', 'without-certificate');

    assert.that(() => {
      getCertificate(certificateDirectory);
    }).is.throwing('Certificate not found.');
    done();
  });

  test('throws an error if the private key is missing.', done => {
    const certificateDirectory = path.join(__dirname, '..', '..', 'certificates', 'without-private-key');

    assert.that(() => {
      getCertificate(certificateDirectory);
    }).is.throwing('Private key not found.');
    done();
  });
});
