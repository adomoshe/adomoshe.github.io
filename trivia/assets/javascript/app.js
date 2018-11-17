
$(window).ready(function () {
    // Questions array
    var questions = ["How many licks does it officialy take to get to the center of a Tootsie Pop?", "What percent of American adults belive chocolate milk comes from brown cows?",
        "What is Bob Dylan's real name?", "The Center for Disease Control's (CDC) website has a section dedicated to?", "What does McDonald's refer to their frequent users as?",
        "What kills more people yearly than shark attacks?", "Under the Code of Hammurabi (Babylonian code of law in ancient Mesopotamia) bartenders that watered down beer were..."];
    // Answers array
    var answers = [
        [1, "364", "420", "Just bite it", "A lot!"],
        [3, "2%", "Where does strawberry milk come from then?", "7%", "It doesn't?", "I don't drink milk", "14%"],
        [2, "Dylan Bob", "Robert Zimmerman", "Jokerman"],
        [1, "Zombie Prepardness", "Sex Addiction"],
        [4, "Guests", "Customers", "Fans", "Heavy Users"],
        [4, "Vending machines", "Selfies", "Coconuts", "All of the above"],
        [1, "Punished by execution", "Fined", "When was beer even invented?", "Mesopowhaaat?", "Doesn't matter, I'll take 4!"]
    ];
    // Seconds to be used for timer
    var seconds = 30;
    // Var binding timer to setInterval to prevent speeding up caused by multiple instances
    var timer;
    // Keep track of times played so it won't exceed number of questions
    var timesPlayed = 0;
    // Keeps track of right and wrong answers
    var right = 0;
    var wrong = 0;

    // Displays Start Game! button
    $("#answersInsert").append("<div class='row'><button type='button' id='startGame' class='btn btn-outline-primary btn-lg'>Start Game!</button></div>");
    // When button is clicked startGame function is fired off
    $("#startGame").on("click", startGame);

    // Allows game to start if not all questions have been shown yet, then +1 to timesPlayed, empties previous buttons, renders new questions and answers,
    // runs checkAnswer function when any button is clicked, invokes run function.
    // If all questions have been displayed else statement invokes gameOver function.
    function startGame() {
        console.log("timesPlayed: " + timesPlayed);
        console.log("qlength: " + questions.length)
        if (timesPlayed < questions.length - 1) {
            timesPlayed++;
            $("#answersInsert").empty();
            renderQuestion(questions[timesPlayed]);
            renderAnswers(answers[timesPlayed]);
            $(".btn").on("click", checkAnswer);
            run();
        } else {
            gameOver();
        }
    }

    // checkAnswer checks if the id of the button which has been dynamically inputted with the index in which it was entered is the same as the same as the 0 index of that answer array
    // which is the correct answer. If it matches right++ if not then wrong++. Then invokes clearTimer and startGame functions.
    function checkAnswer() {
        if (event.target.id == answers[timesPlayed][0]) {
            right++;
        } else {
            wrong++;
        }
        clearTimer();
        startGame();
    }

    // run clearInterval then setInterval to prevent multiple instances and sets the timerFun as the reoccuring function every second.
    function run() {
        clearInterval(timer);
        timer = setInterval(timerFunc, 1000);
    };

    // timerFunc -- seconds and displays the new total on the screen everytime its called. If the seconds are zero then it adds a wrong, empties the buttons invokes cleaerTimer then startGame.
    function timerFunc() {
        seconds--;
        $("#timer").text("Time left: " + seconds);
        if (seconds === 0) {
            wrong++;
            $("#answersInsert").empty();
            clearTimer();
            startGame();
        }
    }

    // clearTimer uses clearInterval on timer then resets seconds to 30 and updates the html.
    function clearTimer() {
        clearInterval(timer);
        seconds = 30;
        $("#timer").text("Time left: " + seconds);
    }

    // function runThreeSec() {
    //     setInterval(function (){
    //         $("#questionInsert").text("Time's Up! Next Question...");
    //     }, 1000);
    //     startGame ();
    // };

    // renderQuestions pushes the next question to the html
    function renderQuestion(question) {
        $("#questionInsert").text(question);
    }

    // renderAnswers dynamically creates buttons for an array of answers that corresponds to the answer and pushes them to the html.
    function renderAnswers(answerArr) {
        var index
        for (index = 1; index < answerArr.length; index++) {
            $("#answersInsert").append("<div class='row'><button type='button' id=" + index + " class='btn btn-outline-primary btn-lg'>" + answerArr[index] + "</button></div>");
        };
    };

    // gameOver inserts Thanks for playing text to html, displays right and wrong values and clears the buttons.
    function gameOver() {
        $("#questionInsert").text("Thanks for playing!");
        $("#timer").text("Correct: " + right + " Wrong: " + wrong);
        $("#answersInsert").empty();
    }
});
