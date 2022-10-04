class Wok {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 70;
        this.h = 25;
        this.speed = 5;
        this.rightKey = false;
        this.leftKey = false;
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

