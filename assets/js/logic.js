// Global variables
var currentQuestion = 0;
var timer = 60;
var score = 0;
var highscores = []; 


if (localStorage.getItem("highscores1") === null) {
    highscores = [];
}else {
    highscores = JSON.parse(localStorage.getItem("highscores1"));
}


//DOM variables 

var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

var questionTitle = document.querySelector("#question-title");
var questionOptions = document.querySelector("#choices");

var inputInitials = document.querySelector("#initials");
var submitScore = document.querySelector("#submit");

// var highscoresEl = document.querySelector("#highscores");

function playGame() {
    startScreen.setAttribute("class","hide");
    questionsScreen.removeAttribute("class", "hide");
    displayQuestion();
}

function displayQuestion() {
    questionOptions.innerHTML = ('');
    var options = document.createElement("ul");
    
    questionTitle.textContent = questions[currentQuestion].question;
    
    questions[currentQuestion].choices.forEach( function(choice, i) {
        var option = document.createElement("button");
        option.textContent = choice;
        options.appendChild(option); 
    })
    questionOptions.appendChild(options);
}   

// function displayHighscores() {

//     highscoresEl.innerHTML = ('');
//     highscores.forEach( function(values, i) {
//         var entry = document.createElement("ul");
//         entry.textContent = values;
//         highscoresEl.appendChild(entry); 
//     });

//     // window.location.href = 'highscores.html';
// }

function gameOver() {
    alert("game Over");
    questionsScreen.setAttribute("class","hide");
    endScreen.removeAttribute("class", "hide");
}

function nextQuestion() {
    if (currentQuestion == questions.length){
        gameOver();
    }
    else {
        
        displayQuestion();
    }
}

questionOptions.addEventListener("click", function(event) {
    var element = event.target;
  
    if (element.matches("button")) {
      var state = element.textContent;
      var answerIndex = questions[currentQuestion].answer;

        if (state == questions[currentQuestion].choices[answerIndex])
        {
            alert("Correct");
        }
        else {
            alert("Wrong");
        }
        currentQuestion++;
        nextQuestion();
    }
  });

  submitScore.addEventListener("click", function(event) {
    var playerScore = score;
    var playerInitials = inputInitials.value;
    var scoreArray = [];
    scoreArray.push(playerInitials);
    scoreArray.push(playerScore);
    highscores.push(scoreArray);

    localStorage.setItem("highscores1", JSON.stringify(highscores));

    // displayHighscores();
    // alert();
    window.location.href = 'highscores.html';
  });
