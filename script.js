let i = 0;
class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}
class Tree {
  constructor(array) {
    array.sort((a, b) => a - b);
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(array, start, end) {
    if (start > end) return null; //checks if the array is empty

    let mid = Math.floor((start + end) / 2); //finding the middle of the array
    let root = new Node(array[mid]); //turning the middle element into a Node and assigning it as root

    root.leftChild = this.buildTree(array, start, mid - 1); //the start of the leftChild child is 0 and the end of it is the mid-1 of the main array
    root.rightChild = this.buildTree(array, mid + 1, end); //the start of the rightChild child is the mid+1 of the main array and the end of the rightChild child is the end of the main array

    return root;
  }

  insert(data, currentRoot = this.root) {
    const newNode = new Node(data);
    if (!currentRoot) {
      this.root = newNode;
      return;
    }
    if (data === currentRoot.data) return;
    if (data > currentRoot.data) {
      if (!currentRoot.rightChild) {
        currentRoot.rightChild = newNode;
      } else {
        this.insert(data, currentRoot.rightChild);
      }
    } else if (data < currentRoot.data) {
      if (!currentRoot.leftChild) {
        currentRoot.leftChild = newNode;
      } else {
        this.insert(data, currentRoot.leftChild);
      }
    }
  }

  find(data, currentRoot = this.root) {
    if (!currentRoot.data) {
      return null;
    }
    if (currentRoot.data == data) {
      console.log("found it!!", currentRoot);
      return currentRoot;
    } else if (currentRoot.data < data) {
      return this.find(data, currentRoot.rightChild);
    } else {
      return this.find(data, currentRoot.leftChild);
    }
  }
  delete(root = this.root, data) {
    // Base case
    if (root === null) return root;

    // If the data to be deleted is smaller than the root's data, then it lies in the left subtree
    if (data < root.data) root.leftChild = this.delete(root.leftChild, data);
    // If the data to be deleted is greater than the root's data, then it lies in the right subtree
    else if (data > root.data)
      root.rightChild = this.delete(root.rightChild, data);
    // If data is same as root's data, then this is the node to be deleted
    else {
      // Node with only one child or no child
      if (root.leftChild === null) return root.rightChild;
      else if (root.rightChild === null) return root.leftChild;

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      root.data = this.minValue(root.rightChild);

      // Delete the inorder successor
      root.right = this.delete(root.rightChild, root.data);
    }
    return root;
  }

  minValue(node) {
    let minv = node.data;
    while (node.leftChild !== null) {
      minv = node.leftChild.data;
      node = node.leftChild;
    }
    return minv;
  }

  levelOrder(node = this.root, queue = [node], values = []) {
    console.log(queue);
    if (!node || queue.length === 0) return;

    const currentNode = queue.shift();

    values.push(currentNode.data);

    if (currentNode.leftChild) {
      queue.push(currentNode.leftChild);
    }

    if (currentNode.rightChild) {
      queue.push(currentNode.rightChild);
    }
    this.levelOrder(node, queue, values);
    return values.join(" -> ");
  }
  inOrder(root = this.root) {
    if (root.leftChild) {
      this.inOrder(root.leftChild);
    }
    console.log(root.data);
    if (root.rightChild) {
      this.inOrder(root.rightChild);
    }
  }
  preOrder(root = this.root) {
    console.log(root.data);
    if (root.leftChild) {
      this.preOrder(root.leftChild);
    }
    if (root.rightChild) {
      this.preOrder(root.rightChild);
    }
  }
  postOrder(root = this.root) {
    if (root.leftChild) {
      this.postOrder(root.leftChild);
    }
    if (root.rightChild) {
      this.postOrder(root.rightChild);
    }
    console.log(root.data);
  }
  height(data) {
    let l = 0;
    let r = 0;
    const firstNode = this.find(data);
    if (this.root == null) {
      return;
    }
    let node = firstNode;
    while (node.leftChild != null) {
      l++;
      node = node.leftChild;
    }
    node = firstNode;
    while (node.rightChild != null) {
      r++;
      node = node.rightChild;
    }
    if (r > l) {
      console.log("height is: ", r);
    } else if (r < l) {
      console.log("height is: ", l);
    } else {
      console.log("height is: ", 0);
    }
  }
  depth(data, currentRoot = this.root,i=0) {
    if (!currentRoot.data) {
      return null;
    }
    if (currentRoot.data == data) {
      console.log(i)
      // console.log("found it!!", currentRoot);
      return currentRoot;
    } else if (currentRoot.data < data) {
      i++
      return this.depth(data, currentRoot.rightChild,i);
    } else {
      i++
      return this.depth(data, currentRoot.leftChild,i);
    }
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
let L = new Tree([
  23, 8, 4, 5, 7, 9, 67, 6345, 324, 59, 99, 31, 55, 501, 1, 2, 3, 60, 61, 56,
]);
// L.delete(L.root, 31);
// L.levelOrder(L.root);
// console.log(L.levelOrder())
// L.inOrder();
// L.preOrder();
// L.postOrder()
L.depth(9)
// L.height(5);
prettyPrint(L.root);
