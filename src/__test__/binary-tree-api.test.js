'use strict';

import superagent from 'superagent';
import binaryTree from '../model/binary-tree';
import { preOrderTraversal, iterativePreOrder, inOrderTraversal, postOrderTraversal } from '../lib/traversals';
import { startServer, stopServer } from '../lib/server';

const apiUrl = `http://localhost:${process.env.PORT}/api/Tree`;

console.log('b-t.test.js apiUrl', apiUrl);

const Lab_15_JSON = '{"name":"Lab-15","root":{"value":1,"left":{"value":2,"left":{"value":6,"left":null,"right":{"value":7,"left":{"value":8,"left":null,"right":null},"right":{"value":9,"left":null,"right":null}}},"right":null},"right":{"value":3,"left":{"value":4,"left":null,"right":null},"right":{"value":5,"left":null,"right":null}}}}';

beforeAll(startServer);
afterAll(stopServer);

describe('API Server tests', () => {
  test('GET /api/Tree/Lab-15/preorder expecting "preorder" and 1 2 6 7 8 9 3 4 5', () => {
    // expect.assertions(2);
    console.log(`${apiUrl}/Lab-15/preorder`)
    return superagent.get(`${apiUrl}/Lab-15/preorder`)
      .then((result) => {
        console.log('post sa', result);
        console.log('post sa', result);        console.log('post sa', result);        console.log('post sa', result);        console.log('post sa', result);        
        for (let i = 0; i < 1000000000; i++) {}
        expect(result.method).toEqual('preorder');
        // expect(result.values).toEqual([1, 2, 6, 7, 8, 9, 3, 4, 5]);
      })
      .catch((err) => {
        throw err;
      });
  });

// describe('ITERATIVE PRE-ORDER', () => {
//   test('Expecting a string of visited nodes as 1 2 6 7 8 9 3 4 5', () => {
//     // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

//     let str = '';
//     iterativePreOrder(binaryTree.root, (nodeValue) => {
//       str += `${nodeValue} `;
//     });
//     expect(str.trim()).toEqual('1 2 6 7 8 9 3 4 5');
//   });
// });

// describe('POST-ORDER', () => {
//   test('Expecting a string of visited nodes as 8 9 7 6 2 4 5 3 1', () => {
//     // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

//     let str = '';
//     postOrderTraversal(binaryTree.root, (nodeValue) => {
//       str += `${nodeValue} `;
//     });
//     expect(str.trim()).toEqual('8 9 7 6 2 4 5 3 1');
//   });
// });

// describe('IN-ORDER', () => {
//   test('Expecting a string of visited nodes as 6 8 7 9 2 1 4 3 5', () => {
//     // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

//     let str = '';
//     inOrderTraversal(binaryTree.root, (nodeValue) => {
//       str += `${nodeValue} `;
//     });
//     expect(str.trim()).toEqual('6 8 7 9 2 1 4 3 5');
//   });
});
