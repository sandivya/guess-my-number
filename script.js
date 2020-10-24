'use strict';

const SECRET_NUMBER = Math.floor(Math.random() * 20) + 1;
let score = 10;
let highScore = 0;

if (typeof window !== 'undefined') {
  highScore = Number(localStorage.getItem('highScore'))
};

document.querySelector('.highscore').textContent = highScore
const decrementScore = () => (--score);

const againHandler = () => {
  return location.reload()
};

const displayMessage = (message) => {
  document.querySelector('.message').textContent = message
}

const guessNumberHandler = () => {
  const guessedNumber = Number(document.querySelector('.guess').value);

  if (score < 1) {
    displayMessage('Maximum tries exceeded, try Again!');
  } else {
    if (!guessedNumber) {
      displayMessage('Put in your best guess.');
    }
    else if (guessedNumber < 1 || guessedNumber > 20) {
      displayMessage('Guess between 1 and 20.');
    }
    else if (guessedNumber !== SECRET_NUMBER) {
      displayMessage((guessedNumber > SECRET_NUMBER) ? 'Too High!' : 'Too Low!');
      document.querySelector('.score').textContent = decrementScore();
    }
    else {
      displayMessage('Correct Number!');
      document.querySelector('.number').textContent = SECRET_NUMBER;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highScore) {

        if (typeof window !== 'undefined') {
          localStorage.setItem('highScore', score);  
        }
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }
    }
  }

};

document.querySelector('.check').addEventListener('click', guessNumberHandler);
document.querySelector('.again').addEventListener('click', againHandler)