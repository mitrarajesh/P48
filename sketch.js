var PLAY = 1;
var END = 0;
var gameState = PLAY;

var speed = 5
var score = 0;
var highScore = 0;

var bgimg;
var foodimg;
var restartimg;
var gameoverimg;

var snake;
var edges;
var fruit;

var horizontal = false;
var vertical = false;

var snakesize = 30;

function preload() {
    bgimg = loadImage("grass.jpg");
    foodimg = loadImage("pear.png");
    restartimg = loadImage("restart.png");
    gameoverimg = loadImage("game-over.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    snake = createSprite(width/2,height/2,30,30);
    edges = createEdgeSprites();
    fruit = createSprite(200, 200, 30, 30);
    fruit.addImage(foodimg);
    fruit.scale = 0.0065;
    restart = createSprite(width/2,height/2 + 50);
    restart.addImage(restartimg);
    restart.scale = 0.1;
    gameover = createSprite(width/2,height/2 - 50);
    gameover.addImage(gameoverimg);
    gameover.scale = 0.5
}

function draw() {
    background(bgimg);
    snake.shapeColor = "purple";
    textSize(12);
    fill("white");
    text("Score: " + score, windowWidth-150, 25)
    text("High Score: " + highScore, windowWidth-150, 45);
    if (gameState == PLAY){
        restart.visible = false;
        gameover.visible = false;
        if (keyIsDown(LEFT_ARROW)){
            snake.velocityX = -(speed);
            snake.velocityY = 0;
            horizontal = true;
            //vertical = false;
        }
        if (keyIsDown(RIGHT_ARROW)){
            snake.velocityX = speed;
            snake.velocityY = 0;
            horizontal = true;
            //vertical = false;
        }
        if (keyIsDown(UP_ARROW)){
            snake.velocityY = -(speed);
            snake.velocityX = 0;
            horizontal = false;
            vertical = true;
        }
        if (keyIsDown(DOWN_ARROW)){
            snake.velocityY = speed;
            snake.velocityX = 0;
            horizontal = false;
            vertical = true;
        }
        if(snake.isTouching(fruit)){
            fruit.x = random(100, width-100);
            fruit.y = random(100, height-100);
            speed += 1;
            score += 1;
        }
        if(snake.isTouching(fruit) && horizontal){
            snakesize += 10;
            snake.width = snakesize;
            //snake.height = 30;
            console.log('snakesize')
        }
        if(snake.isTouching(fruit) && vertical){
            snakesize += 10;
            snake.height = snakesize;
            snake.width = 30;
        }

        if(snake.collide(edges)){
            gameState = END; 
        }
    }
    if (gameState == END){
        restart.visible = true;
        gameover.visible = true;
        snake.velocityX = 0;
        snake.velocityY = 0;
        speed = 0;
    }
    if(mousePressedOver(restart) && gameState === END) {
        reset();
    }
    drawSprites();
}

function reset(){
    gameState = PLAY;
    snake.x = width/2;
    snake.y = height/2;
    speed = 5;
    if (highScore > score) {
      highScore = highScore;
    }
    else { 
      highScore = score;
    }
    score = 0;
  }