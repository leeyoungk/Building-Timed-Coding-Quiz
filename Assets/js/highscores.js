// GLOBL VARIABLES
var highscoresListEl = document.querySelector( '#highscoresList' );
var clearScoresBtn = document.querySelector( '#clearHighscoresButton' );

var saveHighscores = JSON.parse( localStorage.getItem( 'saveHighscores' ) ) || [];

// Sort the objects by correct answers and time remaining values
saveHighscores.sort( function( a, b ) {
	var answerA = a.answerScore;
	var timeA = a.timeScore;
	var answerB = b.answerScore;
	var timeB = b.timeScore;

	return ( answerA < answerB ? 1 : ( answerA > answerB ? -1 : ( answerA === answerB ? ( timeA < timeB ? 1 : ( timeA > timeB ? -1 : 0 ) ) : null ) ) );
} );

// Load list to page
for( var i = 0; i < saveHighscores.length; i++ ) {
	var li = document.createElement( 'li' );
	li.textContent = `${i+1}. ${saveHighscores[i].initals} --- ${saveHighscores[i].answerScore} Correct --- ${saveHighscores[i].timeScore} Seconds remaining`;
	highscoresListEl.append( li );
}

// Event Listener clear scores
clearScoresBtn.addEventListener( 'click', function() {
	localStorage.clear();
	location.reload();
} );