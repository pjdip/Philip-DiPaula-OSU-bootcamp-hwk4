var highScoresEl = document.getElementById("highScores");
var scoreList = [];

var retrievedScores = localStorage.getItem("scores");
if (retrievedScores !== null) {
    scoreList = JSON.parse(retrievedScores);
}

highScoresEl.innerHTML = "";
for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = scoreList[i].initials + " - " + scoreList[i].points;
    li.setAttribute("id", i);
    highScoresEl.appendChild(li);
}

document.getElementById("return").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href='./index.html';
});

document.getElementById("clear").addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("scores");
    var scoreLen = highScoresEl.childElementCount;
    for (var j = 0; j < scoreLen; j++) {
        highScoresEl.removeChild(document.getElementById(j.toString()));
    }   
});