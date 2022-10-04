/** @type {HTMLCanvasElement} */

// Helper function
function rando(min, max) {
    return Math.random() * (max - min) + min;
}


// Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// Globally initialize variables
var item; 
var wok;
var score;
var running = false;
var rightKey = false;
var leftKey = false;

// Add Event Listeners
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowRight":
            rightKey = true;
            break;
        case "ArrowLeft":
            leftKey = true;
            break;
        default:
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowRight":
            rightKey = false;
            break;
        case "ArrowLeft":
            leftKey = false;
            break;
        default:
            break;
    }
});

// Start Menu
ctx.font = "50px Arial";
ctx.fillText("Pocket Wok", canvas.width / 3.8, canvas.height / 3);
ctx.font = "30px Arial";
ctx.fillText("The Game!", canvas.width / 2.8, canvas.height / 2.4);
ctx.font = "15px Arial";
ctx.fillText("Click Anywhere To Begin.", canvas.width / 3.2, canvas.height / 1.5);

// Called on canvas click
function gameToggle() {
    if (!running) {
        running = !running;
        gameInit();
    }
}

// Runs once on setup
function gameInit() {
    // Instantiate Game Objects
    item = new Item(rando(0, 575), -25, 2);
    wok = new Wok(250, 350);
    
    // Initialize values
    score = 0;
    
    // Start Main Game Loop
    gameLoop();
}

// Runs continuously (until lose)
function gameLoop() {
    // Clear Screen Each Frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    // Allows player control
    if (rightKey && wok.x + wok.w < 600) wok.x += wok.speed;
    if (leftKey && wok.x > 0) wok.x -= wok.speed;
    
    // Check for item movement then collision and game over
    item.update();
    collisionCheck();
    gameOverCheck();
    
    // Draw game objects
    item.draw();
    wok.draw();

    // ctx.drawImage(wokImg, wok.x, wok.y, wok.w, wok.h);

    // Keep array of possible object images and randomly select one for itemImg
    // ctx.drawImage(itemImg, item.x, item.y, item.w, item.h);

    
    // End game if not supposed to be running
    if (!running) {
        return;
    }

    // Keep Score in top left
    ctx.font = "20px Arial";
    ctx.fillText(`Ingredients caught: ${score}`, 10, 30);
    
    // Repeat Game Loop
    requestAnimationFrame(gameLoop);
}

function collisionCheck() {
    // Detects item colliding with wok (Point)
    if (item.x + item.w >= wok.x && item.x <= wok.x + wok.w && item.y + item.h >= wok.y) {
        // Increment Score and update UI
        score += 1;
        
        // increase speed every 5 points scored (Runs once on game)
        if (score % 5 == 0) {
            console.log("Speed Up");
            item.grav += 0.5;
        }
        
        // Reset item to top w/ random x
        item.y = -25;
        item.x = rando(0, 575);
    }
}

function gameOverCheck() {
    // Detects an item going past the wok (Game Over)
    if (item.y > canvas.height) {
        // Game Over Menu
        ctx.font = "45px Arial";
        ctx.fillText("You Are A Loser!", canvas.width / 5.2, canvas.height / 3);
        ctx.font = "25px Arial";
        ctx.fillText(`You caught ${score} ingredients, pitiful.`, canvas.width / 6.5, canvas.height / 2.4);
        ctx.font = "15px Arial";
        ctx.fillText("Press Spacebar To Play Again.", canvas.width / 3.6, canvas.height / 1.5);
        
        // Add space to replay Listener;
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case(' '):
                    gameToggle();
                    break;
            }
        })


        // Falsifies running bool and exits out of gameLoop
        running = false;
        return;
    }
}
