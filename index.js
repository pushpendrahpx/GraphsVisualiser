import context from "./canvas.js";
var canvas = document.getElementById("bottom");

var nodenumberElement = document.getElementById("nodenumber");
var newXElement = document.getElementById("NewX");
var newYElement = document.getElementById("NewY");
var nodeAList = document.getElementById("nodeAList");
var nodeBList = document.getElementById("nodeBList");
var addnodebtn = document.getElementById("addnodebtn");
var addedgebtn = document.getElementById("addedgebtn");
var getmouselocation = document.getElementById("getmouselocation");


class Node{
    constructor(number,x,y){
        this.number = number;
        this.x = x;
        this.y = y;
        this.some = Infinity;
    }
};
class Edge{
    constructor(weight,number){
        this.weight = weight;
        this.number = number;
    }
};


var map = new Map();
var adjacencyList = new Map();

function addEdgeToAdjacencyList(nodeA,nodeB,weight){
    if(adjacencyList.has(nodeA.number)){
        console.log(adjacencyList.get(nodeA.number));
        adjacencyList.get(nodeA.number).push(new Edge(weight,nodeB.number));
    }else{
        adjacencyList.set(nodeA.number,new Array());
        adjacencyList.get(nodeA.number).push(new Edge(weight,nodeB.number));
    }


    if(adjacencyList.has(nodeB.number)){
        console.log(adjacencyList.get(nodeB.number));
        adjacencyList.get(nodeB.number).push(new Edge(weight,nodeA.number));
    }else{
        adjacencyList.set(nodeB.number,new Array());
        adjacencyList.get(nodeB.number).push(new Edge(weight,nodeA.number))
    }
    console.log(adjacencyList)
    localStorage.setItem("adjacency",JSON.stringify(adjacencyList))
}

function canvas_arrow(nodeA,nodeB,weight) {
    var headlen = 10; // length of head in pixels
    
    addEdgeToAdjacencyList(nodeA,nodeB,weight);


    let fromx = nodeA.x;
    let fromy = nodeA.y;
    let tox = nodeB.x;
    let toy = nodeB.y;

    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.strokeStyle = "green";
    context.stroke();


    context.beginPath();

    context.font = '24px sans-serif';
    context.textAlign = 'center';
    context.fillStyle = "red";
    context.fillText(weight, (nodeA.x+nodeB.x)/2, (nodeA.y+nodeB.y+4)/2);
    context.fill();
}
function updateNodeList(){
    console.log(nodeAList.innerHTML = "");
    console.log(nodeBList.innerHTML = "");

    
    
    
    
    let keys = [...map.keys()]
    // console.log(keys)
    keys.forEach(key=>{
        let tempnode =map.get(key);
        let ele = document.createElement("option");
        ele.value=tempnode.number;
        ele.innerHTML = String(" node = ")+String(tempnode.number)+String(", x="+tempnode.x)+String(", y="+tempnode.y);
        nodeAList.append(ele);
        nodeBList.append(ele.cloneNode(true));
    

    })
    // while(iterator_obj.next().value !== undefined){
    //     c
    //     console.log(iterator_obj.next().value);
    // }
}

// let count = 0;
let addNode = (e)=>{
    let num = nodenumberElement.value;
    let X = newXElement.value;
    let Y = newYElement.value;

    if(num.length > 0 && X.length > 0 && Y.length > 0){
        num = Number(num);
        X = Number(X);
        Y = Number(Y);


        if(map.has(num) === false){
            map.set(num,new Node(num,X,Y))
            updateNodeList();
            nodenumberElement.value = Number(nodenumberElement.value) + 1;
            



            context.beginPath();
            context.arc(X, Y, 30, 0, 2*Math.PI);
            context.fillStyle = "yellow";
            // context.
            context.fill();
            context.strokeStyle = "black";
            context.stroke();
            

            context.beginPath();

            context.font = '24px sans-serif';
            context.textAlign = 'center';
            context.fillStyle = "red";
            context.fillText(num, X, Y+4);
            context.fill();

            console.log(context)
            // context.beginPath();
            // context.fillStyle = "yellow";
            // context.strokeStyle = "black";
            // context.font = "20px Georgia";
            // context.lineWidth = 10;
            // context.arc(100, 100, 75, 0, 2 * Math.PI, false);
            // context.fill();
            // context.beginPath();
            // context.fillStyle = "red";
            // context.fillText("Hello World!", 40, 100);
            // context.fill();
            // count = count + 1;
            // if(count == 2){
            //     canvas_arrow(map.get(4),map.get(5));
            // }
            // console.log(map.get(num))
            
        }else{
            alert("node Already inserted with this number")
        }


    }else{
        alert("please add node number")
    }
}
let addEdgeHandle = ()=>{
    let nodea = Number(nodeAList.value);
    let nodeb = Number(nodeBList.value);

    nodea = (map.get(nodea));
    nodeb = (map.get(nodeb));
    canvas_arrow(nodea,nodeb,(Math.sqrt(Math.pow((nodeb.y-nodea.y),2) + Math.pow((nodeb.x-nodea.x),2))).toFixed(2));
    
}


let PrimsAlgorithm = ()=>{

}


document.getElementById("addnodebtn").addEventListener("click",addNode)
addedgebtn.addEventListener("click", addEdgeHandle)
canvas.addEventListener("click",(e)=>{
    // console.log(e.clientX)
    // console.log(e.clientY)
    newXElement.value = e.clientX;
    newYElement.value = e.clientY;
    // context.beginPath();
    // context.arc(e.clientX, e.clientY-100, 10, 0, 2*Math.PI);
    // // context.
    // context.strokeStyle = "red";
    // context.stroke();
    
})