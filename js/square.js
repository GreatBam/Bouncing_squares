class Square {
    constructor(ctx, x, y, fill) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.directionx = Math.floor(Math.random()*5)+1;
        this.directiony = Math.floor(Math.random()*5)+1;
        this.fill = fill;
    }

    move() {
        this.x += this.directionx;
        this.y += this.directiony;
    }

    borderDetection(w, h) {
        if(this.x + this.w >= w) this.directionx = -this.directionx;
        if(this.x <= 0) this.directionx = -this.directionx;
        if(this.y + this.w >= h) this.directiony = -this.directiony;
        if(this.y <= 0) this.directiony = -this.directiony;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.w);
        this.ctx.fillStyle = this.fill;
        this.ctx.fill();
        this.ctx.stroke();
    }
}