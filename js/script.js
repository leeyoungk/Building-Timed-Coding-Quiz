// set element by class
var timeEl = document.querySelector("#timerSeconds");
var startQuiz = document.querySelector("#start-button");
var submitNameEl = document.querySelector("#submitName");
var listOfQuestions = [
    {
        questions: "Commonly used data types DO NOT include:",
        correctAnswer: "C.Alerts",
        choices: ["A.Strings","B.Booleans","C.Alerts","D.Numbers"]
    },

    {
        questions: "The condition in an if/else statment is enclosed within___.",
        correctAnswer: "C.Parentheses",
        choices: ["A.Quotes","B.Curly brackets","C.Parentheses","D.Square brackets"]
    },
    {
        questions: "Arrays in JavaScript can be used to store___.",
        correctAnswer: "D.All of the above",
        choices: ["A.Numbers and strings","B.Other arrays","C.Booleans","D.All of the above"]
    },
    {
        questions: "String values must be enclosed within___when being assigned to variables",
        correctAnswer: "C.Quotes",
        choices: ["A.Comma","B.Curly brackets","C.Quotes","D.Parentheses"]
    }




 ];

// Set time left = 75 seconds 
var secondsLeft = 75;
var index = 0;


// created a function to run variable secondLeft
function timeLeft() {
    // Sets interval in variable
 
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent =  secondsLeft ;

        if(secondsLeft === 0) {
            
            clearInterval(timerInterval);
            
            
        }
    }, 1000);

}
// created an eventlistener to start the game when button is clicked.
startQuiz.addEventListener("click", function() {
    
    timeLeft();
    

});
function submitInitials (event) {
    event.preventDefault();
    console.log(event);

}
submitNameEl.addEventListener("click",submitInitials);

