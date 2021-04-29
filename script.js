const cards = document.querySelectorAll('.memory-card'); //selects all elements, here an element is memory-card

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;





function flipCard() {

    if (lockBoard == true) return; 
    if (this === firstCard) return;
    this.classList.add("flip");

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else {
        //second click
        
        secondCard = this;

     checkForMatch();


    }
}

function checkForMatch() {

    //do cards match?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    }
    else {

       unflipCards();
    }
}

function disableCards() {
//match
firstCard.removeEventListener("click", flipCard)
secondCard.removeEventListener("click", flipCard)
resetBoard();
}

function unflipCards() {
 //not a match
 lockBoard = true ;

 setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard();
}, 1500);
}
//resetting board after round
function resetBoard() {
    hasFlippedCard = false; // [hasFlippedCard, lockBoard] = [false, false]
    lockBoard = false;
    firstCard = null;
    secondCard = null;

}
//shuffle card pos
(function shuffle() { //IIFE Immediately Invoked Function Expression
    cards.forEach(card => {
   let randomPos = Math.floor(Math.random() * 12);
   card.style.order = randomPos;
    });
   
   })();

cards.forEach(card => card.addEventListener("click", flipCard))  //for each element, here named card, on click we flip card