'use strict';

import superagent from 'superagent';
// import binaryTree from '../model/binary-tree';
// import { preOrderTraversal, iterativePreOrder, inOrderTraversal, postOrderTraversal } from '../lib/traversals';
// import init from '../main';

import { startServer, stopServer } from '../lib/server';

const apiUrl = `http://localhost:${process.env.PORT}/api/Tree`;

const lab15Json = '{"name":"Lab-15","root":{"value":1,"left":{"value":2,"left":{"value":6,"left":null,"right":{"value":7,"left":{"value":8,"left":null,"right":null},"right":{"value":9,"left":null,"right":null}}},"right":null},"right":{"value":3,"left":{"value":4,"left":null,"right":null},"right":{"value":5,"left":null,"right":null}}}}';

// beforeAll(() => {
//   console.log('API TEST calling startServer from beforeAll');
//   startServer();
// });
beforeAll(startServer);
afterAll(stopServer);

describe('API Server tests', () => {
  test('GET /api/tree expect list of trees (just "Lab-15")', () => {
    return superagent(apiUrl)
      .then((result) => {
        expect(result.body).toHaveLength(1);
        expect(result.body[0]).toEqual('Lab-15');
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET /api/tree/Lab-15/preorder expecting "preorder" and 1 2 6 7 8 9 3 4 5', () => {
    // expect.assertions(2);
    return superagent.get(`${apiUrl}/Lab-15/preorder`)
      .then((result) => {
        expect(result.body.method).toEqual('preorder');
        expect(result.body.values).toEqual([1, 2, 6, 7, 8, 9, 3, 4, 5]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET /api/tree/Lab-15/inorder expecting "inorder" and 6 8 7 9 2 1 4 3 5', () => {
    // expect.assertions(2);
    return superagent.get(`${apiUrl}/Lab-15/inorder`)
      .then((result) => {
        expect(result.body.method).toEqual('inorder');
        expect(result.body.values).toEqual([6, 8, 7, 9, 2, 1, 4, 3, 5]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET /api/tree/Lab-15/postorder expecting "postorder" and 8 9 7 6 2 4 5 3 1', () => {
    // expect.assertions(2);
    return superagent.get(`${apiUrl}/Lab-15/postorder`)
      .then((result) => {
        expect(result.body.method).toEqual('postorder');
        expect(result.body.values).toEqual([8, 9, 7, 6, 2, 4, 5, 3, 1]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET /api/tree/Lab-15 expecting tree returned as json', () => {
    // expect.assertions(2);
    return superagent.get(`${apiUrl}/Lab-15`)
      .then((result) => {
        expect(result.body.name).toEqual('Lab-15');
        expect(JSON.stringify(result.body)).toEqual(lab15Json);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET /api/tree/Lab-15/json expecting tree returned as json', () => {
    // expect.assertions(2);
    return superagent.get(`${apiUrl}/Lab-15/json`)
      .then((result) => {
        expect(result.body.name).toEqual('Lab-15');
        expect(JSON.stringify(result.body)).toEqual(lab15Json);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET /api/tree/NOTREE expecting 404 tree not found', () => {
    return superagent.get(`${apiUrl}/NOTREE`)
      .then((result) => {
        throw result; // shouldn't get here
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
  
  test('GET /api/tree/Lab-15/junk expecting 400 bad request', () => {
    return superagent.get(`${apiUrl}/Lab-15/junk`)
      .then((result) => {
        throw result; // shouldn't get here
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
});
