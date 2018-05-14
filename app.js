/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores = [0, 0],
    roundScore = 0,
    activePlayer = 0,
    oldDice = 0,
    winningScore;

init();

document.getElementsByClassName('btn-roll')[0].addEventListener('click', () => {
  let dice = Math.floor(Math.random() * 6 + 1);
  document.getElementsByClassName('dice')[0].style.display = 'block';
  document.getElementsByClassName('dice')[0].src = `../img/dice-${dice}.png`;

  if(dice === 6 && oldDice === 6){
    scores[activePlayer] = 0;
    changePlayer('fail');
  }else if(dice != 1){
    roundScore += dice;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    document.getElementsByClassName('dice')[0].style.top = '175px';
    document.getElementsByClassName('dice')[0].style.boxShadow = '0px 10px 60px rgba(0, 0, 0, 0.10)';
  }else{
    changePlayer('fail');
  }
  oldDice = dice;
});

document.getElementsByClassName('btn-hold')[0].addEventListener('click', changePlayer);

document.getElementsByClassName('btn-new')[0].addEventListener('click', init);
function changePlayer(msg){

  let input = document.getElementById('winning-score').value;

  if(input){
    winningScore = input;
  }else{
    winningScore = 100;
  }

  if (roundScore != 0){

    if(msg == 'fail'){
      document.getElementsByClassName('dice')[0].style.top = '275px';
      document.getElementsByClassName('dice')[0].style.boxShadow = '0px 10px 60px red';
      document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
      document.getElementById(`current-${activePlayer}`).textContent = 0;
    }else{
      scores[activePlayer] += roundScore;
      document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
      document.getElementById(`current-${activePlayer}`).textContent = 0;
    }
    
  }

  if(scores[activePlayer] >= winningScore){
    document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
    document.getElementsByClassName(`player-${activePlayer}-panel`)[0].classList.toggle('winner');
    document.getElementsByClassName(`player-${activePlayer}-panel`)[0].classList.remove('active');
    document.getElementsByClassName('btn-roll')[0].disabled = true;
    document.getElementsByClassName('btn-hold')[0].disabled = true;
    document.getElementsByClassName('dice')[0].style.display = 'none';
  }else{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementsByClassName(`player-0-panel`)[0].classList.toggle('active');
    document.getElementsByClassName(`player-1-panel`)[0].classList.toggle('active');
  }
}

function init(){
  document.getElementsByClassName(`player-${activePlayer}-panel`)[0].classList.remove('winner');
  document.getElementsByClassName(`player-${activePlayer}-panel`)[0].classList.remove('active');
  document.getElementsByClassName(`player-0-panel`)[0].classList.add('active');
  document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
  document.getElementById(`score-0`).textContent = 0;
  document.getElementById(`score-1`).textContent = 0;
  document.getElementById(`current-0`).textContent = 0;
  document.getElementById(`current-1`).textContent = 0;
  document.getElementsByClassName('btn-roll')[0].disabled = false;
  document.getElementsByClassName('btn-hold')[0].disabled = false;

  document.getElementsByClassName('dice')[0].style.display = 'none';

  scores = [0, 0],
  roundScore = 0,
  activePlayer = 0;
}