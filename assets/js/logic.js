// Global variables
var currentQuestion = 0; // keep track of current question 
var timer = 150; // set initial timer value
var score = 0; // keep track of player's score
var countdownTime; // variable to hold countdown time
var timerEl; // variable to hold setInterval() timer

//DOM variables 
//Views on index.html
var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

// Question DOM elements
var questionTitle = document.querySelector("#question-title");
var questionOptions = document.querySelector("#choices");

// End screen DOM elements
var inputInitials = document.querySelector("#initials");
var submitScore = document.querySelector("#submit");
var time = document.querySelector("#time");

// Load highscores on page load.
loadHighscores();
time.textContent = timer;

// Get highscores from localstorage to highscores var or set highscores to blank array if localstorage doesnt exist
function loadHighscores() {
    if (localStorage.getItem("highscoresStorage") == '' || localStorage.getItem("highscoresStorage") === null) {
        highscores = [];
    } else {
        highscores = JSON.parse(localStorage.getItem("highscoresStorage"));
    }
}

// playGame() runs when start quiz button is pressed. Changes the views by hiding relevant elements
// Starts countdown and display question
function playGame() {
    startScreen.setAttribute("class", "hide");
    questionsScreen.removeAttribute("class", "hide");

    countdownTimer(timer);
    displayQuestion();
}

// Clear questions from previous question and replace with unordered list
// Get questions from questions.js and populate correct amount of buttons with text label.
function displayQuestion() {
    questionOptions.innerHTML = ('');
    var options = document.createElement("ul");

    questionTitle.textContent = questions[currentQuestion].question;

    questions[currentQuestion].choices.forEach(function (choice, i) {
        var option = document.createElement("button");
        option.textContent = choice;
        options.appendChild(option);
    })
    questionOptions.appendChild(options);
}

// End game event triggered by reaching last question or time running out.
// Changes view for player to enter initials
function gameOver() {
    score = timer;
    clearInterval(timerEl);
    alert("game Over");
    
    questionsScreen.setAttribute("class", "hide");
    endScreen.removeAttribute("class", "hide");
}

// Check if question completed is the last question
function nextQuestion() {
    if (currentQuestion == questions.length) {
        gameOver();
    }
    else {
        displayQuestion();
    }
}

// Timer that counts down every second, calls gameOver() if reaches 0
function countdownTimer(seconds) {
    timerEl = setInterval(function () {
        if (timer > 0) {
            time.textContent = timer;
            timer--;
        } else {
            gameOver();
            clearInterval(timerEl);
        }
    }, 1000);
}

// Event listener for answer buttons
questionOptions.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
        var state = element.textContent;
        var answerIndex = questions[currentQuestion].answer;

        if (state == questions[currentQuestion].choices[answerIndex]) {
            alert("Correct");
        }
        else {
            timer -= 10;
            alert("Wrong");
        }
        currentQuestion++;
        nextQuestion();
    }
});

// Event listener for highscore submission screen
submitScore.addEventListener("click", function (event) {
    var playerScore = score;
    var playerInitials = inputInitials.value;

    highscores.push([playerInitials, playerScore]);
    localStorage.setItem("highscoresStorage", JSON.stringify(highscores));

    window.location.href = 'highscores.html';
});
