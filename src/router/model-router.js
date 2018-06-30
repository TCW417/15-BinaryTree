import { Router } from 'express';
import HttpErrors from 'http-errors';
import modelFinder from '../lib/middleware/model-middleware';
import logger from '../lib/logger';
import Node from '../model/treenode';

const modelRouter = new Router();

modelRouter.param('model', modelFinder);

modelRouter.post('/api/read/:model', (request, response, next) => {
  const Model = request.model;
  Model.init()
    .then(() => {
      logger.log(logger.INFO, `MODEL-ROUTER, BEFORE SAVING A NEW ${request.params.model}: ${JSON.stringify(request.body)}`);
      return new Model(request.body).save();
    })
    .then((newResource) => {
      logger.log(logger.INFO, `MODEL-ROUTER AFTER SAVING A NEW ${request.params.model}: ${JSON.stringify(newResource)}`);
      return response.status(201).json(newResource);
    })
    .catch(next);
});

const traverseTree = (tree, method, visitCb) => {
  // console.log('>>>>>>>>> traverseTree ID:', tree);
  if (!tree) return new Promise(resolve => resolve(undefined));
  let thisTree;
  return Node.findById(tree)
    .then((result) => {
      thisTree = result;
      // console.log('>>>>>>> traverseTree',method,'tree node:', thisTree.value);
      if (!thisTree) {
        console.log('tree object is empty, returning undefined');
        return undefined;
      }
      if (method === 'preorder') visitCb(thisTree.value);
      // console.log('...... calling tt from',thisTree._id,' on left ', thisTree.left);
      return traverseTree(thisTree.left, method, visitCb);
    })
    .then(() => {
      if (method === 'inorder') visitCb(thisTree.value);
      // console.log('...... calling tt from',thisTree._id,' on right ', thisTree.right);
      return traverseTree(thisTree.right, method, visitCb);
    })
    .then(() => {
      if (method === 'postorder') visitCb(thisTree.value);
    })
    .catch((err) => { 
      throw err; 
    });
};

modelRouter.get('/api/:model', (request, response, next) => {
  const Model = request.model;
  Model.init()
    .then(() => {
      return Model.find();
    })
    .then((foundModels) => {
      logger.log(logger.INFO, `MODEL-ROUTER: RETURNING ALL FROM ${request.params.model}`);
      return response.status(200).json(foundModels);
    })
    .catch(next);
});

modelRouter.get('/api/:model/:name/:method?', (request, response, next) => {
  if (!request.params.name) {
    return next(new HttpErrors(400, `No ${request.model} id entered`));
  }

  if (!request.params.method) request.params.method = 'inorder';

  const Model = request.model;
  Model.init()
    .then(() => {
      return Model.findOne({ name: request.params.name });
    })
    .then((foundModel) => {
      logger.log(logger.INFO, `MODEL-ROUTER: FOUND THE MODEL ${JSON.stringify(foundModel)}`);
      // console.log('...... calling tt from', foundModel._id,' on ', foundModel.root);
      // iterativePreOrder(foundModel.root, v => console.log('!!!!*****!!!!!*****',v))
      // tt(foundModel.root, 'postorder', v => console.log('!!!!*****!!!!!*****',v));
      const rvals = { 
        method: request.params.method,
        values: [],
      };

      traverseTree(foundModel.root, request.params.method, (v) => {
        rvals.values.push(v);
      })
        .then(() => {
          console.log('....... values', rvals);
          response.status(200).json(rvals);
        });
    })
    .catch(next);
  return undefined;
});

modelRouter.put('/api/read/:model/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, `No ${request.model} id entered`));
  }
  const Model = request.model;
  Model.init()
    .then(() => {
      return Model.findOneAndUpdate({ _id: request.body._id }, request.body);
    })
    .then((foundModel) => {
      logger.log(logger.INFO, `MODEL-ROUTER: FOUND THE MODEL ${JSON.stringify(foundModel)}`);
      return response.json(foundModel);
    })
    .catch(next);
  return undefined;
});

modelRouter.delete('/api/read/:model/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, `No ${request.model} id entered`));
  }
  let routeComplete = false;
  if (request.params.id === '__DELETE') {
    routeComplete = true;
    const Model = request.model;
    Model.init()
      .then(() => {
        return Model.remove();
      })
      .then(() => {
        return response.sendStatus(200);
      })
      .catch((err) => {
        return next(err);
      });
  }
  if (!routeComplete) {
    const Model = request.model;
    Model.init()
      .then(() => {
        return Model.findById(request.params.id);
      })
      .then((resource) => {
        if (!resource) { // findBy return null --> book not found 
          return next(new HttpErrors(404, `Attempt to delete non-existant ${request.model}`));
        }
        return resource.remove();
      })
      .then(() => {
        return response.sendStatus(200);
      })
      .catch(next);
  }
  return undefined;
});

export default modelRouter;
