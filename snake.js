//board
var boxsize = 24;
var rows = 30;
var column = 50;
var board;
var context;
var score = 0;
var audio1 = new Audio('./Music/themeMusic.mp3');
var audio2 = new Audio('./Music/collision.mp3');
var audio3 = new Audio('./Music/Gameover.mp3');
var audio4 = new Audio('./Music/turn.mp3');
var audio5 = new Audio('./Music/highscore.mp3');
var highscore = 0;
var previousHighScore = localStorage.getItem("highScore") || 0; // Retrieve previous high score from local storage
// snake 
var snakex = boxsize * 5;
var snakey = boxsize * 5;
//snake speed so it can move 
var velocityx = 0;
var velocityy = 0;
//snake body is array
var snakeBody = [];
// ball
var ballx;
var bally;
//gameover
var gameOver = false;
//windows onload function
window.onload = function () {
    startGame();
    document.addEventListener("keyup", work);
}
//Animates the button press of the difficulty button
/*$("#easy").on("click", E);
$("#medium").on("click", M);
$("#hard").on("click", H);
function E() {
    $("#easy ").addClass("pressed");
    setTimeout(function () {
        $("#easy").removeClass("pressed");
    }, 100);
    
}
function M() {
    $("#medium").addClass("pressed");
    setTimeout(function () {
        $("#medium").removeClass("pressed");
    }, 100);
}
function H() {
    $("#hard").addClass("pressed");
    setTimeout(function () {
        $("#hard").removeClass("pressed");
    }, 100);
}
*/


//to change level of the game
  
function startGame() {

    board = document.getElementById("board");
    board.height = rows * boxsize;
    board.width = column * boxsize;
    context = board.getContext("2d");
    highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from local storage
    $(".high-score").text("High Score:" + highScore); //display high score

}

function work(event) {
     //for dawing on the board
    if (event.key === "Enter") {                                                                           
        placeBall();
        $("#level-title").text("Lets Play");
        audio3.pause();
        audio3.currentTime = 0;
        audio1.play();
        audio1.loop = true;
        document.removeEventListener("keyup", work);
        document.addEventListener("keyup", movement);
          
}
//every100sec it is going to run thr update function to update the canvas with the input
        setInterval(update, 100);
    }                          

//update function will make the canvas and fill its value
function update() {
    if (gameOver) {
        document.addEventListener("keyup", function (event) {

            if (event.key === "Enter") {
                $("#level-title").text("Lets Play");
                velocityx = 0;
                velocityy = 0;
                snakex = boxsize * 5;
                snakey = boxsize * 5;
                placeBall();
                gameOver = false;
                audio3.pause();
                audio3.currentTime = 0;
                audio1.play();
                audio1.loop = true;
            }
        });
        document.removeEventListener("keyup", function (event) { });
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    //intialise the ball
    var grd1 = context.createRadialGradient(75, 50, 5, 90, 60, 100);
grd1.addColorStop(0, "#FEF2BF");
grd1.addColorStop(1, "red");
    context.fillStyle = grd1;
    context.beginPath();
    context.arc(ballx, bally, boxsize/2, 0, 2 * Math.PI);
    context.fill();
    //to check when the snake collide with ball
    if (snakex == ballx && snakey == bally) {
        snakeBody.push([ballx, bally]);
        score += 10;
    $(".score").text("Score: " + score);
        audio2.play();
        placeBall();
        if (score > previousHighScore) {
            audio5.play();
          }

    }
    //movement of snake body after addition to its body
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; 
   //we are giving coordinates of first coordinate to the second coordinate so that it can move along
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakex, snakey];
    }
    //intialize the snake 
    var grd = context.createLinearGradient(0, 0, 1920, 1080);
    grd.addColorStop(1, "#2e1a47");
    grd.addColorStop(0, "#e0457b");
    context.fillStyle = grd;
    snakex += velocityx * boxsize;
    snakey += velocityy * boxsize;
    context.beginPath();
    context.arc(snakex, snakey, boxsize/2, 0, 2 * Math.PI);
    context.fill();
    //draw snake body
    for (var i = 0; i < snakeBody.length; i++) {
        context.beginPath();
        context.arc(snakeBody[i][0], snakeBody[i][1], boxsize/2,0, 2 * Math.PI );
        context.fill();
    }
    //game over condition are if you go out of bounds or
    if (snakey < 0 || snakex > column * boxsize || snakex < 0 || snakey > rows * boxsize) {
        gameOver = true;
        audio1.pause();
        audio1.currentTime = 0;
        audio3.play();
        snakeBody = [];
        $("#level-title").text("Game Over press Enter to restart");
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); // Store high score in local storage
            $(".high-score").text("High Score:" + highScore); // Update high score display
             score= 0;
        }
        score= 0;
        $(".score").text("Score: " + score); 
    }
    for (var i = 0; i < snakeBody.length; i++) {
        if (snakex == snakeBody[i][0] && snakey == snakeBody[i][1]) {
            gameOver = true;
            audio1.pause();
            audio1.currentTime = 0;
            audio3.play();
            snakeBody = [];
            $("#level-title").text("Game Over press Enter to restart");
            gameOver = true;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore); // Store high score in local storage
                $(".high-score").text("High Score:" + highScore); // Update high score display
                score= 0;
            }
            score= 0;
            $(".score").text("Score: " + score);
          
        }
    }

}
//function for the movemment of the snake in a direction
function movement(key) {

    if (key.code == "ArrowUp" && velocityy != 1) {

        velocityx = 0;
        velocityy = -1;
        audio4.play();

    }
    else if (key.code == "ArrowDown" && velocityy != -1) {

        velocityx = 0;
        velocityy = 1;
        audio4.play();
    }

    else if (key.code == "ArrowRight" && velocityx != -1) {

        velocityx = 1;
        velocityy = 0;
        audio4.play();
    }

    else if (key.code == "ArrowLeft" && velocityx != 1) {

        velocityx = -1;
        velocityy = 0;
        audio4.play();
    }
}
//function to put ball in random place
function placeBall() {
    ballx = Math.floor(Math.random() * column) * boxsize;
    bally = Math.floor(Math.random() * rows) * boxsize;

}