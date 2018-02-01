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

/*
  TODO:
  - Add a timer function. When the player's turn starts. The timer starts until
    their turn has ended (i.e. the player hits HOLD or rolles two 1's or 6's).
  - Create a function called 'hideDice' to tidy up code using DRY standards.

*/

let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. Random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    checkIfDoubleSixesRolled(dice1, dice2);
    updateRoundScore(dice1, dice2);
  }
});

function checkIfDoubleSixesRolled(dice1, dice2) {
  if (dice1 === 6 && dice2 === 6) {
    roundScore = 0;
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    nextPlayer();
  }
}

function updateRoundScore(dice1, dice2) {
  //3. Update the round score IF the rolled number was not 1
  if (dice1 !== 1 || dice2 !== 1) {
    //Add score
    roundScore += dice1 + dice2;
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
  let maxScore = document.getElementById('max-score').value;
  if(scores[activePlayer] >= maxScore){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
  lastRolledDice = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  lastRolledDice = 0;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

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
