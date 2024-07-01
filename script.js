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
  insert(value, currentRoot = this.root) {
    const newNode = new Node(value);

    if (!currentRoot) {
      this.root = newNode;
      return;
    }

    if (value === currentRoot.value) return;
    if (value > currentRoot.value) {
      if (!currentRoot.right) {
        currentRoot.rightChild = newNode;
      } else {
        this.insert(value, currentRoot.right);
      }
    } else if (value < currentRoot.value) {
      if (!currentRoot.left) {
        currentRoot.leftChild = newNode;
      } else {
        this.insert(value, currentRoot.left);
      }
    }
  }
  // insert(value, currentRoot = this.root) {
  //   i++;
  //   console.log(i);
  //   console.log(currentRoot,value)
  //   if (currentRoot.data < value) {
  //     console.log("what");

  //     if (currentRoot.leftChild) {
  //       this.insert(value, currentRoot.leftChild);
  //     } else {
  //       currentRoot.leftChild = new Node(value);
  //     }
  //   } else {
  //     if (currentRoot.rightChild) {
  //       this.insert(value, currentRoot.rightChild);
  //       console.log("wtr");
  //     } else {
  //       console.log("trying");
  //       currentRoot.rightChild = new Node(value);
  //     }
  //   }
  // }
}
L = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
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
// L.insert(59);
// L.insert(99);
// L.insert(31);
// L.insert(55);
// L.insert(501);
// L.insert(1);
// L.insert(2)
// L.insert(3)

prettyPrint(L.root);
