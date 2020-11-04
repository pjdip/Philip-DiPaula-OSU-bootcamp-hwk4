var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var formEl = document.querySelector("#question");
var questionEl = document.getElementsByTagName("h2");
var aliasInput = document.getElementById("initials");
var highScoresEl = document.getElementById("highScores");
timeEl.textContent = 0;

var answerOptions = 4;
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
    constructor(questionText, ans0, ans1, ans2, ans3, correctAns) {
        this.questionText = questionText;
        this.ans0 = ans0;
        this.ans1 = ans1;
        this.ans2 = ans2;
        this.ans3 = ans3;
        this.correctAns = correctAns;
    }
}

const q0 = new Question("Commonly used data types include ALL of the following EXCEPT:", "strings", "booleans", "alerts", "numbers", "ans2");
const q1 = new Question("The condition of an if/else statement is enclosed within:", "quotes", "curly brackets", "parenthesis", "square brackets", "ans2");
const q2 = new Question("Arrays in JavaScript can be used to store:", "numbers and strings", "other arrays", "objects", "all of the above", "ans3");
const q3 = new Question("String values must be enclosed within ____ when being assigned to variables.", "quotes", "curly brackets", "parenthesis", "commas", "ans0");

var questions = [q0, q1, q2, q3];

function dynamicAnswers(qIndex, ansIndex, aList) {
    var answerListItem = document.createElement("li");
    answerListItem.setAttribute("id", ansIndex);
    var answerButton = document.createElement("button");
    if (ansIndex === 0) {
        answerButton.textContent = questions[qIndex].ans0;
    } else if (ansIndex === 1) {
        answerButton.textContent = questions[qIndex].ans1;
    } else if (ansIndex === 2) {
        answerButton.textContent = questions[qIndex].ans2;
    } else if (ansIndex === 3) {
        answerButton.textContent = questions[qIndex].ans3;
    }
    answerListItem.append(answerButton);
    aList.append(answerListItem);
}

function questionLoop() {
    for (var i = 0; i < questions.length; i++) {
        flag = false;
        while (flag !== true) {
            var quest = document.createElement("h2");
            quest.textContent = questions[i].questionText;
            formEl.prepend(quest);
    
            var ansList = document.createElement("ol");
            ansList.setAttribute("id", "answers");
            
            for (var j = 0; j < answerOptions; j++) {
                dynamicAnswers(i, j, ansList);
            }

/*             var a0 = document.createElement("li");
            a0.setAttribute("id", 0);
            var button0 = document.createElement("button");
            button0.textContent = questions[i].ans0;
            a0.append(button0);
            ansList.append(a0);
            
            var a1 = document.createElement("li");
            a1.setAttribute("id", 1);
            var button1 = document.createElement("button");
            button1.textContent = questions[i].ans1;
            a1.append(button1);
            ansList.append(a1);
            
            var a2 = document.createElement("li");
            a2.setAttribute("id", 2);
            var button2 = document.createElement("button");
            button2.textContent = questions[i].ans2;
            a2.append(button2);
            ansList.append(a2);
            
            var a3 = document.createElement("li");
            a3.setAttribute("id", 3);
            var button3 = document.createElement("button");
            button3.textContent = questions[i].ans3;
            a3.append(button3);
            ansList.append(a3); */
    
            formEl.append(ansList);
    
    
    
            flag = true;
        }
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

document.getElementById("start").addEventListener("click", function(event) {
    event.preventDefault();
    hide("startSection");
    questionLoop();
    reveal("question");
    timeEl.textContent = secondsLeft;
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

/*         document.getElementById("answers4").addEventListener("click", function(event) {
            event.preventDefault();
            if (event.target.matches("button") && !event.target.matches("li")) {
                clearInterval(timeInterval);
            }
        });

        if (secondsLeft === 0) {
            finalTime = 0;
            timeEl.textContent = finalTime;
            scoreEl.textContent = finalTime;
            clearInterval(timeInterval);
            hide("question1");
            hide("question2");
            hide("question3");
            hide("question4");
            reveal("endSection");
        } */
    }, 1000);
});

function answerFeedback(accuracy) {
    reveal(accuracy);
    var displayTime = 2;
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

/* document.getElementById("answers1").addEventListener("click", function(event) {
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

    if (event.target.matches("button") && !event.target.matches("li")) {
        finalTime = secondsLeft;
        timeEl.textContent = finalTime;
        scoreEl.textContent = finalTime;
    }
}); */

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