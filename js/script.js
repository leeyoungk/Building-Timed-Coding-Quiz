// set element by class
var timeEl = document.querySelector("#timerSeconds");
var startQuiz = document.querySelector("#start-button");
var enterNameEl = document.querySelector("#enterName");
var submitButtonEl = document.querySelector("#submitButton");
var submissionResponseEl = document.querySelector("#response");
var sectionQuestionsEl = document.querySelector(".question-section");


var listOfQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        correctAnswer: "C.Alerts",
        choices: ["A.Strings","B.Booleans","C.Alerts","D.Numbers"]
    },

    {
        question: "The condition in an if/else statment is enclosed within___.",
        correctAnswer: "C.Parentheses",
        choices: ["A.Quotes","B.Curly brackets","C.Parentheses","D.Square brackets"]
    },
    {
        question: "Arrays in JavaScript can be used to store___.",
        correctAnswer: "D.All of the above",
        choices: ["A.Numbers and strings","B.Other arrays","C.Booleans","D.All of the above"]
    },
    {
        question: "String values must be enclosed within___when being assigned to variables",
        correctAnswer: "C.Quotes",
        choices: ["A.Comma","B.Curly brackets","C.Quotes","D.Parentheses"]
    }




 ];

// Set time left = 75 seconds 
var secondsLeft = 75;
// var index = 0;


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
    var questionContainer = listOfQuestions[index].question;
    sectionQuestionsEl.textContent = questionContainer;
    var choicesContainer = listOfQuestions[index].choices;
    
    for (let index = 0; index < choicesContainer.length; index++) {
       var choiceButton = document.createElement("button");
       choiceButton.textContent = choicesContainer[index];
       choiceButton.setAttribute("id",index);
       choiceButton.setAttribute("class", "choice");
       choiceButton.onclick = answerClick;
       var listChoice = document.createElement("li");
       listChoice.appendChild(choiceButton);
       
       sectionQuestionsEl.appendChild(listChoice);
       

    }
    timeLeft();
    function answerClick (event) {
        
        console.log(event.target.innerHTML);
        if (event.target.innerHTML === listOfQuestions[0].correctAnswer) {
            console.log("correct");

        }else {
            console.log("wrong");
        }
        

    }
   
    
    

});

function submitInitials (event) {
    event.preventDefault();
    console.log(event);
    var response = " thankyou" + enterNameEl;
    submissionResponseEl.textcontent = response;

}
submitButtonEl.addEventListener("click",submitInitials);

