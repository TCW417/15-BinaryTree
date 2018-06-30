'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeSchema = _mongoose2.default.Schema({
  value: {
    type: _mongoose2.default.Schema.Types.Mixed,
    required: true
  },
  children: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'node'
  }]
});

// const treeSchema = mongoose.Schema({
//   root: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'node',
//   },
// });

var skipInit = process.env.NODE_ENV === 'development';
exports.default = _mongoose2.default.model('node', nodeSchema, 'nodes', skipInit);
// const Tree = mongoose.model('tree', treeSchema, 'trees', skipInit);

// export { TreeNode, Tree };

// export default TreeNode;