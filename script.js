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

    root.leftChild = this.buildTree(array, start, mid - 1); //the start of the left child is 0 and the end of it is the mid-1 of the main array
    root.rightChild = this.buildTree(array, mid + 1, end); //the start of the right child is the mid+1 of the main array and the end of the right child is the end of the main array

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
L = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
L.insert(59);
L.insert(99);
L.insert(31);
L.insert(55);
L.insert(501);
L.insert(1);
L.insert(2);
L.insert(3);
prettyPrint(L.root);
