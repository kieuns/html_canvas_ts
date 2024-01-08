
// HTML-Canvas 러프하게 그림 그리는 것

export {} // prevent error. 뭐지?

const logdiv:HTMLElement = document.getElementById("log");
logdiv.innerHTML = '(log) dom:check:ok';

const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

/** @see <https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D> */
const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

const globalScreen:ImageData = ctx.createImageData(canvas.width, canvas.height);

////

let sampleImageData: ImageData = null;
const sampleImage = new Image();
sampleImage.src = 'data:image/png;base64,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';
sampleImage.addEventListener('load', function() {
    console.log('sampleImage.addEventListener(load');

    ctx.drawImage(sampleImage, 0, 0, sampleImage.width, sampleImage.height);
    sampleImageData = ctx.getImageData(0, 0, sampleImage.width, sampleImage.height);

    startAnimation();
});

////

function startAnimation()
{
    setInterval(() => {
        update();
        render();
    }, 1000 / 5);
}

////

function update()
{
}

////

function renderContext()
{
    //ctx.drawImage(sampleImage, 0, 0, 32, 32);
    //ctx.drawImage(sampleImage, Math.random() * canvas.width, Math.random() * canvas.height, 32, 32);
}

function renderBuffer()
{
    fillBuffer(globalScreen, 0, 0, 0);
    {
        // const [r,g,b,a] = getPixel(sampleImageData, 1, 1);
        // console.log(`rgba: from(1,1) rgba(${r}, ${g}, ${b}, ${a}) `);
        // setPixel(globalScreen, 10, 10, r, g, b, a);

        // test draw all
        for(let y = 0; y < sampleImageData.height; ++y) {
            for(let x = 0; x < sampleImageData.width; ++x) {
                const [r,g,b,a] = getPixel(sampleImageData, x, y);
                setPixel(globalScreen, x, y, r, g, b, a);
            }
        }
    }
    ctx.putImageData(globalScreen, 0, 0);
}

function render()
{
    ctx.reset();
    renderBuffer();
    renderContext();
}

////

function getPixel(src:ImageData, x:number, y:number) {
    const i = (x*4) + (y * (src.width * 4));
    return [
        src.data[i+0], src.data[i+1], src.data[i+2], src.data[i+3] // R/G/B/A
    ];
}

function setPixel(dest:ImageData, x:number, y:number, r:number, g:number, b:number, a:number = 255)
{
    const i = (x*4) + (y * (dest.width * 4));
    dest.data[i+0] = r;
    dest.data[i+1] = g;
    dest.data[i+2] = b;
    dest.data[i+3] = a;
}

function fillBuffer(screen:ImageData, r:number, g:number, b:number, a:number = 255)
{
    let pos = 0;
    for(let i = 0; i < (canvas.width * canvas.height); ++i) {
        pos = i * 4;
        screen.data[pos+0] = r;
        screen.data[pos+1] = g;
        screen.data[pos+2] = b;
        screen.data[pos+3] = a;
    }
    ctx.putImageData(screen, 0, 0);
}
