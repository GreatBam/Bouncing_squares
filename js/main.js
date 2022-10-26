const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const posx = Math.floor(Math.random()* 5)
const posy = Math.floor(Math.random()* 5)
let playerScoreId = document.getElementById("player1Score");
let computerScoreId = document.getElementById("computerScore");

let playerScore = 0;
let computerScore = 0;

const player1 = new Square(ctx, 40, 20, 20, 150, "red");
const computer = new Square(ctx, 1150, 680, 20, 150, "blue");
const ball = new Square(ctx, 600, 350, 50, 50, colorRNG());

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
        // case 37:
        // player1.moveLeft();
        // break;
        case 38:
        player1.moveUp();
        break;
        // case 39:
        // player1.moveRight();
        // break;
        case 40:
        player1.moveDown();
        break;  
    }   
}

function computerMove(e) {
    switch(e.keyCode) {
        // case 65:
        // computer.moveLeft();
        // break;
        case 87:
        computer.moveUp();
        break;
        // case 68:
        // computer.moveRight();
        // break;
        case 83:
        computer.moveDown();
        break;  
    }   
}

function ballCollision() {
    if((ball.x + ball.w) > player1.x &&
        ball.x < (player1.x + player1.w) &&
        (ball.y + ball.h) > player1.y &&
        ball.y < (player1.y + player1.h))
        ball.directionx = ball.directionx * -1;
    // if((ball.y + ball.h) > player1.y &&
    //     ball.y < (player1.y + player1.h) &&
    //     (ball.x + ball.h) > player1.x &&
    //     ball.x < (player1.x + player1.w))
    //     ball.directiony = ball.directiony;
    if((ball.x + ball.w) > computer.x &&
        (ball.y + ball.h) > computer.y &&
        ball.x < (computer.x + computer.w) &&
        ball.y < (computer.y + computer.h))
        ball.directionx = ball.directionx * -1;
    // if((ball.y + ball.h) > computer.y &&
    //     (ball.x + ball.h) > computer.x &&
    //     ball.y < (computer.y + computer.h) &&
    //     ball.x < (computer.x + computer.w))
    //     ball.directiony = ball.directiony * -1;
}

function ballTracker() {
    if(computer.y > (ball.y + ball.h)) computer.y -= 10;
    if((computer.y + computer.h) < ball.y) computer.y += 10;
}

function goal(width) {
    if((ball.x + ball.w) >= width) {
        ball.x = 600;
        ball.y = 350;
        computerScore += 1;
    }
    if(ball.x <= 0) {
        ball.x = 600;
        ball.y = 350;
        playerScore += 1;
    }
}
    
// create multiple squares at once
// const squares = [
//     new Square(ctx, 30, 30, 50, 50, colorRNG()),
//     new Square(ctx, 30, 30, 50, 50, colorRNG()),
//     new Square(ctx, 30, 30, 50, 50, colorRNG())
// ]
            
setInterval(() => {
    clear();
    playerScoreId.innerHTML = playerScore;
    computerScoreId.innerHTML = computerScore;
    window.addEventListener("keydown", player1Move, false);
    window.addEventListener("keydown", computerMove, false);
    player1.draw();
    computer.draw();
    ball.draw();
    ball.move();
    player1.playerBorderDetection(c.width, c.height);
    computer.playerBorderDetection(c.width, c.height);
    ball.ballBorderDetection(c.width, c.height);
    ballCollision();
    ballTracker();
    goal(c.width);

    // multiple squares for loop
    // for(let square of squares) {
    //     square.draw();
    //     square.move();
    //     square.ballBorderDetection(c.width, c.height);
    // }
}, 1000/60);
