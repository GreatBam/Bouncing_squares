class Square {
    constructor(ctx, x, y, w, h, fill) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.directionx = 5;
        this.directiony = 5;
        this.fill = fill;
    }

    moveLeft() {
        this.x -= 10;
    }
    moveUp() {
        this.y -= 10;
    }
    moveRight() {
        this.x += 10;
    }
    moveDown() {
        this.y += 10;
    }

    move() {
        this.x += this.directionx
        this.y += this.directiony
    }

    playerBorderDetection(w, h) {
        if(this.x + this.w >= w) this.x -= 10;
        if(this.x <= 0) this.x += 10;
        if(this.y + this.h >= h) this.y = this.y -= 10;
        if(this.y <= 0) this.y += 10;
    }

    ballBorderDetection(w, h) {
        if(this.x + this.w >= w) this.directionx = -this.directionx;
        if(this.x <= 0) this.directionx = -this.directionx;
        if(this.y + this.h >= h) this.directiony = -this.directiony;
        if(this.y <= 0) this.directiony = -this.directiony;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.stroke();
    }
}