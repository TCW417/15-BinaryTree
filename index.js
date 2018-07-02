'use strict';

require('dotenv').config();

console.log('INDEX: top of file');

if (!process.env.NODE_ENV) {
  throw new Error('Undefined NODE_ENV');
}

if (process.env.NODE_ENV !== 'production') {
  console.log('DEVELOPMENT SETTINGS');
  require('babel-register');
  console.log('INDEX: requiring in main');
  require('./src/main');
} else {
  console.log('PRODUCTION SETTINGS');
  require('./build/main'); /*eslint-disable-line*/
}

