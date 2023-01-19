var highscoresEl = document.querySelector("#highscores");

// Get highscores from localstorage to highscores var or set highscores to blank array if localstorage doesnt exist
function loadHighscores() {
    if (localStorage.getItem("highscoresStorage") == '' || localStorage.getItem("highscoresStorage") === null) {
        highscores = [];
    } else {
        highscores = JSON.parse(localStorage.getItem("highscoresStorage"));
    }
}

// Populate ul with elements loaded from localstorage.
function displayHighscores() {

    highscoresEl.innerHTML = ('');
    if (!highscores == []) {
        highscores.forEach(function (values, i) {
            var entry = document.createElement("li");
            entry.textContent = (`${values[0]} - ${values[1]}`);
            highscoresEl.appendChild(entry);
        });
    }
}

// Set the value of localstorage highscores to an empty array
function resetScores() {
    var emptyArray = [];
    localStorage.setItem("highscoresStorage", emptyArray);
    // alert("Scores Cleared!")
    location.reload()
}

// Load or generate highscores and add them to page
loadHighscores();
displayHighscores();

