// @see https://www.youtube.com/watch?v=2onQJveDXc4

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const moveSpeedX = 0.1;
const moveSpeedY = 0.5;
const moveSpeedZ = 0;

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

// https://en.wikipedia.org/wiki/Rotation_matrix

function moveX()
{
    angle = time * 0.001 * moveSpeedX * Math.PI * 2;
    for(let v of vertices) {
        let dy = v.y - positionY;
        let dz = v.z - positionZ;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + positionY;
        v.z = z + positionZ;
    }
}

function moveY()
{
    angle = time * 0.001 * moveSpeedY * Math.PI * 2;
    for(let v of vertices) {
        let dx = v.x - positionX;
        let dz = v.z - positionZ;
        let x = dx * Math.cos(angle) + dz * Math.sin(angle);
        let z = dx * (-Math.sin(angle)) + dz * Math.cos(angle);
        v.x = x + positionX;
        v.z = z + positionZ;
    }
}

function moveZ()
{
    angle = time * 0.001 * moveSpeedZ * Math.PI * 2;
    for(let v of vertices) {
        let dx = v.x - positionX;
        let dy = v.y - positionY;
        let x = dx * Math.cos(angle) + dy * (-Math.sin(angle));
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + positionX;
        v.y = y + positionY;
    }
}

function update()
{
    if(moveSpeedX > 0)
        moveX();
    if(moveSpeedY > 0)
        moveY();
    if(moveSpeedZ > 0)
        moveZ();
}

// -- rnder all --

function render()
{
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "black"; //bg
    context.strokeStyle = "red"; // cube color
    context.lineWidth = canvas.width / 100;
    context.lineCap = "round";

    context.beginPath();
    for(let edge of edges) {
        context.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        context.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        context.stroke();
    }
    context.closePath();
}

