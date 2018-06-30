'use strict';

import binaryTree from '../model/binary-tree';
import { preOrderTraversal, inOrderTraversal, postOrderTraversal } from '../lib/traversals';

describe('PRE-ORDER', () => {
  test('Expecting a string of visited nodes as 1 2 6 7 8 9 3 4 5', () => {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    let str = '';
    preOrderTraversal(binaryTree.root, (nodeValue) => {
      str += `${nodeValue} `;
    });
    expect(str.trim()).toEqual('1 2 6 7 8 9 3 4 5');
  });
});

describe('POST-ORDER', () => {
  test('Expecting a string of visited nodes as 8 9 7 6 2 4 5 3 1', () => {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    let str = '';
    postOrderTraversal(binaryTree.root, (nodeValue) => {
      str += `${nodeValue} `;
    });
    expect(str.trim()).toEqual('8 9 7 6 2 4 5 3 1');
  });
});

describe('IN-ORDER', () => {
  test('Expecting a string of visited nodes as 6 8 7 9 2 1 4 3 5', () => {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    let str = '';
    inOrderTraversal(binaryTree.root, (nodeValue) => {
      str += `${nodeValue} `;
    });
    expect(str.trim()).toEqual('6 8 7 9 2 1 4 3 5');
  });
});
