'use strict';

var _binaryTree = require('../model/binary-tree');

var _binaryTree2 = _interopRequireDefault(_binaryTree);

var _traversals = require('../lib/traversals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PRE-ORDER', function () {
  test('Expecting a string of visited nodes as 1 2 6 7 8 9 3 4 5', function () {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    var str = '';
    (0, _traversals.preOrderTraversal)(_binaryTree2.default.root, function (nodeValue) {
      str += nodeValue + ' ';
    });
    expect(str.trim()).toEqual('1 2 6 7 8 9 3 4 5');
  });
});

describe('POST-ORDER', function () {
  test('Expecting a string of visited nodes as 8 9 7 6 2 4 5 3 1', function () {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    var str = '';
    (0, _traversals.postOrderTraversal)(_binaryTree2.default.root, function (nodeValue) {
      str += nodeValue + ' ';
    });
    expect(str.trim()).toEqual('8 9 7 6 2 4 5 3 1');
  });
});

describe('IN-ORDER', function () {
  test('Expecting a string of visited nodes as 8 9 7 6 2 1 4 5 3', function () {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    var str = '';
    (0, _traversals.inOrderTraversal)(_binaryTree2.default.root, function (nodeValue) {
      str += nodeValue + ' ';
    });
    expect(str.trim()).toEqual('8 9 7 6 2 1 4 5 3');
  });
});