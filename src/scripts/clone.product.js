let cnt = 1;
export function cloneElement(node){
    let dupNode = node.cloneNode(true);
    dupNode.id= "product " + cnt++;
    node.parentNode.appendChild(dupNode);
    return dupNode;
}


