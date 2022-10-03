class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grav = 8;
    }
    update() {
        this.y += this.grav;
    }
    draw() {
        ctx.fillRect(this.x, this.y, 25, 25);
    }
}