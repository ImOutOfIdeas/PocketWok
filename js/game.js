/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

items = [];

function rando(min, max) {
    return Math.random() * (max - min) + min;
}

var shrimp = new Item(rando(0, 575), 0);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    shrimp.update();
    shrimp.draw();

    if (shrimp.y > canvas.height) {
        shrimp.y = -25;
        shrimp.x = rando(0, 575);
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();