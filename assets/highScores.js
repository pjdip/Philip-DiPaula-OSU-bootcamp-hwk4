var highScoresEl = document.getElementById("highScores");
var scoreList = [];

function init() {
    var retrievedScores = localStorage.getItem("scores");
    if (retrievedScores !== null) {
        scoreList = JSON.parse(retrievedScores);
    }
    renderScores();
}

function renderScores() {
    highScoresEl.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = scoreList[i].initials + " - " + scoreList[i].points;
        li.setAttribute("id", "scoreEntryItem");
        highScoresEl.appendChild(li);
    }
}

init();

document.getElementById("return").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href='./index.html';
});

document.getElementById("clear").addEventListener("click", function(event) {
    event.preventDefault();
    /*
    delete high score list items 
    append list to document
    */
});