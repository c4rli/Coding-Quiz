// Global variables
var currentQuestion = 0;
var timer = 60;
var score = 0;

//DOM variables 

var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

var questionTitle = document.querySelector("#question-title")
var questionOptions = document.querySelector("#choices")

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
  
    // Check if the clicked element was an image
    if (element.matches("button")) {
      // Get the current value of the image's data-state attribute
      var state = element.textContent;
      var answerIndex = questions[currentQuestion].answer;

        if (state == questions[currentQuestion].choices[questions[currentQuestion].answer])
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


