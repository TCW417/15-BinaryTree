![cf](http://i.imgur.com/7v5ASc8.png) Lab 15- Binary Tree Data Structure
====
[![Build Status](https://travis-ci.com/TCW417/15-BinaryTree.svg?branch=master)](https://travis-ci.com/TCW417/15-BinaryTree)

This lab implements a simple binary tree data structure and methods for doing pre-, in-, and post-order traversals.  See ./src/__test__/binary-tree.js for examples.

### INSTALLATION

  - Assuming you have git, node.js and npm installed, clone https://github.com/TCW417/15-BinaryTree.git into a directory of your choice.  (If you don't have git, node.js and npm installed, please google instructions on how to install these tools.) 
  - run `npm init -y`
  - run `npm i`
  - run `npm test` to execute tests

### USE OF THE LIBRARY

The following code snippet demonstrates use of the library:
```
// binary-tree creates a small binary tree data structure and exports it. 
// Look in binary-tree.js for an example of how to build your own tree.
import binaryTree from '../model/binary-tree';

// traversals.js is the module that exports the three tree traversal methods provided by
// the library.
import { preOrderTraversal, inOrderTraversal, postOrderTraversal } from '../lib/traversals';

// Do an in-order traversal, returning the values as elements in an array:

const vals = [];
inOrderTraversal(binaryTree.root, (v) => {
  vals.push(v);
});
```
