import { Router } from 'express';
import HttpErrors from 'http-errors';
import Tree from '../model/tree';
import logger from '../lib/logger';
import Node from '../model/treenode';

const treeRouter = new Router();

const traverseTree = (treeName, treePtr, traverse) => {
  return new Promise((resolve, reject) => {
    let callback;
    let jsonCallback;
    let rval;

    const tt = (tree, method, visitCb, jsonCb) => {
      if (!tree) return new Promise(res => res(undefined));
      let thisTree;
      return Node.findById(tree)
        .then((result) => {
          thisTree = result;
          if (!thisTree) {
            return undefined;
          }
          if (method === 'preorder' || method === 'json') visitCb(thisTree.value);
          if (jsonCb) jsonCb('left', thisTree.left);
          return tt(thisTree.left, method, visitCb, jsonCb);
        })
        .then(() => {
          if (method === 'inorder') visitCb(thisTree.value);
          if (jsonCb) jsonCb('right', thisTree.right);
          return tt(thisTree.right, method, visitCb, jsonCb);
        })
        .then(() => {
          if (method === 'postorder') visitCb(thisTree.value);
          if (jsonCb) jsonCb('close');
        })
        .catch((err) => { 
          throw err; 
        });
    };
    
    if (traverse === 'json') {
      rval = `{"name":"${treeName}","root":`;
      callback = (v) => {
        rval = `${rval}{"value":${v}`;
        return undefined;
      };
      jsonCallback = (dir, p) => {
        rval = dir !== 'close' ? `${rval},"${dir}":${p ? '' : null}` : `${rval}}`;
      };
    } else {
      rval = { 
        method: traverse,
        values: [],
      };
      callback = v => rval.values.push(v);
      jsonCallback = null;
    }
    tt(treePtr, traverse, callback, jsonCallback)
      .then(() => {
        if (traverse === 'json') rval = JSON.parse(`${rval}}`);
        return resolve(rval);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// return an array of tree names on GET /api/Tree
treeRouter.get('/api/tree', (request, response, next) => {
  Tree.init()
    .then(() => {
      return Tree.find();
    })
    .then((foundModels) => {
      logger.log(logger.INFO, 'TREE-ROUTER: RETURNING ALL TREE NAMES');
      return response.status(200).json(foundModels.map(m => m.name));
    })
    .catch(next);
});

// return an object with the traversal method and an array of values
treeRouter.get('/api/tree/:name/:method?', (request, response, next) => {
  if (!request.params.method) {
    request.params.method = 'json';
  }
  if (!['preorder', 'postorder', 'inorder', 'json'].includes(request.params.method)) {
    return next(new HttpErrors(400, `Unrecognized traversal method: ${request.params.method}\nUse preorder, inorder or postorder`));
  }
  
  Tree.init()
    .then(() => {
      return Tree.findOne({ name: request.params.name });
    })
    .then((foundTree) => {
      logger.log(logger.INFO, `TREE-ROUTER: FOUND TREE ${JSON.stringify(foundTree)}`);
      traverseTree(request.params.name, foundTree.root, request.params.method)
        .then((result) => {         
          response.status(200).json(result);
        })
        .catch(next);
    })
    .catch(next);
  return undefined;
});

export default treeRouter;
