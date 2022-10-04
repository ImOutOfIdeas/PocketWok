class Item {
    constructor(x, y, grav) {
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;
        this.grav = grav;
    }
    update() {
        this.y += this.grav;
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}