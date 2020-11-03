var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var aliasInput = document.getElementById("initials");
var highScoresEl = document.getElementById("highScores");
timeEl.textContent = 0;

var secondsLeft = 75;
var finalTime;
var scoreList = [];

var retrievedScores = localStorage.getItem("scores");
if (retrievedScores !== null) {
    scoreList = JSON.parse(retrievedScores);
}

class HighScore {
    constructor(initials, points) {
        this.initials = initials;
        this.points = points;
    }
}

function hide(visible) {
    document.getElementById(visible).classList.remove("revealed");
    document.getElementById(visible).classList.add("hidden");
}

function reveal(hidden) {
    document.getElementById(hidden).classList.remove("hidden");
    document.getElementById(hidden).classList.add("revealed");
}

function answerFeedback(accuracy) {
    reveal(accuracy);
    var displayTime = 3;
    var timeInterval1 = setInterval(function() {
        displayTime--;

        if (displayTime === 0) {
            clearInterval(timeInterval1);
            hide(accuracy);
        }
    }, 1000);
}

function answerCheck(evt, ans, prevSection, nextSection) {
    if (evt.target.matches("button") && !evt.target.matches("li")) {
        hide(prevSection);
        reveal(nextSection);
        var ansIndex = evt.target.parentElement.getAttribute("id");
        ansID = ans.toString();
        if (ansIndex === ansID) {
            answerFeedback("correct");
        }
        else {
            answerFeedback("incorrect");
            secondsLeft = secondsLeft - 10;
        }
    } else {
        return;
    }
}

function storeScores() {
    var stringifiedScores = JSON.stringify(scoreList);
    localStorage.setItem("scores", stringifiedScores);
}

document.getElementById("start").addEventListener("click", function(event) {
    event.preventDefault();
    hide("startSection");
    reveal("question1");
    timeEl.textContent = secondsLeft;
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        document.getElementById("answers4").addEventListener("click", function(event) {
            event.preventDefault();
            if (event.target.matches("button") && !event.target.matches("li")) {
                finalTime = secondsLeft;
                timeEl.textContent = finalTime;
                scoreEl.textContent = finalTime;
                clearInterval(timeInterval);
            }
        })

        if (secondsLeft === 0) {
            finalTime = 0;
            timeEl.textContent = finalTime;
            clearInterval(timeInterval);
            hide("question1");
            hide("question2");
            hide("question3");
            hide("question4");
            reveal("endSection");
        }
    }, 1000);
});

document.getElementById("answers1").addEventListener("click", function(event) {
    event.preventDefault();
    answerCheck(event, 2, "question1", "question2");
});

document.getElementById("answers2").addEventListener("click", function(event) {
    event.preventDefault();
    answerCheck(event, 2, "question2", "question3");
});

document.getElementById("answers3").addEventListener("click", function(event) {
    event.preventDefault();
    answerCheck(event, 3, "question3", "question4");
});

document.getElementById("answers4").addEventListener("click", function(event) {
    event.preventDefault();
    answerCheck(event, 0, "question4", "endSection");
});

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    var alias = aliasInput.value.trim();
    if (alias === "") {
        return;
    }

    aliasInput.value = "";
    var scoreEntry = new HighScore(alias, finalTime);
    scoreList.push(scoreEntry);
    scoreList.sort(function(a,b) {return b.points - a.points});
    storeScores();
    window.location.href='./highScorePage.html';
});