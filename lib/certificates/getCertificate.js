'use strict';

const fs = require('fs'),
      path = require('path');

const getCertificate = function (directory) {
  if (!directory) {
    throw new Error('Directory is missing.');
  }

  /* eslint-disable no-sync */
  if (!fs.existsSync(directory)) {
    throw new Error('Directory not found.');
  }

  let certificate,
      privateKey;

  try {
    certificate = fs.readFileSync(path.join(directory, 'certificate.pem'), { encoding: 'utf8' }).trim();
  } catch (ex) {
    throw new Error('Certificate not found.');
  }

  try {
    privateKey = fs.readFileSync(path.join(directory, 'privateKey.pem'), { encoding: 'utf8' }).trim();
  } catch (ex) {
    throw new Error('Private key not found.');
  }
  /* eslint-enable no-sync */

  return { certificate, privateKey };
};

module.exports = getCertificate;
