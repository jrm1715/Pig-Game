/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

3 Challenges

1. A player looses his ENTIRE score when he rolls two 6's in a row. After that, it's the
next player's turn. (Hint: Always save the previous dice roll in a seperate variable).

2. Add an input field to the HTML where players can set the winning score, so that they can Change
the predefined score of 100. (Hint: you can read that value with the .value property in Javascript.
This a good opportunity to use google to figure this out).

3. Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.)

*/

var scores, roundScore, activePlayer, gamePlaying, lastRolled;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    checkForDoubleSixRolled(dice, lastRolled);
    lastRolled = dice;

    updateRoundScore(dice);
  }
});

function checkForDoubleSixRolled(dice, lastRolled) {
  if (dice === 6 && lastRolled === 6) { // bug when player rolls a 6 and then a 5.
    roundScore = 0;
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    console.log('Double Sixes!');
    console.log('Dice: ' + dice);
    console.log('last: ' + lastRolled);
    nextPlayer();
  }
}

function updateRoundScore(dice) {
  //3. Update the round score IF the rolled number was not 1
  if (dice !== 1) {
    //Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //Next player
    nextPlayer();
  }
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying){
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    endOfGame();
  }
});

function endOfGame() {
  if(scores[activePlayer] >= 100){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    // Next player
    nextPlayer();
  }
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  lastRolled = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  lastRolled = 0;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
