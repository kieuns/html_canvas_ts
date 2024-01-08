
// HTML-Canvas 러프하게 그림 그리는 것

import {multiplyMatrixAndPoint_3x3} from './matrix';

export {} // prevent error. 뭐지?


/** @type {HTMLElement} */
const logdiv:HTMLElement = document.getElementById("log");
logdiv.innerHTML = '(log) dom:check:ok';

const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
/**
 * @see <https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D>
 * @type {CanvasRenderingContext2D}
 */
const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

/** @type {ImageData} */
const globalScreen:ImageData = ctx.createImageData(canvas.width, canvas.height);

////

function setPixel(screen:ImageData, x:number, y:number, r:number, g:number, b:number, a:number = 255)
{
    const i = (x*4) + (y * (screen.width * 4));
    screen.data[i+0] = r;
    screen.data[i+1] = g;
    screen.data[i+2] = b;
    screen.data[i+3] = a;
}

function flipBuffer(screen:ImageData)
{
    ctx.putImageData(screen, 0, 0);
}

function clearBuffer(screen:ImageData, r:number, g:number, b:number, a:number = 255)
{
    let pos = 0;
    for(let i = 0; i < (canvas.width * canvas.height); ++i) {
        pos = i * 4;
        screen.data[pos+0] = r;
        screen.data[pos+1] = g;
        screen.data[pos+2] = b;
        screen.data[pos+3] = a;
    }
    flipBuffer(globalScreen);
}

function setArcPixel(x:number, y:number, color:string='white', size:number=1) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

////

const centerX = canvas.width/2;
const centerY = canvas.height/2;
const scale = 40;

const cubePoints:number[][] = [
    [-1, -1,  1],
    [ 1, -1,  1],
    [ 1,  1,  1],
    [-1,  1,  1],
    [-1, -1, -1],
    [ 1, -1, -1],
    [ 1,  1, -1],
    [-1,  1, -1],
];

// (2x3) * (3x1) 하려고함. (열행값이 3이니 첫번째 값이 (2x3)이든 (3x3)이든 됨)
const projectionMatrix:number[] = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 0
];

function drawCube()
{
    cubePoints.forEach(v => {
        const pt = multiplyMatrixAndPoint_3x3(projectionMatrix, v);
        const x = pt[0] * scale + centerX;
        const y = pt[1] * scale + centerY;
        setPixel(globalScreen, x, y, 255, 0, 0);
    });
}

function drawCube2()
{
    cubePoints.forEach(v => {
        const pt = multiplyMatrixAndPoint_3x3(projectionMatrix, v);
        const x = pt[0] * scale + centerX;
        const y = pt[1] * scale + centerY;
        setArcPixel(x, y, 'red', 2);
    });
}

////

function updateCtx()
{
    ctx.reset();
    drawCube2();
}

function updateScreen()
{
    clearBuffer(globalScreen, 255, 255, 255);
    drawCube();
    flipBuffer(globalScreen);
}

let timerId:NodeJS.Timer = setInterval(() => {
    updateScreen();
}, 1000 / 10);

////

