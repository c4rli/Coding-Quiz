var highscoresEl = document.querySelector("#highscores");

function loadHighscores() {
if (localStorage.getItem("highscoresStorage") == '' || localStorage.getItem("highscoresStorage") === null) {
    highscores = [];
}else {
    highscores = JSON.parse(localStorage.getItem("highscoresStorage"));
}
}
function displayHighscores() {

    highscoresEl.innerHTML = ('');
    if(!highscores == []){
    highscores.forEach( function(values, i) {
        var entry = document.createElement("li");
        entry.textContent = (`${values[0]} - ${values[1]}`);
        highscoresEl.appendChild(entry); 
    });
}
    
}

function resetScores () {
    var emptyArray = [];
    localStorage.setItem("highscoresStorage", emptyArray);
    alert("Scores Cleared!")
}

loadHighscores();
displayHighscores();

