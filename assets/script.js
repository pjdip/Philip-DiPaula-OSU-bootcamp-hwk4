/* 

countdown timer
    starts at given time
    counts down
    deduct 10 seconds on wrong answer
    send user to end page when hit 0

start button
    hide start container
    reveal 1st question container
    initiate timer

answer buttons
    hide question
    reveal next question/end
    adjust timer if incorrect
    p element: display correct or incorrect for 3 seconds

display score

submit button
    store initials
    append to high score list
    switch to high score page

5) high schore page
    list element: initials + score
    return to home button
        when clicked:
            reset timer to 0
            return to start page
    clear scores button
        when clicked:
            clear high score list

bonus: multiple question types: true/false and multiple choice */

var returnBtn = document.getElementById("return");
returnBtn.addEventListener("click", function() {
    window.location.href='https://pjdip.github.io/Philip-DiPaula-OSU-bootcamp-hwk4/';
})

function updateHighScores(alias, score, scoreList) {
    /* 
    score entry object: stores alias and score
    list of score entry objects
    create new score entry
    sort score entry list by score value
    append list to document

    */

    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = alias + " - " + score;
    var scores = document.getElementById("highScores");

    scores.appendChild(scoreEntry);
    scoreEntry.setAttribute("style", " color:white; background: #666666; padding: 5px; margin-left: 35px;");
}