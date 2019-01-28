/*
 * Create a list that holds all of your cards
 */
var card = document.getElementsByClassName('card');
var cards = [...card]
//deck of all cards in Game
const deck = document.querySelector(".deck");
//moves variable declaration
let moves = 0;
let counter = document.querySelector(".moves");
//stars variable declaration
const stars = document.querySelectorAll(".fa-star");
//stars list declaring
let starsList = document.querySelectorAll(".stars li");
// closeicon declaring
let close = document.querySelector(".close");
//declaring the congrats model
let modal = document.querySelector(".congrats");
//matched cards
let matchedCard = document.getElementsByClassName("match");
// selected OpenedCards
let selectedCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
document.body.onload = playGame();

// game starting and shuffle cards in the deck
function playGame() {
  cards = shuffle(cards);
  for (var i in cards) {
    deck.innerHTML = "";
    [].forEach.call(cards, item => {
      deck.appendChild(item);
    });
    }
  moves = 0;
  counter.innerHTML = moves;
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  second = 0;
  minute = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = " 0  mins : 0  secs";
  clearInterval(interval);
}
// adding classes to selected card
let display = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};
// Compare the classNames of selected two cards
function openCard() {
  selectedCards.push(this);
  var length = selectedCards.length;
  if (length === 2) {
    incrementmoves();
    if (selectedCards[0].children[0].className === selectedCards[1].children[0].className) {
      checkforMatch();
    } else {
      checkforUnmatch();
    }
  }
};
// checking for Match of Selected cards
function checkforMatch() {
  selectedCards[0].classList.add("match", "disabled");
  selectedCards[1].classList.add("match", "disabled");
  selectedCards[0].classList.remove("show", "open");
  selectedCards[1].classList.remove("show", "open");
  selectedCards = [];
}
// checking for Unmatch of Selected cards
function checkforUnmatch() {
  selectedCards[0].classList.add("unmatched");
  selectedCards[1].classList.add("unmatched");
  disablethecards();
  setTimeout(() => {
    selectedCards[0].classList.remove("show", "open", "unmatched");
    selectedCards[1].classList.remove("show", "open", "unmatched");
    enablethecards();
    selectedCards = [];
  }, 1000)
}

function disablethecards() {
  Array.prototype.filter.call(cards, card => {
    card.classList.add('disabled');
  });
}

function enablethecards() {
  Array.prototype.filter.call(cards, card => {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  })
}
// stars removing according to the moves
function incrementmoves() {
  moves++;
  counter.innerHTML = moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    starttheTimer();
  }
  if (moves > 8 && moves < 20) {
    for (var i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 21) {
    for (var i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// timer declaration and setting the timer
var second = 0,
  minute = 0,
  hour = 0;
var timer = document.querySelector(".timer");
var interval;

function starttheTimer() {
  interval = setInterval(() => {
    timer.innerHTML = minute + "mins" +":"+ second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}
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
// adding EventListeners to cards
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", display);
  card.addEventListener("click", openCard);
  card.addEventListener("click", congratulations);
}
// congratulations popup in end of the game
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add("show");

    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById('totalMoves').innerHTML = moves;
    document.getElementById('totalTime').innerHTML = finalTime;
    document.getElementById('starRating').innerHTML = starRating;
    closeModal();
  }
}
// close in pop-up window
function closeModal() {
  close.addEventListener("click", (e) => {
    location.reload();
  });
}
// button for playAgain
function playAgain() {
  location.reload();
}
