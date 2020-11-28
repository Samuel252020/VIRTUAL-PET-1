var dog;
var dataBase;
var foodS, foodStock;
var DogImg, DogHappyImg;
var gameState = "play";

function preload() {
  DogImg = loadImage("images/dogImg.png");
  DogHappyImg = loadImage("images/dogImg1.png"); 
}

function setup() {
  createCanvas(500, 500);

  dataBase = firebase.database();
  foodStock = dataBase.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(width/2, height/2, 0, 0);
  dog.addImage(DogImg);
  dog.scale = 0.4;
}


function draw() {
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW) && gameState == "play"){
    writeStock(foodS);
    dog.addImage(DogHappyImg);
    dog.scale = 0.4;
  }

  drawSprites();
  textSize(15);
  fill("white");
  textAlign(CENTER);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", width/2, 20);
  fill("white");
  textSize(15)
  text("food remaining: "+foodS, width/2, 40);


  if(foodS == 0){
    gameState = "end";
    textSize(20);
    text("Press 'Space' to restart the game!!", width/2 , height-10);
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;     
  }else{
    x = x-1;
  }
  dataBase.ref('/').update({
    Food:x
  })
}

function keyPressed(){
  if (keyCode === 32 && gameState == "end"){
    dataBase.ref('/').update({
      Food:20
    })
  dog.addImage(DogImg);
  dog.scale = 0.4;  
  gameState = "play";
  }
}


