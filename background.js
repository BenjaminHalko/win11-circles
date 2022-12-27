// Variables
var numCircles = 8;

var frameRate = 30;

var minHue = 190;
var maxHue = 285;

var spd = 0.05;

var startRadius = 200;
var endRadius = 500;

// ** DO NOT EDIT BELOW THIS LINE **
var spdReal = spd / frameRate;
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

const animate = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    for(var i = 0; i < circles.length; i++) {
        circles[i].r += spdReal;

        if (circles[i].r >= 1) {
            circles[i].r = 0;
            circles[i].x = Math.round(Math.random() * window.innerWidth);
            circles[i].y = Math.round(Math.random() * window.innerHeight);
            circles[i].color = minHue + Math.round(Math.random() * (maxHue - minHue));
        }

        ctx.fillStyle = ctx.createRadialGradient(circles[i].x, circles[i].y, 0, circles[i].x, circles[i].y, Math.round(startRadius + Math.sin(circles[i].r * Math.PI) * (endRadius - startRadius)));
        ctx.fillStyle.addColorStop(0, 'hsla(' + circles[i].color + ', 100%, 15%, '+Math.round(Math.min(100, (1-Math.abs(1-circles[i].r*2))*140))+'%)');
        ctx.fillStyle.addColorStop(1, 'hsla(' + circles[i].color + ', 100%, 15%, 0)');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

var interval = setInterval(animate, 1000 / frameRate);

function recolor() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].color = minHue + Math.round(Math.random() * (maxHue - minHue));
    }
}

function livelyPropertyListener(name, val) {
    switch(name) {
        case "numCircles":
            numCircles = val;
            break;
        case "frameRate":
            frameRate = val;
            spdReal = spd / frameRate;
            clearInterval(interval);
            interval = setInterval(animate, 1000 / frameRate);
            break;
        case "minHue":
            minHue = val;
            recolor();
            break;
        case "maxHue":
            maxHue = val;
            recolor();
            break;
        case "spd":
            spd = val / 200;
            spdReal = spd / frameRate;
            break;
        case "startRadius":
            startRadius = val;
            break;
        case "endRadius":
            endRadius = val;
            break;
    }
}
