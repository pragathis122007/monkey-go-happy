var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  
   monkey=createSprite(50,180,20,50);
  
   monkey.addAnimation("running", monkey_running);
   monkey.scale=0.15
  
  ground = createSprite(300,180,1200,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("blue");
  text("Score: "+ score, 500,50);
if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
   
    if(keyDown("space") && monkey.y>=120) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnbanana();
    spawnObstacles();
  
   if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+2;
    }
    if(obstaclesGroup.isTouching(monkey)){
       
    gameState=END;
    }
}
  if(gameState===END){
   ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
}

  drawSprites();
}



function spawnbanana() {
  
  if (frameCount % 180 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(50,140);    
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.2 ;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,150,10,40);
    obstacle.velocityX = -3;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.1;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 200;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
