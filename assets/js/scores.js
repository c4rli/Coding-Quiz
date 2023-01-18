
var highscoresEl = document.querySelector("#highscores");
var highscores = JSON.parse(localStorage.getItem("highscores1"));

function displayHighscores() {

    highscoresEl.innerHTML = ('');
    highscores.forEach( function(values, i) {
        var entry = document.createElement("ul");
        entry.textContent = (`${values[0]} - ${values[1]}`);
        highscoresEl.appendChild(entry); 
    });

    
}

function resetScores () {
    localStorage.setItem("highscores1", []);
    window.location.href = 'index.html';
}

displayHighscores();

