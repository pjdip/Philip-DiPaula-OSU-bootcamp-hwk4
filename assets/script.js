var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var aliasInput = document.getElementById("initials");
var highScoresEl = document.getElementById("highScores");
timeEl.textContent = 0;

var secondsLeft = 75;
var finalTime;
var scoreList = [];

init();

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

function setTime() {
    var timeInterval = setInterval(function() {
        timeEl.textContent = secondsLeft;
        secondsLeft--;

        document.getElementById("answers4").addEventListener("click", function(event) {
            event.preventDefault();
            if (event.target.matches("button")) {
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
}

function answerCheck(evt, ans) {
    if (evt.target.matches("button")) {
        var ansIndex = evt.target.parentElement.getAttribute("id");
        ansID = ans.toString();
        if (ansIndex === ansID) {
            answerFeedback("correct");
        }
        else {
            answerFeedback("incorrect");
            secondsLeft = secondsLeft - 10;
        }
    }
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

document.getElementById("start").addEventListener("click", function(event) {
    event.preventDefault();
    hide("startSection");
    reveal("question1");
    setTime();
});

document.getElementById("answers1").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question1");
    reveal("question2");
    answerCheck(event, 2);
});

document.getElementById("answers2").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question2");
    reveal("question3");
    answerCheck(event, 2);
});

document.getElementById("answers3").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question3");
    reveal("question4");
    answerCheck(event, 3);
});

document.getElementById("answers4").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question4");
    reveal("endSection");
    answerCheck(event, 0);
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
    renderScores();
    hide("endSection");
    hide("head");
    reveal("scorePage");

    console.log(scoreList);

/*     window.location.href='./highScorePage.html'; */
/*     window.location.href='https://pjdip.github.io/Philip-DiPaula-OSU-bootcamp-hwk4/highScorePage.html'; */
});

function storeScores() {
    var stringifiedScores = JSON.stringify(scoreList);
    localStorage.setItem("scores", stringifiedScores);
}

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

document.getElementById("return").addEventListener("click", function(event) {
    event.preventDefault();
    timeEl.textContent = 0;
    reveal("head");
    reveal("startSection");
    hide("scorePage");
/*     window.location.href='./index.html'; */
/*     window.location.href='https://pjdip.github.io/Philip-DiPaula-OSU-bootcamp-hwk4/'; */
});

document.getElementById("clear").addEventListener("click", function(event) {
    event.preventDefault();
    /* delete high score list items 
    append list to document
    */
});