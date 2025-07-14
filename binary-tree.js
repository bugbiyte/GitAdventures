/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let queue = [{ node: this.root, depth: 1 }];

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {

    if (!this.root) return 0;
    let queue = [{ node: this.root, depth: 1 }];
    let maxDepth = 0;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    let maxSum = -Infinity;
    let stack = [{ node: this.root, currentSum: this.root.val }];

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {

    if (!this.root) return null;
    let queue = [this.root];
    let nextLargerValue = null; 
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.val > lowerBound) {
        if (nextLargerValue === null || current.val < nextLargerValue) {
          nextLargerValue = current.val;
        }
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return nextLargerValue; 
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

    return new BinaryTree();  

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {


    if (!this.root) return null;
    let stack = [{ node: this.root, parent: null }];
    let parentMap = new Map();
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
