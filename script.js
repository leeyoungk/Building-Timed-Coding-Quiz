// set element by class
var timeEl = document.querySelector(".time");
var startQuiz = document.querySelector(".button")

// Set time left = 75 seconds 
var secondsLeft = 75;


// created a function to run variable secondLeft
function timeLeft() {
    // Sets interval in variable
    timeEl.textContent = "Time:" + secondsLeft ;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        

        if(secondsLeft === 0) {
            
            clearInterval(timerInterval);
            
            sendMessage();
        }
    }, 1000);

}
startQuiz.addEventListener("click", function() {
    

});

function sendMessage() {
    timeEl.textContent = " ";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", "images/image_1.jpg");
    mainEl.appendChild(imgEl);
  
}

timeLeft();