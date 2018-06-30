'use strict';

import mongoose from 'mongoose';

const treeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  root: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreeNode',
  },
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('Tree', treeSchema, 'trees', skipInit);
