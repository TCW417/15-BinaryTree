'use strict';

// import { startServer } from './lib/server';
// import { promises } from 'fs';

var _tree = require('./model/tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodes = [];
var nodePromises = [];

var _loop = function _loop(i) {
  var p = new Promise(function () {
    nodes.push(new _tree2.default(i).save());
  });
  nodePromises.push(p);
};

for (var i = 1; i <= 9; i++) {
  _loop(i);
}

Promise.all(nodePromises).then(function (result) {
  console.log('all promises result', result);
}).catch(function (err) {
  throw err;
});

// startServer();