const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const posx = Math.floor(Math.random()* 5)
const posy = Math.floor(Math.random()* 5)

function colorRNG() {
    let letter = "0123456789abcdef";
    let color = "#";
    for(let i=0; i < 6; i++) {
        color += letter[Math.floor(Math.random()*16)];
    }
    return color;
}

function clear () {
    ctx.beginPath();
    ctx.rect(0, 0, 500, 500);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();

}

const squares = [
    new Square(ctx, 40, 40, colorRNG()),
    new Square(ctx, 60, 60, colorRNG()),
    new Square(ctx, 80, 80, colorRNG()),
]

setInterval(() => {
    clear();
    for(let square of squares) {
        square.draw();
        square.move();
        square.borderDetection(c.width, c.height);
    }
}, 1000/60);
