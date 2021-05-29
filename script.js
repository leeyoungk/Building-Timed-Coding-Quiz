// set element by class
var timeEl = document.querySelector(".time");

// Set time left = 75 seconds 
var secondsLeft = 75;
// created a function to run variable secondLeft
function timeLeft() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.innerHTML = timeEl + secondsLeft ;

        if(secondsLeft === 0) {
            
            clearInterval(timerInterval);
            
            // sendMessage();
        }
    },1000);

}