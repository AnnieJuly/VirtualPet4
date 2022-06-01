var dog, dogHappy;
var foodStock,foodS;
var changinggameState, readState,gameState;
var bedroom, garden, washroom;
var feed, addFood;
var lastFed;
var currentTime;
var foodObj,milk;

function preload(){
  dogImg=loadImage("images/Dog.png");
  dogHappy=loadImage("images/Happy.png");
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png")
  livingroom = loadImage("images/Living Room.png")
  sadDog=loadImage("images/Dog.png")
  milk=loadImage("images/milk.png")
}

function setup() {
	database= firebase.database();
  createCanvas(800, 1000);
  dog = createSprite(500,350,10,10);
  dog.addImage("dogImg",dogImg);
  foodS = new Food()
  foodS.getFoodstock();
  foodObj = new Food();
  foodObj.getFoodstock();
  dog.scale=0.15;
  feed = createButton("Feed Dog");
  feed.position(200,50);
  feed.mousePressed(feedDog)
  
  addFood = createButton("Add Food");
  addFood.position(300,50);
  addFood.mousePressed(add);
   
  database.ref('gameState').on("value",function(data){
    gameState=data.val();
  });

 // database.ref('foodStock').on("value",readStock);
 textSize(20); 
}
function draw() {  

  fill("white")
//foodS.display();

  if(gameState!="hungry"){
    feed.hide();
    addFood.hide();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);

  }

  if(gameState===1){
    dog.addImage(dogHappy);
    dog.scale=0.175;
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milk.visibe=false;
    dog.y=250;
  }
var Bath=createButton("I want to take bath");
Bath.position(520,125);
if(Bath.mousePressed(function(){
  gameState=3;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===3){
  background(washroom);
  dog.visible=false;
  milk.visible=false
}
var Sleep=createButton("I am very sleepy");
Sleep.position(660,125);
if(Sleep.mousePressed(function(){
  gameState=4;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===4){
  background(bedroom);
  dog.visible=false;
  milk.visible=false
}
var Play=createButton("Lets Play !");
Play.position(430,125);
if(Play.mousePressed(function(){
  gameState=5;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===5){
  background(livingroom);
  dog.visible=false;
  milk.visible=false
}
var PlayInGarden=createButton("Dig!");
PlayInGarden.position(380,125);
if(PlayInGarden.mousePressed(function(){
  gameState=6;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===6){
  background(garden);
  dog.visible=false;
  milk.visible=false
}
currentTime=hour();
if(currentTime==(foodS.lastFed+1)){
  update("Playing");
  foodS.garden();
}else if(currentTime==(foodS.lastFed+2)){
update("Sleeping");
   foodS.bedroom();
}else if(currentTime>=(foodS.lastFed+2)&&currentTime<=(foodS.lastFed+4)){
   update("Bathing");
   foodS.washroom();
}else{
   update("hungry");
   foodS.display();
 }
  database.ref("time").on("value",function (data){
    foodS.lastFed = data.val();
    
  })
  
  text("Last Fed: "+foodS.lastFed,50,50)
  // text("Food Remaining: "+foodStock,300,150)
  // text("Note: Press UP ARROW To Feed The Dog",200,70);
  
//   if(keyDown(UP_ARROW)){
//      writeStock(foodStock-1);
//      dog.addImage(dogHappy);
//  }  

 drawSprites();
}
 
 function feedDog(){
   foodS.updateFoodstock(foodStock-1);
   database.ref('/').update({time:hour()})
 }

 function add(){
   foodS.updateFoodstock(foodStock+1);
 }
 
 function update(state){
  database.ref('/').update({
    gameState:state});
 }
 //function readStock(data){
       //foodStock=data.val();
 //}
 //function writeStock(x){
  // if(x<=0){
    // x=0;
//    }
//    database.ref('/').update({
//      foodStock:x
//    })
//  }
 