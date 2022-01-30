var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jack, jack_running, jack_jumping, jack_stop;
var jungle,jungleImage;
var netImage;
var trapImage;
var rockImage;
var obstaclesGroup;
var invisibleGround;
var gameOverImg;
var restartImg;


function preload(){
  jack_running = loadAnimation("Images/jack_running_right.png","Images/jack_running_left.png","Images/jack_landing.png");
  
  jungleImage = loadImage("Images/jungle_bg.jpg");
    
  netImage = loadImage("Images/net_trap.png");
  trapImage = loadImage("Images/trap.png");
  rockImage = loadImage("Images/rock.png");

  gameOverImg = loadImage("Images/gameOver.png");

  jack_jumping = loadAnimation("Images/jack_landing.png");
  jack_stop = loadAnimation("Images/jack_running_left.png");

  restartImg = loadImage("Images/restart.png");
}

function setup() {
  createCanvas(1000,473);
    
  jungle = createSprite(615,235,1228,473);
  jungle.addImage("jungle",jungleImage);

  jack = createSprite(90,150,20,50);
  
  jack.addAnimation("running", jack_running);
  
  jack.scale = 0.5;

  invisibleGround = createSprite(90,400,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();

  gameOver = createSprite(500,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4

  restart = createSprite(500,300);
  restart.addImage(restartImg);
  
  jack.setCollider("circle",-10,100,50);
  //jack.debug =true;
  score = 0;
}

function draw() {
  background("green");
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    jungle.velocityX = -7;
     if (jungle.x <= 500){
    jungle.x = 600
   }
   
    score = score + Math.round(frameCount/60);
    
    spawnObstacles();

    if(keyDown("space")&& jack.y >= 250) {
      jack.velocityY = -15;
      jack.changeAnimation("jumping", jack_jumping);
    }
    jack.velocityY = jack.velocityY + 0.7

    if(obstaclesGroup.isTouching(jack)){
      gameState = END;
    }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  obstaclesGroup.visible = false;
  jack.visible = false;

  jungle.velocityX = 0;
  jack.changeAnimation("stopping", jack_stop);

  obstaclesGroup.setLifetimeEach(0);
  obstaclesGroup.setVelocityXEach(0);

}
jack.collide(invisibleGround);

  drawSprites();
  textSize(20);
  fill("white");
  text("Score: "+ score, 850,50);
}


function spawnObstacles(){
  if(frameCount % 120 === 0){
    var obstacle = createSprite(round(random(615,900)),350,20,20);
    obstacle.scale = 0.3
    obstacle.velocityX = jungle.velocityX;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(netImage);
              break;
      case 2: obstacle.addImage(trapImage);
              break;
      case 3: obstacle.addImage(rockImage);
              break;
      default: break;
    }

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

}
}
