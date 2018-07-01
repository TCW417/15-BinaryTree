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

const iterativePreOrder = (rootNode, callback) => {
  if (!rootNode) return undefined;

  const stack = [rootNode];
  
  while (stack.length) {
    const node = stack.pop();
    callback(node.value);
    
    if (node.right !== null) stack.push(node.right);
    if (node.left !== null) stack.push(node.left);
  }
  return undefined;
};

export { preOrderTraversal, iterativePreOrder, inOrderTraversal, postOrderTraversal };
