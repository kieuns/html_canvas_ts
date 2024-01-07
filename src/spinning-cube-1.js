// @see https://www.youtube.com/watch?v=2onQJveDXc4

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// cube
class CubePoint3D
{
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

let positionX = canvas.width / 2;
let positionY = canvas.height / 2;
let positionZ = 0;
let cubeSize = canvas.height / 3;
console.log(`canvas.width:${canvas.width}, canvas.height:${canvas.height}, positionX:${positionX} positionY:${positionY} cubeSize:${cubeSize}`);

//
//   +-----+     4 --- 5
//  /     /|    /     /|
// +-----+ |   0 --- 1 |
// |     | +   | 7   | 6
// |     |/    |     |/ 
// +-----+     3 --- 2  
//
let vertices = [
    new CubePoint3D(positionX-cubeSize, positionY-cubeSize, positionZ-cubeSize), // 0
    new CubePoint3D(positionX+cubeSize, positionY-cubeSize, positionZ-cubeSize), // 1
    new CubePoint3D(positionX+cubeSize, positionY+cubeSize, positionZ-cubeSize), // 2
    new CubePoint3D(positionX-cubeSize, positionY+cubeSize, positionZ-cubeSize), // 3

    new CubePoint3D(positionX-cubeSize, positionY-cubeSize, positionZ+cubeSize), // 4
    new CubePoint3D(positionX+cubeSize, positionY-cubeSize, positionZ+cubeSize), // 5
    new CubePoint3D(positionX+cubeSize, positionY+cubeSize, positionZ+cubeSize), // 6
    new CubePoint3D(positionX-cubeSize, positionY+cubeSize, positionZ+cubeSize), // 7
];

let edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7],
];

let time, timeLast = 0;

// -- update --

function loop(currentTime)
{
    time = currentTime - timeLast;
    timeLast = currentTime;
    update();
    render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// -- rotation --

function moveX() 
{
    let angle = Math.PI / 180; // Convert to radians
    for (let i = 0; i < vertices.length; i++) {
        let y = vertices[i].y - positionY;
        let z = vertices[i].z - positionZ;
        vertices[i].y = y * Math.cos(angle) - z * Math.sin(angle) + positionY;
        vertices[i].z = y * Math.sin(angle) + z * Math.cos(angle) + positionZ;
    }
}

function moveY()
{
}

function moveZ()
{
    
}

function update()
{
}

// -- rnder all --

function render()
{
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "black"; //bg
    context.strokeStyle = "red"; // cube color
    context.lineWidth = canvas.width / 50;
    context.lineCap = "round";

    for(let edge of edges) {
        context.beginPath();
        context.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        context.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        context.stroke();
        context.closePath();
    }
}

// 계속: https://youtu.be/2onQJveDXc4?si=8xeQtsemQNYevDZT&t=489