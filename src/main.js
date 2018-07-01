'use strict';

import { startServer } from './lib/server';
import TreeNode from './model/treenode';
import Tree from './model/tree';

let nodes;
const nodePromises = [];

// empty Trees database
Promise.all([Tree.remove(), TreeNode.remove()])
  .then(() => {
    // save tree nodes to database
    for (let i = 1; i <= 9; i++) {
      const p = new Promise((resolve, reject) => {
        new TreeNode({ value: i }).save()
          .then((result) => {
            return resolve(result);
          })
          .catch(reject);
      });
      nodePromises.push(p);
    }
    // wait for all saves to complete. result
    // will be an array of saved nodes.
    return Promise.all(nodePromises);
  })
  .then((result) => {
    nodes = result;

    const [one, two, three, four, five, six, seven, eight, nine] = nodes; /* eslint-disable-line */

    // this array of edges maps to Judy's lab-15
    // tree.  edges[i] == node[i+1]'s child links.
    const edges = [
      { left: two, right: three },
      { left: six, right: null },
      { left: four, right: five },
      { left: null, right: null },
      { left: null, right: null },
      { left: null, right: seven },
      { left: eight, right: nine },
      { left: null, right: null },
      { left: null, right: null },
    ];

    const saves = [];
    for (let i = 0; i < edges.length; i++) {
      nodes[i].left = edges[i].left; 
      nodes[i].right = edges[i].right; 
      saves.push(nodes[i].save());
    }
    Promise.all(saves)
      .then(() => {
        const tree = new Tree({ 
          name: 'Lab-15',
          root: nodes[0]._id,
        });
        return tree.save();
      })
      .then((theTree) => {
        return theTree;
      });
  })
  .catch((err) => {
    throw err;
  });

startServer();
