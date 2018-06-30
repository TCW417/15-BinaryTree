const PRE = 1;
const IN = 2;
const POST = 3;

// Time complexity for all traversals: O(n) where n is the number of noes
const traverse = (tree, order, callback) => {
  if (!tree) return undefined;

  if (order === PRE) callback(tree.value);

  traverse(tree.left, order, callback);

  if (order === IN) callback(tree.value);

  traverse(tree.right, order, callback);
  
  if (order === POST) callback(tree.value);

  return undefined;
};

const preOrderTraversal = (rootNode, callback) => {
  // pre-order: root, left, right
  return traverse(rootNode, PRE, callback);
};

const postOrderTraversal = (rootNode, callback) => {
  // post-order: left, right, root;
  return traverse(rootNode, POST, callback);
};

const inOrderTraversal = (rootNode, callback) => {
  // in-order: left, root, right;
  return traverse(rootNode, IN, callback);
};

export { preOrderTraversal, inOrderTraversal, postOrderTraversal };
