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
let cubeSize = canvas.height / 2;

let vertices = [
    new CubePoint3D(positionX-cubeSize, positionY-cubeSize, positionZ-cubeSize),
    new CubePoint3D(positionX+cubeSize, positionY-cubeSize, positionZ-cubeSize),
    new CubePoint3D(positionX+cubeSize, positionY+cubeSize, positionZ-cubeSize),
    new CubePoint3D(positionX-cubeSize, positionY+cubeSize, positionZ-cubeSize),

    new CubePoint3D(positionX-cubeSize, positionY-cubeSize, positionZ+cubeSize),
    new CubePoint3D(positionX+cubeSize, positionY-cubeSize, positionZ+cubeSize),
    new CubePoint3D(positionX+cubeSize, positionY+cubeSize, positionZ+cubeSize),
    new CubePoint3D(positionX-cubeSize, positionY+cubeSize, positionZ+cubeSize),
];

let edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7],
];

let time, timeLast = 0;

function loop(currentTime)
{
    time = currentTime = timeLast;
    timeLast = currentTime;
    update();
    render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function update()
{
}

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
    }
}

// 계속: https://youtu.be/2onQJveDXc4?si=8xeQtsemQNYevDZT&t=489