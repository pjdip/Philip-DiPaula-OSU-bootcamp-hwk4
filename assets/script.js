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


document.getElementById("start").addEventListener("click", function() {
    document.getElementById("startSection").setAttribute("style", "display:none;")
    /* 
    hide startSection
    reveal question1
    initiate timer
    */
})

document.getElementById("answers1").addEventListener("click", function(event) {
    document.getElementById("question1").setAttribute("style", "display:none;")
    /* 
    hide question1
    reveal quesiton2
    adjust timer as needed
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("answers2").addEventListener("click", function(event) {
    document.getElementById("question2").setAttribute("style", "display:none;")
    /* 
    hide question2
    reveal quesiton3
    adjust timer as needed
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("answers3").addEventListener("click", function(event) {
    document.getElementById("question3").setAttribute("style", "display:none;")
    /* 
    hide question3
    reveal quesiton4
    adjust timer as needed
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("answers4").addEventListener("click", function(event) {
    document.getElementById("question4").setAttribute("style", "display:none;")
    /* 
    hide question4
    reveal endSection
    adjust timer as needed
    stop timer
    display correct/incorrect for 3 seconds
    */
});

document.getElementById("submit").addEventListener("click", updateHighScores);

document.getElementById("return").addEventListener("click", function() {
    /* reset the timer to 0 */
    window.location.href='https://pjdip.github.io/Philip-DiPaula-OSU-bootcamp-hwk4/';
});

document.getElementById("clear").addEventListener("click", function(scoreList) {
    /* delete high score list items 
    append list to document
    */
});

function updateHighScores(alias, score, scoreList) {

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