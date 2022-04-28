var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, boy_running;
var ground, invisibleGround, groundImage,background;

var obstacleimg;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var  bg



function preload(){
   boy_running = loadAnimation("boy_runner1.png","boy_runner2.png","boy_runner3.png","boy_runner4.png","boy_runner5.png","boy_runner6.png","boy_runner7.png","boy_runner8.png",);
 
  
  groundImage = loadImage("ground2.png");
  
  backgroundimg= loadImage("background.png");
  
  obstacleimg = loadImage("obstacle.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  
}

function setup() {
    createCanvas(windowWidth,windowHeight);
   bg = createSprite(width/2,height/2,width,height)
   bg.addImage(backgroundimg)

  runner = createSprite(50,height-70,20,50);
  runner.addAnimation("running", boy_running);
  

  //runner.scale = 0.5;
  
  ground = createSprite(width/2,height-50,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(width/2,height-40,width,10);
  invisibleGround.visible = false;
  
  
  
  //runner.setCollider("rectangle",0,0,trex.width,trex.height);
 // runner.debug = true
  
  score = 0;
 
}

function draw() {
    background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
   // if(score>0 && score%100 === 0){
     //  checkPointSound.play() 
  //  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& runner.y >= height-80) {                           
        runner.velocityY = -12;
        //jumpSound.play();
    }
    
   
    runner.velocityY = runner.velocityY + 0.8
  
    
    
    spawnObstacles();
    
   // if(obstacle.isTouching(runner)){
       // runner.velocityY = -12;
        //jumpSound.play();
       // gameState = END;
       // dieSound.play()
      
   // }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
     // runner.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      runner.velocityY = 0
      
     
      
    obstacle.setLifetimeEach(-1);
    
     
     obstacle.setVelocityXEach(0);
     

     if(mousePressedOver(restart)) {
      reset();
    } 
        
   }
  
 
  
  runner.collide(invisibleGround);

  
  


  drawSprites();
}

function reset(){
  gameState= PLAY;
  obstacle.destroyEach();
 // runner.changeAnimation("running",_running);
  score=0;
  


 
}
function spawnObstacles(){
    if (frameCount % 60 === 0){
       obstacle = createSprite(400,height-120,10,40);
       obstacle.addImage(obstacleimg)
      obstacle.velocityX = -(6+score/200);
   
      
                  
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
     
      // obstaclesGroup.add(obstacle);
    }
   }
   
   