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
var startPrims = document.getElementById("startPrims");

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
var minimumspanning = new Map();
// var map =  new Map(JSON.parse(localStorage.map));
// var adjacencyList =  new Map(JSON.parse(localStorage.adjacencyList));

function addEdgeToPathList(nodeA,nodeB,weight){
    if(minimumspanning.has(nodeA.number)){
        console.log(minimumspanning.get(nodeA.number));
        minimumspanning.get(nodeA.number).push(new Edge(weight,nodeB.number));
    }else{
        minimumspanning.set(nodeA.number,new Array());
        minimumspanning.get(nodeA.number).push(new Edge(weight,nodeB.number));
    }


    if(minimumspanning.has(nodeB.number)){
        console.log(minimumspanning.get(nodeB.number));
        minimumspanning.get(nodeB.number).push(new Edge(weight,nodeA.number));
    }else{
        minimumspanning.set(nodeB.number,new Array());
        minimumspanning.get(nodeB.number).push(new Edge(weight,nodeA.number))
    }
    console.log(minimumspanning)
    let keys = Array.from( minimumspanning.keys() );
    console.log(keys)
    localStorage.setItem("adjacency",JSON.stringify(adjacencyList))
}

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
    let keys = Array.from( adjacencyList.keys() );
    console.log(keys)
    localStorage.setItem("adjacency",JSON.stringify(adjacencyList))
}

function canvas_arrow(nodeA,nodeB,weight, status = false) {
    if(status==false){
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
    }else{
        var headlen = 10; // length of head in pixels
    
        addEdgeToPathList(nodeA,nodeB,weight);


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
        context.moveTo(tox, toy);context.lineWidth = 10;
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        context.strokeStyle = "red";
        context.stroke();


        context.beginPath();

        context.font = '24px sans-serif';
        context.textAlign = 'center';
        context.fillStyle = "red";
        context.fillText(weight, (nodeA.x+nodeB.x)/2, (nodeA.y+nodeB.y+4)/2);
        context.fill();
    }
}
function updateNodeList(){
    (nodeAList.innerHTML = "");
    (nodeBList.innerHTML = "");

    
    
    
    
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

let mstHandle = (vert1=false, vert2=false)=>{
    let nodea = Number(vert1);
        let nodeb = Number(vert2);

        nodea = (map.get(nodea));
        nodeb = (map.get(nodeb));
        canvas_arrow(nodea,nodeb,(Math.sqrt(Math.pow((nodeb.y-nodea.y),2) + Math.pow((nodeb.x-nodea.x),2))).toFixed(2), true);
}
let addEdgeHandle = ()=>{
        let nodea = Number(nodeAList.value);
        let nodeb = Number(nodeBList.value);

        nodea = (map.get(nodea));
        nodeb = (map.get(nodeb));
        canvas_arrow(nodea,nodeb,(Math.sqrt(Math.pow((nodeb.y-nodea.y),2) + Math.pow((nodeb.x-nodea.x),2))).toFixed(2), false);
        // PrimsAlgorithm()
    
}


let PrimsAlgorithm = ()=>{
    let mstSet = new Set();
    let visited = new Set();

    function getMinEdge(vertex){
        console.log(adjacencyList.get(vertex));
        let oldarr = [];
        ((adjacencyList.get(vertex))).forEach(eachEdge=>{
            oldarr.push({weight:eachEdge.weight, number:eachEdge.number})
        })
        console.log(oldarr)

        let keys = oldarr;
        let newarr = new Array();

        console.log(keys)

        keys.forEach(eachkey=>{
            if(mstSet.has(eachkey) == false){
                mstSet.add(eachkey.number)
                newarr.push(eachkey);
            }
        });
        

        let minNew = {weight:Infinity,number:null};
        newarr.forEach(newEachKey=>{
            if(minNew.weight > newEachKey.weight){
                minNew = newEachKey;
            }
        })


        console.log(newarr,keys)
        if(minNew.weight == Infinity){
            return false;
        }else{
            return minNew;
        }

    }
    console.log(getMinEdge(1))
    
    let vertex = 1;
    map.get(vertex).some = 0;
    console.log(map.get(vertex))
    mstSet.add(1)
    visited.add(vertex);
    let baderror = 1;
    let oldv = 1;
    while(mstSet.size < map.size){
        baderror = baderror + 1;
        if(baderror > 100){
            break;
        }
        console.log("AD")
        vertex = getMinEdge(vertex).number;
        
        mstHandle(oldv,vertex);
        visited.add(vertex);
        oldv = vertex;

        console.log(vertex, mstSet)
        if(visited.has(vertex)== false){
            visited.add(vertex)
        }

        adjacencyList.get(vertex).forEach(ele=>{
            
            if(visited.has(ele.number) == false){
                if(ele.weight < map.get(ele.number).some){
                    map.get(ele.number).some = ele.weight;
                }
            }
        })


    }

    console.log(adjacencyList, map)
    localStorage.map = JSON.stringify(Array.from(map.entries()));
    localStorage.adjacencyList = JSON.stringify(Array.from(adjacencyList.entries()));

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
startPrims.addEventListener("click",PrimsAlgorithm);