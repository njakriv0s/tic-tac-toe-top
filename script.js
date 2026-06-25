function createPlayer(name, symbol) {
    return {name, symbol};
};

let playerX = createPlayer("Nick", "X");
let playerO = createPlayer("Chris", "O");
let victory = false;
let gameActive = false;

const startButton = document.getElementById("start-game-button");
const gridContainer = document.querySelector(".grid-container");
const card = document.querySelectorAll(".card");
const flipCard = document.querySelectorAll(".flip-card");
const flipCardFront = document.querySelectorAll(".flip-card-front");
const flipCardBack = document.querySelectorAll(".flip-card-back");


startButton.addEventListener("click", (e) =>{
    gameActive = true;
    startButton.remove();
    gridContainer.classList.remove('inactive');

})

const gameboard = (function() {
    let gameboardArray = new Array(9);
    const getGameboard = () => gameboardArray;
    return {getGameboard}

})();

const gameController = (function playsFirst() {
    const playerArray = new Array(2);
    let playerXPosition = Math.floor(Math.random() * 2);
    playerArray[playerXPosition] = playerX;
    if (playerXPosition === 0) {
        playerArray[1] = playerO;
    }
    else {
        playerArray[0] = playerO;
    }
    const getPlayerArray = () => playerArray;

    // FOR SHORTHAND
    let gp = gameboard.getGameboard();

    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const comboLength = winCombos.length;

    function victoryCheck() {
            for (let i = 0; i < comboLength; i++) {
                if (gp[winCombos[i][0]] != undefined) {
                    if (gp[winCombos[i][0]] === gp[winCombos[i][1]] && gp[winCombos[i][1]] === gp[winCombos[i][2]]) {
                    console.log("Victory")
            
                    victory = true;
                    console.log(victory);
                    }
                }
            }
    }

    return {getPlayerArray, victoryCheck}
})();

let gameLength = gameboard.getGameboard().length;
let currentPlayer = gameController.getPlayerArray()[0];
const getCurrentPlayer = () => currentPlayer;
let i  = 0;

card.forEach((flipCard) => flipCard.addEventListener("click", (e) => {
    flipCard.querySelector(".flip-card").classList.add("flipped")
    console.log(currentPlayer);
    if(currentPlayer === playerX) {
        flipCard.querySelector(".flip-card-back").textContent = "X";
        flipCard.querySelector(".flip-card-back").style.background = "linear-gradient(45deg, red, white)";
        flipCard.classList.add("inactive")
    }
    else {
        flipCard.querySelector(".flip-card-back").textContent = "O";
        flipCard.querySelector(".flip-card-back").style.background = "linear-gradient(45deg, blue, white)";
        flipCard.classList.add("inactive")
    }

    currentPlayer = currentPlayer === gameController.getPlayerArray()[0] ? gameController.getPlayerArray()[1] : gameController.getPlayerArray()[0];

}))



function game() {
    // let gameLength = gameboard.getGameboard().length;
    // let currentPlayer = gameController.getPlayerArray()[0];
    // const getCurrentPlayer = () => currentPlayer;
    // let i  = 0;

    while (victory != true && i < 9) {
    
        let playerChoice = prompt(`Turn ${i + 1}. ${currentPlayer.name} choose you placement`);
        gameboard.getGameboard()[playerChoice - 1] = currentPlayer.symbol;
        i++
        gameController.victoryCheck()
        if (victory === false) {
            currentPlayer = currentPlayer === gameController.getPlayerArray()[0] ? gameController.getPlayerArray()[1] : gameController.getPlayerArray()[0];
        }
    }
    return {getCurrentPlayer}
}




