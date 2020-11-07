var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var formEl = document.querySelector("#question");
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

class Question {
    constructor(questionNumber, questionText, ans0, ans1, ans2, ans3, correctAns) {
        this.questionNumber = questionNumber;
        this.questionText = questionText;
        this.ans0 = ans0;
        this.ans1 = ans1;
        this.ans2 = ans2;
        this.ans3 = ans3;
        this.correctAns = correctAns;
    }
}

var q0 = new Question("0", "Commonly used data types include ALL of the following EXCEPT:", "strings", "booleans", "alerts", "numbers", "2");
var q1 = new Question("1", "The condition of an if/else statement is enclosed within:", "quotes", "curly brackets", "parenthesis", "square brackets", "2");
var q2 = new Question("2", "Arrays in JavaScript can be used to store:", "numbers and strings", "other arrays", "objects", "all of the above", "3");
var q3 = new Question("3", "String values must be enclosed within ____ when being assigned to variables.", "quotes", "curly brackets", "parenthesis", "commas", "0");

function hide(visibleID) {
    document.getElementById(visibleID).classList.remove("revealed");
    document.getElementById(visibleID).classList.add("hidden");
}

function reveal(hiddenID) {
    document.getElementById(hiddenID).classList.remove("hidden");
    document.getElementById(hiddenID).classList.add("revealed");
}

function deleteQuestion() {
    while (formEl.firstChild) {
        formEl.removeChild(formEl.lastChild);
    }
}

function generateQuestion(questionObj) {
    var quest = document.createElement("h2");
    quest.textContent = questionObj.questionText;
    formEl.prepend(quest);

    var answerList = document.createElement("ol");
    var ansID = "answers" + questionObj.questionNumber;
    answerList.setAttribute("id", ansID);

    for (var j = 0; j < 4; j++) {
        var answerListItem = document.createElement("li");
        answerListItem.setAttribute("id", j);
        var answerButton = document.createElement("button");

        if (j === 0) {
            answerButton.textContent = questionObj.ans0;
        } else if (j === 1) {
            answerButton.textContent = questionObj.ans1;
        } else if (j === 2) {
            answerButton.textContent = questionObj.ans2;
        } else if (j === 3) {
            answerButton.textContent = questionObj.ans3;
        }

        answerListItem.append(answerButton);
        answerList.append(answerListItem);
    }

    formEl.append(answerList);
}

function answerFeedback(accuracyID) {
    reveal(accuracyID);
    var displayTime = 2;
    var feedbackInterval = setInterval(function() {
        displayTime--;

        if (displayTime === 0) {
            clearInterval(feedbackInterval);
            hide(accuracyID);
        }
    }, 1000);
}

function answerCheck(evt, questionObj) {
    var ansIndex = evt.target.parentElement.getAttribute("id");
    if (ansIndex === questionObj.correctAns) {
        answerFeedback("correct");
    } else {
        answerFeedback("incorrect");
        secondsLeft = secondsLeft - 10;
    }
    deleteQuestion();
}

document.getElementById("start").addEventListener("click", function(event) {
    event.preventDefault();
    hide("startSection");

    timeEl.textContent = secondsLeft;
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            finalTime = 0;
            timeEl.textContent = finalTime;
            scoreEl.textContent = finalTime;
            clearInterval(timeInterval);
            deleteQuestion();
            reveal("endSection");
        }
    }, 1000);


    generateQuestion(q0);
    document.getElementById("answers0").addEventListener("click", function(event) {
        event.preventDefault();
        if (event.target.matches("button") && !event.target.matches("li")) {
            answerCheck(event, q0);

            generateQuestion(q1);
            document.getElementById("answers1").addEventListener("click", function(event) {
                event.preventDefault();
                if (event.target.matches("button") && !event.target.matches("li")) {
                    answerCheck(event, q1);

                    generateQuestion(q2);                    
                    document.getElementById("answers2").addEventListener("click", function(event) {
                        event.preventDefault();
                        if (event.target.matches("button") && !event.target.matches("li")) {
                            answerCheck(event, q2);

                            generateQuestion(q3);                            
                            document.getElementById("answers3").addEventListener("click", function(event) {
                                event.preventDefault();                            
                                if (event.target.matches("button") && !event.target.matches("li")) {
                                    answerCheck(event, q3);
                                    reveal("endSection");
                                    finalTime = secondsLeft;
                                    clearInterval(timeInterval);
                                    timeEl.textContent = finalTime;
                                    scoreEl.textContent = finalTime;
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

function storeScores() {
    var stringifiedScores = JSON.stringify(scoreList);
    localStorage.setItem("scores", stringifiedScores);
}

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