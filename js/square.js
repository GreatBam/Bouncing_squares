// create squares for players
class Square {
    constructor(ctx, x, y, w, h, directionx, directiony, fill) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.directionx = directionx;
        this.directiony = directiony;
        this.fill = fill;
    }

    moveLeft() {
        this.x -= 20;
    }
    moveUp() {
        this.y -= 20;
    }
    moveRight() {
        this.x += 20;
    }
    moveDown() {
        this.y += 20;
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

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.stroke();
    }
}

// create ball
class Ball {
    constructor(ctx, x, y, r, directionx, directiony, fill) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.sAngle = 0;
        this.eAngle = 2 * Math.PI;
        this.directionx = directionx;
        this.directiony = directiony;
        this.fill = fill;
    }

    move() {
        this.x += this.directionx
        this.y += this.directiony
    }

    ballBorderDetection(w, h) {
        // if((this.x + this.r) >= w) this.directionx = -this.directionx;
        // if((this.x - this.r) <= 0) this.directionx = -this.directionx;
        if((this.y + this.r) >= h) this.directiony = -this.directiony;
        if((this.y - this.r) <= 0) this.directiony = -this.directiony;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.stroke();
    }
}