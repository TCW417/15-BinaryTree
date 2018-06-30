'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryTree = function BinaryTree() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, BinaryTree);

  this.root = root;
};

var nodes = [];
for (var i = 1; i <= 9; i++) {
  nodes.push(new _node2.default(i));
}

// array destructuring
// this is the same as doing this:
// const one = nodes[0]
// const two = nodes[1]
// const three = nodes[3]
var one = nodes[0],
    two = nodes[1],
    three = nodes[2],
    four = nodes[3],
    five = nodes[4],
    six = nodes[5],
    seven = nodes[6],
    eight = nodes[7],
    nine = nodes[8];

// manually connecting my nodes together to make a tree

one.left = two;
one.right = three;

two.left = six;

three.left = four;
three.right = five;

six.right = seven;

seven.left = eight;
seven.right = nine;

var binaryTree = new BinaryTree(one);

exports.default = binaryTree;