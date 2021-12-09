
// GLOBAL VARIABLES

var correctAnswersEL = document.querySelector( '#correctAnswers' );
var timerEl = document.querySelector( '#timerValue' );
var startScreenEl = document.querySelector( '#startScreen' );
var startQuizBtn = document.querySelector( '#startQuizButton' );

var questionScreenEl = document.querySelector( '#questionScreen' );
var questionCountdownEl = document.querySelector( '#questionCountDown' );
var questionEl = document.querySelector( '#theQuestion' );
var buttonContainerEl = document.querySelector( '#buttonContainer' );
var correctEl = document.querySelector( '.correct' );
var wrongEl = document.querySelector( '.wrong' );

var finishedScreenEl = document.querySelector( '#finishedScreen' );
var correctScore = document.querySelector( '#answeredCorrectScore' );
var timerScore = document.querySelector( '#finalScoreTime' );
var initalsFormEl = document.querySelector( '#initalsForm' );
var initalsEl = document.querySelector( '#initials' );


var index;
var correctAnswers;
var timeLeft;
var timerInterval;
var timeout;


function updateTimerValue() {
	timerEl.textContent = timeLeft;
}


function endGame() {
	clearInterval( timerInterval );

	if( timeLeft < 0 ) {
		timeLeft = 0;
	}

	updateTimerValue();

	questionScreenEl.classList.add( 'hidden' );
	finishedScreenEl.classList.remove( 'hidden' );

	correctScore.textContent = correctAnswers;
	timerScore.textContent = timeLeft;
}

function startTimer() {
	timerInterval = setInterval( function() {
		timeLeft -= 1;

		updateTimerValue();

		if( timeLeft <= 0 || index === questions.length ) {
			endGame();
		}
	}, 1000 );
}


function questionChoices( array ) {
	for( var i = array.length - 1; i > 0; i-- ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}


function loadQuestion() {
	buttonContainerEl.innerHTML = '';
	questionEl.textContent = questions[index].question;
	questionCountdownEl.textContent = questions.length - index;
	questions[index].choices = questionChoices( questions[index].choices );

	for( var i = 0; i < questions[index].choices.length; i++ ) {
		var button = document.createElement( 'button' );
		button.setAttribute( 'data-answer', questions[index].choices[i] );
		button.textContent = questions[index].choices[i];
		buttonContainerEl.append( button );
	}
}

function startGame() {
	startScreenEl.classList.add( 'hidden' );
	questionScreenEl.classList.remove( 'hidden' );

	index = 0;
	correctAnswers = 0;
	timeLeft = 10*questions.length;
	questions = questionChoices( questions );

	startTimer();
	loadQuestion();
}


function hideCorrectWrong() {
	correctEl.classList.add( 'hidden' );
	wrongEl.classList.add( 'hidden' );
}

function correctWrongTimer() {
	timeout = setTimeout( hideCorrectWrong, 1000 );
}

function nextQuestion() {
	index++;

	correctWrongTimer();

	if( index === questions.length ) {
		endGame();
		return;
	}

	loadQuestion();
}

function correctAnswer() {
	correctAnswers++;
	correctAnswersEL.textContent = correctAnswers;
	correctEl.classList.remove( 'hidden' );
}

function wrongAnswer() {
	timeLeft -= 10;
	updateTimerValue();
	wrongEl.classList.remove( 'hidden' );
}

function checkAnswer( event ) {
	if( event.target.type === 'submit' ) {
		clearTimeout( timeout );
		hideCorrectWrong();

		var answer = event.target.getAttribute( 'data-answer' );

		answer === questions[index].correct ? correctAnswer() : wrongAnswer();

		nextQuestion();
	}
}

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

startQuizBtn.addEventListener( 'click', startGame );
questionScreenEl.addEventListener( 'click', checkAnswer );
initalsFormEl.addEventListener( 'submit', saveScore );