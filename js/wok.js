class Wok {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 140;
        this.h = 40;
        this.speed = 12;
        this.rightKey = false;
        this.leftKey = false;
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

