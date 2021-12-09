var correctAnswersEL = document.querySelector( '#correctAnswers' );
var timerEl = document.querySelector( '#timerValue' );
// Start Screen
var startScreenEl = document.querySelector( '#startScreen' );
var startQuizBtn = document.querySelector( '#startQuizButton' );
// Question Screen
var questionScreenEl = document.querySelector( '#questionScreen' );
var questionCoutdownEl = document.querySelector( '#questionCountDown' );
var questionEl = document.querySelector( '#theQuestion' );
var buttonContainerEl = document.querySelector( '#buttonContainer' );
var correctEl = document.querySelector( '.correct' );
var wrongEl = document.querySelector( '.wrong' );
// Game End Screen
var finishedScreenEl = document.querySelector( '#finishScreen' );
var correctScoreSpan = document.querySelector( '#answeredCorrectScore' );
var timerScoreSpan = document.querySelector( '#finalScoreTime' );
var initalsFormEl = document.querySelector( '#initalsForm' );
var initalsEl = document.querySelector( '#initials' );

// Tracking Variables
var index;
var correctAnswers;
var timeLeft;
var timerInterval;
var correctWrongTimeout;

// --------------------------------------------------------------------------------
// DECLARED FUNCTIONS
// Updates the timer value to immediate value
function updateTimerValue() {
	timerEl.textContent = timeLeft;
}

// Stops the timer and switches content to finished screen with score
function endGame() {
	clearInterval( timerInterval );

	if( timeLeft < 0 ) {
		timeLeft = 0;
	}

	updateTimerValue();

	questionScreenEl.classList.add( 'hidden' );
	finishedScreenEl.classList.remove( 'hidden' );

	correctScoreSpan.textContent = correctAnswers;
	timerScoreSpan.textContent = timeLeft;
}

// Starts the timer countdown interval and tracks game end conditions
function startTimer() {
	timerInterval = setInterval( function() {
		timeLeft -= 1;

		updateTimerValue();

		if( timeLeft <= 0 || index === questions.length ) {
			endGame();
		}
	}, 1000 );
}

// Fisher-Yates shuffle: used to shuffle the question order and answer order
function shuffleArray( array ) {
	for( var i = array.length - 1; i > 0; i-- ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Loads a question object's properties to the question section of html generating buttons for each answer
function loadQuestion() {
	buttonContainerEl.innerHTML = '';
	questionEl.textContent = questions[index].question;
	questionCoutdownEl.textContent = questions.length - index;
	questions[index].choices = shuffleArray( questions[index].choices );

	for( var i = 0; i < questions[index].choices.length; i++ ) {
		var button = document.createElement( 'button' );
		button.setAttribute( 'data-answer', questions[index].choices[i] );
		button.textContent = questions[index].choices[i];
		buttonContainerEl.append( button );
	}
}

// Activated on start button click, switches to question content and initializes variable values
function startGame() {
	startScreenEl.classList.add( 'hidden' );
	questionScreenEl.classList.remove( 'hidden' );

	index = 0;
	correctAnswers = 0;
	timeLeft = 10*questions.length;
	questions = shuffleArray( questions );

	startTimer();
	loadQuestion();
}

// Hides the "correct" or "wrong" elements
function hideCorrectWrong() {
	correctEl.classList.add( 'hidden' );
	wrongEl.classList.add( 'hidden' );
}

// Keeps track of how long the "correct" or "wrong" elements have been displayed
function correctWrongTimer() {
	correctWrongTimeout = setTimeout( hideCorrectWrong, 1000 );
}

// Updates index to load next question or end the game once all questions have been answered
function nextQuestion() {
	index++;

	correctWrongTimer();

	if( index === questions.length ) {
		endGame();
		return;
	}

	loadQuestion();
}

// If the answer was correct the counters and display are updated
function correctAnswer() {
	correctAnswers++;
	correctAnswersEL.textContent = correctAnswers;
	correctEl.classList.remove( 'hidden' );
}

// if the answer was wrong the timer is updated by 10 seconds
function wrongAnswer() {
	timeLeft -= 10;
	updateTimerValue();
	wrongEl.classList.remove( 'hidden' );
}

// Evaluates if the answer button value was correct or wrong
function checkAnswer( event ) {
	if( event.target.type === 'submit' ) {
		clearTimeout( correctWrongTimeout );
		hideCorrectWrong();

		var answer = event.target.getAttribute( 'data-answer' );

		answer === questions[index].correct ? correctAnswer() : wrongAnswer();

		nextQuestion();
	}
}

// Saves the players score from a form and stores the data as a JSON object array locally
function saveScore( event ) {
	event.preventDefault();

	var scoreData = {
		initals: initalsEl.value,
		answerScore: correctAnswers,
		timeScore: timeLeft
	};

	var storedHighscores = JSON.parse( localStorage.getItem( 'storedHighscores' ) ) || [];

	storedHighscores.push( scoreData );

	localStorage.setItem( 'storedHighscores', JSON.stringify( storedHighscores ) );

	window.location = './Assets/html/highscores.html';
}

// --------------------------------------------------------------------------------
// EVENT LISTENERS
startQuizBtn.addEventListener( 'click', startGame );
questionScreenEl.addEventListener( 'click', checkAnswer );
initalsFormEl.addEventListener( 'submit', saveScore );