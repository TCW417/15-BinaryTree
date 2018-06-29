
// Time complexity for all traversals: O(n) where n is the number of noes
const preOrderTraversal = (rootNode, callback) => {
  // pre-order: root, left, right
  if (!rootNode) return undefined;
  // at this point, I am in the root
  callback(rootNode.value);
  preOrderTraversal(rootNode.left, callback);
  preOrderTraversal(rootNode.right, callback);
  return undefined;
};

const postOrderTraversal = (rootNode, callback) => {
  // post-order: left, right, root;
  if (!rootNode) return undefined;
  postOrderTraversal(rootNode.left, callback);
  postOrderTraversal(rootNode.right, callback);
  callback(rootNode.value);
  return undefined;
};

const inOrderTraversal = (rootNode, callback) => {
  // in-order: left, root, right;
  if (!rootNode) return undefined;
  postOrderTraversal(rootNode.left, callback);
  callback(rootNode.value);
  postOrderTraversal(rootNode.right, callback);
  return undefined;
};

export { preOrderTraversal, inOrderTraversal, postOrderTraversal };
