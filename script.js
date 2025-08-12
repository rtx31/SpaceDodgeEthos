let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let ballRadius = 20;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = 0 - ballRadius;
let ballSpeed = 2;

let score = 0;

let logoImg = new Image();
logoImg.src = "logo.png";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", touchHandler, false);
document.addEventListener("touchmove", touchHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function touchHandler(e) {
    let touchX = e.touches[0].clientX - canvas.offsetLeft;
    paddleX = touchX - paddleWidth / 2;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.drawImage(logoImg, ballX - ballRadius, ballY - ballRadius, ballRadius * 2, ballRadius * 2);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 8, 20);
}

function resetBall() {
    ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
    ballY = 0 - ballRadius;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    ballY += ballSpeed;

    if (ballY + ballRadius > canvas.height - paddleHeight &&
        ballX > paddleX && ballX < paddleX + paddleWidth) {
        score++;
        resetBall();
    } else if (ballY - ballRadius > canvas.height) {
        score = 0;
        resetBall();
    }

    requestAnimationFrame(draw);
}

draw();
