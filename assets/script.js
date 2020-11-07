// grabbing document elements and declaring variables for later use
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var formEl = document.querySelector("#question");
var aliasInput = document.getElementById("initials");
var highScoresEl = document.getElementById("highScores");
timeEl.textContent = 0;
var secondsLeft = 75;
var finalTime;

// declaring score list and populating it if there are score items in local storage
var scoreList = [];
var retrievedScores = localStorage.getItem("scores");
if (retrievedScores !== null) {
    scoreList = JSON.parse(retrievedScores);
}

// defining some classes for later use
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

// instantiating question objects using Question class
var q0 = new Question("0", "Commonly used data types include ALL of the following EXCEPT:", "strings", "booleans", "alerts", "numbers", "2");
var q1 = new Question("1", "The condition of an if/else statement is enclosed within:", "quotes", "curly brackets", "parenthesis", "square brackets", "2");
var q2 = new Question("2", "Arrays in JavaScript can be used to store:", "numbers and strings", "other arrays", "objects", "all of the above", "3");
var q3 = new Question("3", "String values must be enclosed within ____ when being assigned to variables.", "quotes", "curly brackets", "parenthesis", "commas", "0");

// takes an HTML element id and hides the element from the user if it is visible
function hide(visibleID) {
    document.getElementById(visibleID).classList.remove("revealed");
    document.getElementById(visibleID).classList.add("hidden");
}

// takes an HTML element id and reveals the element to the user if it is hidden
function reveal(hiddenID) {
    document.getElementById(hiddenID).classList.remove("hidden");
    document.getElementById(hiddenID).classList.add("revealed");
}

// empties the form element of all children
function formClear() {
    while (formEl.firstChild) {
        formEl.removeChild(formEl.lastChild);
    }
}

// take a question object and generates an h2, ol, and li for various property values
function generateQuestion(questionObj) {

    // generate an h2 element, give it the question's text, put it in the html
    var quest = document.createElement("h2");
    quest.textContent = questionObj.questionText;
    formEl.prepend(quest);

    // generate an ol element, give it an ID based on the question number (to be used for answer verification later)
    var answerList = document.createElement("ol");
    var ansID = "answers" + questionObj.questionNumber;
    answerList.setAttribute("id", ansID);

    // there are 4 answer options per question
    // we create an li element for each one, and give those an id and a button element
    for (var j = 0; j < 4; j++) {
        var answerListItem = document.createElement("li");
        answerListItem.setAttribute("id", j);
        var answerButton = document.createElement("button");

        // each button receives different textContent depending on the values in the question object
        if (j === 0) {
            answerButton.textContent = questionObj.ans0;
        } else if (j === 1) {
            answerButton.textContent = questionObj.ans1;
        } else if (j === 2) {
            answerButton.textContent = questionObj.ans2;
        } else if (j === 3) {
            answerButton.textContent = questionObj.ans3;
        }

        // we add the button to the li, and the li to the ol
        answerListItem.append(answerButton);
        answerList.append(answerListItem);
    }

    // finally the ol is added to the form element
    formEl.append(answerList);
}

// takes in the id of the p element to be displayed
// depending if question was answered correctly
// displays the eleent for 2 seconds
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

// takes the event and question object to be checked
// reveals correct/incorrect using answerFeedback function
// adjusts time if answer was wrong and clears the form element
function answerCheck(evt, questionObj) {

    // grabbing the id of the li for the button that was clicked
    // this corresponds to user's answer choice
    var ansIndex = evt.target.parentElement.getAttribute("id");

    // compares user choice to correct answer stored in the object and proceeds accordingly
    if (ansIndex === questionObj.correctAns) {
        answerFeedback("correct");
    } else {
        answerFeedback("incorrect");
        secondsLeft = secondsLeft - 10;
    }
    formClear();
}

// when start button is pressed...
document.getElementById("start").addEventListener("click", function(event) {
    event.preventDefault();

    // hide start section and initiate the timer
    hide("startSection");
    timeEl.textContent = secondsLeft;
    var timeInterval = setInterval(function() {
        secondsLeft--;

        // display time to user in the html
        timeEl.textContent = secondsLeft;

        // when time runs out or user guesses wrong late in the game...
        if (secondsLeft <= 0) {

            // clear the form and reveal the endSection
            formClear();
            reveal("endSection");

            // store finalTime, plaster that on the screen, and clear the interval
            finalTime = 0;
            timeEl.textContent = finalTime;
            scoreEl.textContent = finalTime;
            clearInterval(timeInterval);
        }
    }, 1000);

    // generate the first question and give it an event listener
    generateQuestion(q0);
    document.getElementById("answers0").addEventListener("click", function(event) {
        event.preventDefault();

        // when user chooses an answer, we verify the result and generate the next question
        // since we are event delegating, make sure they click the button, not just the li
        if (event.target.matches("button") && !event.target.matches("li")) {
            answerCheck(event, q0);
            generateQuestion(q1);

            // rinse and repeat...
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

                            // for the final question...
                            document.getElementById("answers3").addEventListener("click", function(event) {
                                event.preventDefault();                            
                                if (event.target.matches("button") && !event.target.matches("li")) {
                                    answerCheck(event, q3);

                                    // same things that happen if time runs out
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

// stores the score list in local storage
function storeScores() {
    var stringifiedScores = JSON.stringify(scoreList);
    localStorage.setItem("scores", stringifiedScores);
}

// when submit button is clicked...
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();

    // grab user input, do nothing if they input nothing
    var alias = aliasInput.value.trim();
    if (alias === "") {
        return;
    }

    // reset input field to empty
    aliasInput.value = "";

    // create score object and add it to scoreList
    // sort the scores and store them
    // then move to the highScorePage
    var scoreEntry = new HighScore(alias, finalTime);
    scoreList.push(scoreEntry);
    scoreList.sort(function(a,b) {return b.points - a.points});
    storeScores();
    window.location.href='./highScorePage.html';
});