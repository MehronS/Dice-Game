'use strict';

// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`); // another way to do line 3
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const rollBtn = document.querySelector(`.btn--roll`);
const newBtn = document.querySelector(`.btn--new`);
const holdBtn = document.querySelector(`.btn--hold`);
// Starting conditions
score0El.textContent = 0; // JS will auto convert the numbers to strings
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

function togglePlayers() {
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

function swapReset() {
  // this function is invoked when a hold is pressed or a 1 is rolled.
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  togglePlayers();
}

function winnerLoser() {
  // this first changes the current box content to LOSER and then swaps the current players current box content to Winner.
  document.getElementById(`current--1`).textContent = `LOSER!`;
  document.getElementById(`current--0`).textContent = `LOSER!`;
  document.getElementById(`current--${activePlayer}`).textContent = `WINNER!`;
}

function init() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
}

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

init();

rollBtn.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`; // this will dynamically change the srouce of the picture depending on the roll of the dice.

    // 3. Check if the roll is 1; if true, switch players
    if (dice !== 1) {
      // add the dice roll to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // depending on whether active player is 0 or 1, the score changes dynamically
    } else {
      // switch to the next player
      swapReset();
    }
  }
});

holdBtn.addEventListener(`click`, function () {
  if (playing) {
    // 1. current active players score goes up by current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the socre is >= 100; if yes, end game, if not swapReset();
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add(`hidden`);
      winnerLoser();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else swapReset();
  }
});

newBtn.addEventListener(`click`, init);
