'use strict';

import mongoose from 'mongoose';

const nodeSchema = mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  // children: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'TreeNode',
  // }],
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreeNode',
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreeNode',
  },
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('TreeNode', nodeSchema, 'treeNodes', skipInit);
