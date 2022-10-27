// canvas
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

// set variables
let playerScoreId = document.getElementById("player1Score");
let computerScoreId = document.getElementById("computerScore");
let playerScore = 0;
let computerScore = 0;
let sharp = 5;
let posX = (Math.floor(Math.random()*5) + 2);
let posY = (Math.floor(Math.random()*5) + 2);

// create game objects
const player1 = new Square(ctx, 40, 20, 20, 150, 0, 0, "blue");
const computer = new Square(ctx, 1150, 680, 20, 150, 0, 0, "red");
let ball = new Ball(ctx, 600, 350, 30, posX, posY, colorRNG());

// random ball color
function colorRNG() {
    let letter = "0123456789abcdef";
    let color = "#";
    for(let i=0; i < 6; i++) {
        color += letter[Math.floor(Math.random()*16)];
    }
    return color;
}

// screen refresh
function clear () {
    // background
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(0, 0, 1200, 700);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();

    // mid line
    ctx.beginPath();
    ctx.rect(600, 0, 20, 700);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
}

// player 1 command
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

// player 2 command
// function player2Move(e) {
//     switch(e.keyCode) {
//         case 65:
//         computer.moveLeft();
//         break;
//         case 87:
//         computer.moveUp();
//         break;
//         case 68:
//         computer.moveRight();
//         break;
//         case 83:
//         computer.moveDown();
//         break;  
//     }   
// }

// ball collision detection
function ballCollision() {
    if((ball.x + ball.r) > player1.x &&
        (ball.x - ball.r) < (player1.x + player1.w) &&
        (ball.y + ball.r) > player1.y &&
        (ball.y - ball.r) < (player1.y + player1.h)) {
        ball.directionx = ball.directionx * -1;
        ball.directionx += 0.5;
        ball.directiony += 0.5;
    }
    if((ball.x + ball.r) > computer.x &&
        (ball.x - ball.r) < (computer.x + computer.w) &&
        (ball.y + ball.r) > computer.y &&
        (ball.y - ball.r) < (computer.y + computer.h)) {
        ball.directionx = ball.directionx * -1;
        ball.directionx -= 0.5;
        ball.directiony -= 0.5;
        sharp -= 1;
    }
}

// computer ball tracking
function ballTracker() {
    if((computer.y + sharp) > (ball.y + ball.r)) computer.y -= 8;
    if(((computer.y + computer.h) - sharp) < ball.y) computer.y += 8;
}

// score
function goal(width) {
    posX = (Math.floor(Math.random()*5) + 2);
    posY = (Math.floor(Math.random()*5) + 2);
    if((ball.x + ball.r) >= (width + 10)) {
        ball = new Ball(ctx, 600, 350, 30, -posX, -posY, colorRNG());
        playerScore += 1;
        sharp = 5;
        // clearInterval(interval)
    }
    if((ball.x - ball.r) <= (0 - 10)) {
        ball = new Ball(ctx, 600, 350, 30, posX, posY, colorRNG());
        computerScore += 1;
        sharp = 5;
        // clearInterval(interval)
    }
}

// create multiple squares at once
// const squares = [
//     new Square(ctx, 30, 30, 50, 50, colorRNG()),
//     new Square(ctx, 30, 30, 50, 50, colorRNG()),
//     new Square(ctx, 30, 30, 50, 50, colorRNG())
// ]
       
// game loop
const interval = setInterval(() => {
    clear();
    console.log("sharp : " + sharp);
    console.log("ball dirX : " + ball.directionx);
    console.log("ball dirY : " + ball.directiony);
    playerScoreId.style.color = "blue";
    computerScoreId.style.color = "red";
    playerScoreId.innerHTML = playerScore;
    computerScoreId.innerHTML = computerScore;
    window.addEventListener("keydown", player1Move, false);
    // window.addEventListener("keydown", player2Move, false);
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
