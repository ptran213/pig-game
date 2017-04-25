/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceImage, player1, player2, hold, newGame;

diceImage = document.querySelector("img");
player1 = document.querySelector(".player-1-panel");
player2 = document.querySelector(".player-2-panel");
hold = document.querySelector(".btn-hold");
newGame = document.querySelector(".btn-new");

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector("#current-" + activePlayer).textContent = dice;
    document.querySelector("img").style.display = "block";
    diceImage.setAttribute('src', 'dice-' + dice + '.png');
    if(dice > 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

hold.addEventListener("click", function () {
    scores[activePlayer - 1] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer - 1];
    // if (activePlayer === 1) {
    //     activePlayer = 2;
    // } else if (activePlayer === 2) {
    //     activePlayer = 1;
    // }
    if (scores[activePlayer - 1] >= 20) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".btn-hold").style.display = "none";
        document.querySelector(".btn-roll").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        diceImage.style.display = "none";
    } else {
        nextPlayer();
    }
});

newGame.addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 1;
    diceImage.style.display = "none";
    document.querySelector("#score-1").textContent = 0;
    document.querySelector("#score-2").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    document.querySelector("#current-2").textContent = 0;
    document.querySelector("#name-1").textContent = "Player 1";
    document.querySelector("#name-2").textContent = "Player 2";
    document.querySelector(".btn-hold").style.display = "block";
    document.querySelector(".btn-roll").style.display = "block";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
}

function nextPlayer() {
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    roundScore = 0;
    diceImage.style.display = "none";
    player1.classList.toggle("active");
    player2.classList.toggle("active");
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#current-2').textContent = 0;
    // ====my old solution===
    // if (activePlayer === 1) {
    //     activePlayer = 2;
    //     player1.classList.toggle("active");
    //     player2.classList.toggle("active");
    // } else if (activePlayer === 2){
    //     activePlayer = 1;
    //     player1.classList.toggle("active");
    //     player2.classList.toggle("active");
    // }
}