/*
 * Create a list that holds all of your cards
 */
var deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor","fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf","fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

/*
 * Declare Variables
 */
 tempArray = [];
 let move = 0;
 let matchNumber=0;
 
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//shuffle Cards' order and append the html element.
function shuffleCards() {
    let cardList = shuffle(deck);
    $(".deck").empty();
     cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
};



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function findMatch() {
  //card on click event
  $(".card").on("click", function() {
   
    
    if (tempArray.length === 0) {
             if ($(this).hasClass("open show")) { return; }
    			$(this).toggleClass("open show");
    			tempArray.push($(this)); 
    			move++;
    			$(".moves").text(move);
    			updateStar();
    }  
    else if (tempArray.length === 1)
    {
    	if ($(this).hasClass("open show")) { return; }
    			$(this).toggleClass("open show");
    			tempArray.push($(this)); 
    			move++;
    			$(".moves").text(move);
    			updateStar();
    			
    		if (ifMatch()) {
                tempArray[0][0].classList.add("match");
      			tempArray[1][0].classList.add("match");
      			matchNumber++;
    			tempArray = [];
    			if(matchNumber == 8){
    				openModal();
    			}
            } else {
                setTimeout(resetTempArray, 700);
            }
    }
  })
}

/*
 * Open modal when game finishes
 */
function openModal()
{
	var modal = $("#win-modal");
     modal.css("display", "block");
}

/*
 * Reset temporary array 
 */
var resetTempArray = function() {
    tempArray.forEach(function(card) {
        card.toggleClass("open show");
    });
    tempArray = [];
};

/*
 * Check if two cards match
 */
function ifMatch() {
    if (tempArray[0][0].classList[2] === tempArray[1][0].classList[2]) {
        return true;
    } else {
        return false;
    }
};

/*
 * Event listener for refresh button to refresh game
 */
document.getElementById("play-again").addEventListener("click", PlayAgain);

function PlayAgain(){
	var modal = $("#win-modal");
     modal.css("display", "none");
     restart();
}

/*
 * Update Star UI 
 */
function updateStar(){
	if(move>16){
		$("#starThree").removeClass("fa-star");
	}
	else if(move>30){
		$("#starTwo").removeClass("fa-star");
	}
}

/*
 * Reset Star UI once the game has been reset
 */
function resetStar(){
	$("#starThree").addClass("fa-star");
	$("#starTwo").addClass("fa-star");
	$("#starOne").addClass("fa-star");
}

/*
 * On click event to restart a new game
 */
function restartGame() {
  $(".restart").on("click", function() {
    restart();
  });
}
  
/*
 * Restart a new game and reset data
 */
function restart(){
  	$(".card").removeClass("open show match");
    move=0;
    $(".moves").text(move);
    shuffleCards();
    findMatch();
    resetStar();
}
  
shuffleCards();
findMatch();
restartGame();

 
 
