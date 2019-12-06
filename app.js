/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();


//this is an anonymous function
//this is the click event but there are other events that you can add
//use querySelector when 
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying)
    {
            //random number
        var dice = Math.floor(Math.random() * 6) +1;
        //Display the result
        var diceDOM = document.querySelector('.dice');
        //showing the dice
        diceDOM.style.display = 'block';
        //changing the dice 
        diceDOM.src = 'dice-' +dice + '.png';


        //Update the round score if the rolled number was NOT a 1

        if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' +activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

        
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying)
    {
        //Add CURRENT score to global score
        scores[activePlayer] += roundScore;
        //Update the UI 
        document.querySelector('#score-' +activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer]>=20)
        {
            document.querySelector('#name-' +activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            //classList is used to access the class
            document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
        //Next Player
        nextPlayer();
        }
    }
});

function nextPlayer() 
{
    //Next player
    //Turnery operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0'; 
    //use querySelector because it is a class
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
        
    //Toggle switches the class if it's there, if it's not it ads it for both players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';
}
//you can write any function in the argument
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    document.querySelector('.dice').style.display = 'none';

    //change all to 0's, and this is faster than querySlector
    //This is used to get the element by ID
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //removing all the winners because you don't know who won
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document is the DOM selector
//document.querySelector('#current-' +activePlayer).textContent = dice;
//document.querySelector('#current-' +activePlayer).innerHTML = '<em>' + dice +'</em>';
//you are storing the number value of the DOM value of score in x
//var x = document.querySelector('#score-0').textContent;
//console.log(x);