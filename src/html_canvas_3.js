
// HTML-Canvas 러프하게 그림 그리는 것

/** @type {HTMLElement} */
const logdiv = document.getElementById("log");
logdiv.innerHTML = 'dom:check:ok';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
/**
 * @see <https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D>
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

/** @type {ImageData} */
const screen = ctx.createImageData(320, 240);

/**
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
function setPixel(x, y, r, g, b, a = 255)
{
    const pixel = ctx.createImageData(1, 1);
    pixel.data[0] = r;
    pixel.data[1] = g;
    pixel.data[2] = b;
    pixel.data[3] = a;
    ctx.putImageData(pixel, x, y);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a=256]
 * @param {number} [pixelSize=1]
 */
function setPixel2(x, y, r, g, b, a = 255, pixelSize=1)
{
    const pixel = ctx.createImageData(pixelSize, pixelSize);
    for(let i = 0; i < pixel.data.length; i += 4) {
        pixel.data[i+0] = r;
        pixel.data[i+1] = g;
        pixel.data[i+2] = b;
        pixel.data[i+3] = a;
    }
    ctx.putImageData(pixel, x, y);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a=256]
 */
function setPixel3(x, y, r, g, b, a = 255)
{
    const i = (4 * x) + (y * (screen.width * 4));
    screen.data[i+0] = r;
    screen.data[i+1] = g;
    screen.data[i+2] = b;
    screen.data[i+3] = a;
    ctx.putImageData(screen, 0, 0);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} size
 * @param {string} color
 */
function setArcPixel(x, y, color='white', size=1) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

let timerId = setInterval(() => {
  setPixel3(110, 100, 255, 255, 255);
  setPixel3(120, 110, 255, 255, 255);
  setPixel3(130, 120, 255,   0, 255);

  setArcPixel(100, 100);
  setArcPixel(110, 110);
  setArcPixel(120, 120);
}, 1000 / 15);

