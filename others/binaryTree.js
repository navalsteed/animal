/* function BST(val) {
    this.value = val;
    this.yesNode = null;
    this.noNode = null;
}





var bst=new BST("Is is a cat");
bst.yesNode=new BST("cat");
bst.noNode=new BST("fish");

var vv=JSON.stringify(bst);
var v=JSON.parse(vv);
traverse(v);
console.log(v); */

/* function traverse(obj) {
 
    // always follow left branch first
    if (obj.yesNode) {
        traverse(obj.yesNode);
    }
    // do stuff for leaf nodes
    if (obj.value) {
        if (obj.value == animalOld) {
            var animalNew = localStorage.getItem("latestAnimal");
            var animalOld = localStorage.getItem("oldAnimal");
            var bo = localStorage.getItem("bo");
            var que = localStorage.getItem("que");
            obj = new BST(que);
            if (bo == true) {
                obj.yesNode = new BST(animalNew);
                obj.noNode = new BST(animalOld);
            } else {
                obj.noNode = new BST(animalNew);
                obj.yesNode = new BST(animalOld);
            }
            break;
        }
        // break;
    }
    // then the right branch if it exists
    if (obj.noNode) {
        traverse(obj.noNode);
    }
} */