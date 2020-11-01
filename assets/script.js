/* 
countdown timer
    starts at given time
    counts down
    deduct 10 seconds on wrong answer
    send user to end page when hit 0

display score

5) high schore page
    list element: initials + score

bonus: multiple question types: true/false and multiple choice */

var scoreList = [];
var secondsLeft = 10;
var timeEl = document.getElementById("time");
timeEl.textContent = 0;

function setTime() {
    var timeInterval = setInterval(function() {
        timeEl.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft === 0) {
            timeEl.textContent = secondsLeft;
            var finalTime = 0;
            clearInterval(timeInterval);
            hide("question1");
            hide("question2");
            hide("question3");
            hide("question4");
            reveal("endSection");
            alert("sorry, you ran out of time");
        }
    }, 1000);
}


/* Hiding/revealing */
function hide(visible) {
    document.getElementById(visible).classList.remove("revealed");
    document.getElementById(visible).classList.add("hidden");
}

function reveal(hidden) {
    document.getElementById(hidden).classList.remove("hidden");
    document.getElementById(hidden).classList.add("revealed");
}

document.getElementById("start").addEventListener("click", function(event) {
    event.preventDefault();
    hide("startSection");
    reveal("question1");
    setTime();
})

document.getElementById("answers1").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question1");
    reveal("question2");
    /* 
    adjust timer as needed
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("answers2").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question2");
    reveal("question3");
    /* 
    hide question2
    reveal quesiton3
    adjust timer as needed
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("answers3").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question3");
    reveal("question4");
    /*
    adjust timer as needed
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("answers4").addEventListener("click", function(event) {
    event.preventDefault();
    hide("question4");
    reveal("endSection");

    /* 
    adjust timer as needed
    stop timer
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("submit").addEventListener("click", updateHighScores);

function updateHighScores(event, alias, score, scoreList) {
    event.preventDefault();
    /* 
    create score entry object: stores alias and score
    append to score list
    sort score entry list by score value
    append list to document
    */

    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = alias + " - " + score;
    var scores = document.getElementById("highScores");

    scores.appendChild(scoreEntry);
    scoreEntry.setAttribute("style", " color:white; background: #666666; padding: 5px; margin-left: 35px;");

    window.location.href='https://pjdip.github.io/Philip-DiPaula-OSU-bootcamp-hwk4/highScorePage.html';
}

document.getElementById("return").addEventListener("click", function(event) {
    event.preventDefault();
    /* reset the timer to 0 */
    window.location.href='https://pjdip.github.io/Philip-DiPaula-OSU-bootcamp-hwk4/';
});

document.getElementById("clear").addEventListener("click", function(event, scoreList) {
    event.preventDefault();
    /* delete high score list items 
    append list to document
    */
});