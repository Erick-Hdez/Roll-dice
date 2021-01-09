'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const name0 = document.getElementById('name--0');
const name1 = document.getElementById('name--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variables
let scores, currentScore, activePlayer, playing;

// Functions

// Starting conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Start the game
init();

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a randoom dice roll
    let rolledDice = Math.trunc(Math.random() * 6) + 1;
    console.log(rolledDice);

    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${rolledDice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (rolledDice !== 1) {
      // Add rolledDice to current score
      currentScore += rolledDice;

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add the current score to active player's
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      dice.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } wins!`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

// Reset the game
btnNew.addEventListener('click', init);
