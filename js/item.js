class Item {
    constructor(x, y, grav) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.grav = grav;
    }
    update() {
        this.y += this.grav;
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}