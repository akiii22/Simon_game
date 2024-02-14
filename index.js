let btnColour = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickPattern = [];
let start = false;
let level = 0;
$(document).keydown(function(){
  if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
})

$(".btn").on("click", function (){
  let userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickPattern.length-1);
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
    console.log("success");
    if(userClickPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000)
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}


function nextSequence(){
  userClickPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = btnColour[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
