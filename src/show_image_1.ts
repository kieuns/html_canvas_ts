
// HTML-Canvas 러프하게 그림 그리는 것

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

function setPixel(screen:ImageData, x:number, y:number, r:number, g:number, b:number, a:number = 255)
{
    const i = (x*4) + (y * (screen.width * 4));
    screen.data[i+0] = r;
    screen.data[i+1] = g;
    screen.data[i+2] = b;
    screen.data[i+3] = a;
}

function drawBuffer(screen:ImageData)
{
    ctx.putImageData(screen, 0, 0);
}

const maxTime = 1000;
let saveTime = Date.now();

function updateScreen()
{
    setPixel(globalScreen, Math.floor(Math.random()*globalScreen.width), Math.floor(Math.random()*globalScreen.height), 255, 255, 255);
    setPixel(globalScreen, Math.floor(Math.random()*globalScreen.width), Math.floor(Math.random()*globalScreen.height), 255, 255, 255);

    //drawBuffer(globalScreen);
    if(Date.now()-saveTime > maxTime) {
        drawBuffer(globalScreen);
        saveTime = Date.now();
    }
}

let timerId:NodeJS.Timer = setInterval(() => {
    updateScreen();
}, 1000 / 10);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function setPixel_Type1(x:number, y:number, r:number, g:number, b:number, a:number = 255)
// {
//     const pixel = ctx.createImageData(1, 1);
//     pixel.data[0] = r;
//     pixel.data[1] = g;
//     pixel.data[2] = b;
//     pixel.data[3] = a;
//     ctx.putImageData(pixel, x, y);
// }

// function setPixel_Type2(x:number, y:number, r:number, g:number, b:number, a:number = 255, pixelSize:number=1)
// {
//     const pixel = ctx.createImageData(pixelSize, pixelSize);
//     for(let i = 0; i < pixel.data.length; i += 4) {
//         pixel.data[i+0] = r;
//         pixel.data[i+1] = g;
//         pixel.data[i+2] = b;
//         pixel.data[i+3] = a;
//     }
//     ctx.putImageData(pixel, x, y);
// }

// function setPixel_Type3(x:number, y:number, r:number, g:number, b:number, a:number = 255)
// {
//     const i = (4 * x) + (y * (globalScreen.width * 4));
//     globalScreen.data[i+0] = r;
//     globalScreen.data[i+1] = g;
//     globalScreen.data[i+2] = b;
//     globalScreen.data[i+3] = a;
//     ctx.putImageData(globalScreen, 0, 0);
// }

// function setArcPixel_Type1(x:number, y:number, color:string='white', size:number=1) {
//     ctx.beginPath();
//     ctx.fillStyle = color;
//     ctx.arc(x, y, size, 0, 2 * Math.PI);
//     ctx.fill();
// }
