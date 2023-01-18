// Global variables
var currentQuestion = 0;
var timer = 150;
var score = 0;
var countdownTime;
var timerEl;

//DOM variables 

var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

var questionTitle = document.querySelector("#question-title");
var questionOptions = document.querySelector("#choices");

var inputInitials = document.querySelector("#initials");
var submitScore = document.querySelector("#submit");
var time = document.querySelector("#time");

loadHighscores();

// var highscoresEl = document.querySelector("#highscores");
time.textContent = timer;

function loadHighscores() {
    if (localStorage.getItem("highscoresStorage") == '' || localStorage.getItem("highscoresStorage") === null) {
        highscores = [];
    }else {
        highscores = JSON.parse(localStorage.getItem("highscoresStorage"));
    }
    }

function playGame() {
    startScreen.setAttribute("class","hide");
    questionsScreen.removeAttribute("class", "hide");
    
    countdownTimer(timer);

    // var interval = setInterval(function() {
    //     if (timer > 0) {
    //         time.textContent = timer;
    //         timer--;
    //     } else {
    //         gameOver();
    //         clearInterval(interval);
    //     }
    // }, 1000);

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
    score = timer;
    clearInterval(timerEl);
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

function countdownTimer(seconds) {
    // var count = seconds;
    timerEl = setInterval(function() {
        if (timer > 0) {
            // timer = count;
            time.textContent = timer;
            timer--;
        } else {
            gameOver();
            clearInterval(timerEl);
        }
    }, 1000);
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
            timer -=10;
            alert("Wrong");
        }
        currentQuestion++;
        nextQuestion();
    }
  });

  submitScore.addEventListener("click", function(event) {
    var playerScore = score;
    var playerInitials = inputInitials.value;
    // var scoreArray = [];
    // scoreArray.push(playerInitials);
    // scoreArray.push(playerScore);
    highscores.push([playerInitials,playerScore]);

    localStorage.setItem("highscoresStorage", JSON.stringify(highscores));

    // displayHighscores();
    // alert();
    window.location.href = 'highscores.html';
  });
