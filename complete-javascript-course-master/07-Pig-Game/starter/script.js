'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const score0Element = document.getElementById('score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, curScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  curScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');

  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle() -> if a class is there, it will remove it, else it will add it
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceVal = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceVal}.png`;

    if (diceVal !== 1) {
      curScore += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent =
        curScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
