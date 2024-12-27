userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence(){
    level++;
    $("h1").text("level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})  

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);    
}

$(document).keypress(function(event){
    nextSequence();
    $(document).off("keypress");
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $body.removeClass("game-over");
        },200)
        $("h1").text("Game Over, Start Again")
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).keypress(function(event){
        nextSequence();
        $(document).off("keypress");
    });
}
var level = 0;
