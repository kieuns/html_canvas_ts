
// HTML-Canvas : PixelRain-1

export {} // avoid ts(1208)

// 참고문서
// * png to base64 : <https://www.base64-image.de/>
// * Canvas API : <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API>
// * 캔바스 픽셀 레인 효과 : <https://www.youtube.com/watch?v=RCVxXgJ8xSk> (14:16~)

const myImage = new Image();
// search png to base64
myImage.src = '';

//const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx:CanvasRenderingContext2D  = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;

// // 이미지 로딩은 lazy로딩. 로딩은 끝나면 기능 시작
// myImage.addEventListener('load', function() {});

let pixelArr:Pixel[] = [];
const arrCount:number = 500;

class Pixel {
    protected x:number;
    protected y:number;
    protected size:number;
    protected speed:number;

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 2;
        this.size = (Math.random() * (this.speed) + 1);
    }
    update() {
        this.y += this.speed;
        if( this.y >= canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}


function init() {
    for(let i = 0; i < arrCount; i++) {
        pixelArr.push(new Pixel);
    }
}

function animate() {
    ctx.globalAlpha = 0.2;
    //ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pixelArr.forEach(v => {
        v.update();
        v.draw();
    });
    requestAnimationFrame(animate);
}

function start() {
    init();
    animate();
}

start();