// Variables

const numCircles = 5;

const minHue = 190;
const maxHue = 285;

const spd = 0.0025;

const startRadius = 200;
const endRadius = 500;

// ** DO NOT EDIT BELOW THIS LINE **

// Setup the canvas
document.body.style.background = "black";
document.body.innerHTML = `<canvas id='canvas' style='position:fixed;left:0;top:0;z-index:-1'></canvas>
` + document.body.innerHTML;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create the circles
var circles = [];
for (var i = 0; i < numCircles; i++) {
    circles.push({
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight),
        r: i / numCircles,
        color: minHue + Math.round(Math.random() * (maxHue - minHue)),
    });
}


animatedBackground();
function animatedBackground() {
    var grd;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear the canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < circles.length; i++) {
        circles[i].r += spd;

        if (circles[i].r >= 1) {
            circles[i].r = 0;
            circles[i].x = Math.round(Math.random() * window.innerWidth);
            circles[i].y = Math.round(Math.random() * window.innerHeight);
            circles[i].color = minHue + Math.round(Math.random() * (maxHue - minHue));
        }

        grd = ctx.createRadialGradient(circles[i].x, circles[i].y, 0, circles[i].x, circles[i].y, Math.round(startRadius + Math.sin(circles[i].r * Math.PI) * (endRadius - startRadius)));
        grd.addColorStop(0, 'hsla(' + circles[i].color + ', 100%, 15%, '+Math.round(Math.min(100, (1-Math.abs(1-circles[i].r*2))*140))+'%)');
        grd.addColorStop(1, 'hsla(' + circles[i].color + ', 100%, 15%, 0)');

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setTimeout(animatedBackground, 30);
}