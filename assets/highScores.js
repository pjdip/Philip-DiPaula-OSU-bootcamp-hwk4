// grab doc element for manipulation
var highScoresEl = document.getElementById("highScores");

// declaring score list and populating it if there are score items in local storage
var scoreList = [];
var retrievedScores = localStorage.getItem("scores");
if (retrievedScores !== null) {
    scoreList = JSON.parse(retrievedScores);
}

// every time the page is loaded we generate the li fresh, start by clearing the ol
highScoresEl.innerHTML = "";

// loop through the scores
// creating an li for each
// giving it text from the score objects
// and appending them to the ol
for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = scoreList[i].initials + " - " + scoreList[i].points;
    highScoresEl.appendChild(li);
}

// when return button is clicked we move to main page
document.getElementById("return").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href='./index.html';
});

// when clear button is clicked...
document.getElementById("clear").addEventListener("click", function(event) {
    event.preventDefault();

    // local storage is emptied and we loop through the ol, removing all li
    localStorage.removeItem("scores");
    while (highScoresEl.firstChild) {
        highScoresEl.removeChild(highScoresEl.lastChild);
    }
});