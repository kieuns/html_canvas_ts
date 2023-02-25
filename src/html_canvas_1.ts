
// HTML-Canvas 러프하게 그림 그리는 것

export {}

const logdiv:HTMLElement = document.getElementById("log");
logdiv.innerHTML = 'dom:check:ok';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const onePixel = ctx.createImageData(1, 1);

function setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255)
{
    const pixel = ctx.createImageData(1, 1);
    //const pixel = onePixel;
    pixel.data[0] = r;
    pixel.data[1] = g;
    pixel.data[2] = b;
    pixel.data[3] = a;
    ctx.putImageData(pixel, x, y);
}

function showBigMark()
{
    var imgData = ctx.createImageData(100, 100);
    for(let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 255;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 10, 10);
}

// let timerId = setInterval(() => {
//   setPixel(100, 100, 255, 0, 0);
//   setPixel(110, 110, 255, 0, 255);
//   setPixel(120, 120, 255, 0, 0);
// }, 1000 / 15);

showBigMark();