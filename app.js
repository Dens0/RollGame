/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL)BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, gamePlaying, maxScore;
gamePlaying = true;
maxScore=100;
init();


function init() {


  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  document.getElementById(`name-0`).textContent = `Player 1`;
  document.getElementById(`name-1`).textContent = `Player 2`;

}


handleRoll = () => {
  if (gamePlaying === true) {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    let diceDOmm = document.getElementById('dice-2');
    let diceDOm = document.getElementById('dice-1');

console.log(dice2,dice1)
    diceDOmm.src = `dice-${dice1}.png`;
    diceDOm.src = `dice-${dice2}.png`;
    if (dice1 !== 1 && dice2 !== 1 || dice1!==1 || dice2!==1)  {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = `${roundScore}`;
      console.log(roundScore);
    } else {

      nextPlayer();
    }

  }
};
handleHold = () => {
  if (gamePlaying === true) {

    scores[activePlayer] += roundScore;

    document.getElementById(`score-${activePlayer}`).textContent = `${scores[activePlayer]}pkt`;
    console.log(maxScore);
    if (scores[activePlayer] >= maxScore) {
      console.log(`Player ${activePlayer} has won the GAME`);
      document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer + 1} has won the GAME`;
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector(`.player-1-panel`).classList.toggle('winner');
      gamePlaying = false;


    } else {
      nextPlayer();
    }
  }
};
nextPlayer = () => {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector(`.player-1-panel`).classList.toggle('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  let diceDOm = document.querySelector('.dice');
  diceDOm.style.display = 'none';

  // diceDOm.style.display = 'none';
};

function addMaxScore(e) {
  e.preventDefault();
  let maxValue = document.querySelector('.maxscore--input').value;

  console.log(maxValue);
  maxScore = maxValue;
};


document.querySelector('.maxScore-btn').addEventListener('click', addMaxScore);
document.querySelector('.btn-roll').addEventListener('click', handleRoll);
document.querySelector('.btn-hold').addEventListener('click', handleHold);

document.querySelector('.btn-new').addEventListener('click', init);


