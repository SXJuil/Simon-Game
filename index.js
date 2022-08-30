
var buttonColors =  ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var ptr = 0; var started = false;

$(document).keypress(function(){
    if(!started){
        gamePattern = [];
        level = 0; ptr = 0; 
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColor = this.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
    if(ptr === level && ptr !== 0){setTimeout(function(){
        nextSequence();
        ptr = 0;
    },1000);}
    
})

function nextSequence(){
    userPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(buttonColors[randomNumber]);

    $("#level-title").text("Level "+(level+1).toString());

    $('#'+buttonColors[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNumber]);
    level++;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
   $('#'+currentColor).addClass('pressed');
   setTimeout(function(){
    $('#'+currentColor).removeClass('pressed');
   },100);
}

function checkAnswer(){
  if(gamePattern[ptr] === userPattern[ptr]){
      console.log("success"); ptr++;
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass('game-over');
       },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
  }
}
