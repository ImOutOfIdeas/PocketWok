/** @type {HTMLCanvasElement} */

// Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;

// Width and Height set in css file
canvas.style.width = 600;
canvas.style.height = 400;

// Globally initialize variables
var item; 
var wok;
var score;
var images = ['broccoli.png', 'carrot.png', 'ginger.png', 'onion.png', 'onion2.png', 'shrimp.png'];
var running = false;
var rightKey = false;
var leftKey = false;

// Create Images (Loaded in gameInit then updated in gameLoop)
var wokImg = new Image();
wokImg.src = '../assets/chefwok.png';

var itemImg = new Image();
itemImg.src = `../assets/items/${images[Math.floor(Math.random() * images.length)]}`;

// Draws menu on page load
drawStartMenu();

// Runs once on setup
function gameInit() {    
    // Instantiate Game Objects
    item = new Item(rando(50, canvas.width), -50, 5);
    wok = new Wok(canvas.width / 2, canvas.height - 200);
    
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
    if (rightKey && wok.x + wok.w <= canvas.width) wok.x += wok.speed;
    if (leftKey && wok.x >= 0) wok.x -= wok.speed;
    
    // Check for item movement then collision and game over
    item.update();
    collisionCheck();
    gameOverCheck();
    
    // Draws sprites on updated location each cycle
    ctx.drawImage(wokImg, wok.x - 100, wok.y - 160, wok.w + 200, wok.h + 320);
    ctx.drawImage(itemImg, item.x - 10, item.y - 10, item.w + 10, item.h + 10);
    
    // Draw game objects hitboxes (Debugging)
    // wok.draw();
    // item.draw();
    
    // End game if not supposed to be running
    if (!running) {
        // Game Over Menu
        drawGameoverMenu();
        return;
    }
    
    // Show Score in top left
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Ingredients: ${score}`, 10, 43);
    
    // Repeat Game Loop
    requestAnimationFrame(gameLoop);
}

// Checks if item hits wok
function collisionCheck() {
    // Detects item colliding with wok (Point)
    if (item.x + item.w >= wok.x && item.x <= wok.x + wok.w && item.y + item.h >= wok.y && item.y <= wok.y + wok.h) {
        // Might add bad items (to avoid)
        // If (item == bad) running = false;
        
        // Choses a random item each time if caught
        itemImg.src = `../assets/items/${images[Math.floor(Math.random() * images.length)]}`;
        
        // Increment Score and update UI
        score += 1;
        
        // increase speed every 5 points scored (Runs once on game)
        if (score % 5 == 0) {
            item.grav += 0.6;
            wok.speed += 0.3;
        }
        
        // Reset item to top w/ random x
        item.y = -25;
        item.x = rando(50, canvas.width - 50);
    }
}

// Checks if item hits floor
function gameOverCheck() {
    // Detects an item going past the wok (Game Over)
    if (item.y > canvas.height) {
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

// Menu Functions
function drawStartMenu() {
    drawTextCenter("Pocket Wok", 160, canvas.height / 4, 5);
    drawTextCenter("Use The Arrow Keys To Control The Chef", 50, canvas.height / 1.05, 2);
    drawTextCenter("Click To Start", 60, canvas.height / 3.05, 2);
}

function drawGameoverMenu() {
    drawTextCenter("Game Over", 160, canvas.height / 2.4, 5);
    drawTextCenter(`You Caught ${score} Ingredients`, 50, canvas.height / 2, 1.3);
    drawTextCenter("Press Space Bar Or Click To Play Again", 40, canvas.height / 1.05, 0);
}

// Helper functions
function rando(min, max) {
    return Math.random() * (max - min) + min;
}

function gameToggle() { // Called on canvas click
    if (!running) {
        running = !running;
        gameInit();
    }
}

function drawTextCenter(text, fontSize, yPos, lineW) {
    ctx.fillStyle = "white";
    ctx.stroke = "black";
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(text, (canvas.width / 2) - (ctx.measureText(text).width / 2), yPos);
    
    if (lineW != 0) {
        ctx.lineWidth = lineW;
        ctx.strokeText(text, (canvas.width / 2) - (ctx.measureText(text).width / 2), yPos);
    }
}

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
