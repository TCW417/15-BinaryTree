'use strict';


import { startServer } from './lib/server';
import TreeNode from './model/treenode';
import Tree from './model/tree';

let nodes;
const nodePromises = [];

console.log('MAIN: TOP OF FILE');
console.log('MAIN: typeof startServer', typeof startServer);

// empty Trees database
const init = () => {
  return new Promise((resolve, reject) => {
    Promise.all([Tree.remove(), TreeNode.remove()])
      .then((results) => {
        console.log('MAIN init: Tree and TreeNodes removed from DB. results:', results);
        // save tree nodes to database
        for (let i = 1; i <= 9; i++) {
          const p = new Promise((resolve1, reject1) => {
            new TreeNode({ value: i }).save()
              .then((result) => {
                return resolve1(result);
              })
              .catch(reject1);
          });
          nodePromises.push(p);
        }
        // wait for all saves to complete. result
        // will be an array of saved nodes.
        return Promise.all(nodePromises);
      })
      .then((result) => {
        console.log('MAIN init: new TreeNodes saved, building tree.');
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
            console.log('MAIN init: Tree nodes linked and saved.');
            const tree = new Tree({ 
              name: 'Lab-15',
              root: nodes[0]._id,
            });
            return tree.save();
          })
          .then((theTree) => {
            console.log('MAIN init: Tree root Lab-15 saved');
            return resolve(theTree);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// console.log('MAIN: calling init()');

// init()
//   .then((result) => {
//     console.log('MAIN: calling startServer, result from init', result);
//     startServer();
//   })
//   .catch(console.error);
export default init;
// console.log('MAIN: calling startServer');
// startServer();
