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
    ctx.rect(0, 0, 1200, 700);
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
        // case 65:
        // player2.moveLeft()
        // break;
        case 87:
        player2.moveUp()
        break;
        // case 68:
        // player2.moveRight()
        // break;
        case 83:
        player2.moveDown()
        break;  
    }   
}

function ballCollision() {
    if((ball.x + ball.w) >= player1.x &&
        (ball.y + ball.h) >= player1.y &&
        ball.x <= (player1.x + player1.w) &&
        ball.y <= (player1.y + player1.h))
        ball.directionx = ball.directionx * -1;
    if((ball.y + ball.h) >= player1.y &&
        (ball.x + ball.h) >= player1.x &&
        ball.y <= (player1.y + player1.h) &&
        ball.x <= (player1.x + player1.w))
        ball.directiony = ball.directiony * -1;
    if((ball.x + ball.w) >= player2.x &&
        (ball.y + ball.h) >= player2.y &&
        ball.x <= (player2.x + player2.w) &&
        ball.y <= (player2.y + player2.h))
        ball.directionx = ball.directionx * -1;
    if((ball.y + ball.h) >= player2.y &&
        (ball.x + ball.h) >= player2.x &&
        ball.y <= (player2.y + player2.h) &&
        ball.x <= (player2.x + player2.w))
        ball.directiony = ball.directiony * -1;
}
    
const player1 = new Square(ctx, 1180, 680, 40, 150, "red")
const player2 = new Square(ctx, 20, 20, 40, 150, "blue")
const ball = new Square(ctx, 600, 350, 50, 50, colorRNG())

// create multiple squares at once
// const squares = [
//     new Square(ctx, 30, 30, 50, 50, colorRNG()),
//     new Square(ctx, 30, 30, 50, 50, colorRNG()),
//     new Square(ctx, 30, 30, 50, 50, colorRNG())
// ]
            
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
    ballCollision();

    // multiple squares for loop
    // for(let square of squares) {
    //     square.draw();
    //     square.move();
    //     square.ballBorderDetection(c.width, c.height) 
    // }
}, 1000/60);
