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

function player1Move(e) {
    switch(e.keyCode) {
        case 37:
        player1.moveLeft()
        break;
        case 38:
        player1.moveUp()
        break;
        case 39:
        player1.moveRight()
        break;
        case 40:
        player1.moveDown()
        break;  
    }   
}

function player2Move(e) {
    switch(e.keyCode) {
        case 65:
        player2.moveLeft()
        break;
        case 87:
        player2.moveUp()
        break;
        case 68:
        player2.moveRight()
        break;
        case 83:
        player2.moveDown()
        break;  
    }   
}
    
const player1 = new Square(ctx, 480, 480, colorRNG())
const player2 = new Square(ctx, 10, 10, colorRNG())
const ball = new Square(ctx, 40, 40, colorRNG())

const squares = [
    new Square(ctx, 30, 30, colorRNG()),
    new Square(ctx, 30, 30, colorRNG()),
    new Square(ctx, 30, 30, colorRNG())
]
            
setInterval(() => {
    clear();
    window.addEventListener("keydown", player1Move, false);
    window.addEventListener("keydown", player2Move, false);
    player1.draw();
    player2.draw();
    ball.draw();
    ball.move();
    player1.playerBorderDetection(c.width, c.height);
    player2.playerBorderDetection(c.width, c.height);
    ball.ballBorderDetection(c.width, c.height);
    for(let square of squares) {
        square.draw();
        square.move();
        square.ballBorderDetection(c.width, c.height) 
    }
}, 1000/60);
