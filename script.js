let playerX = createPlayer("Nick", "X");
let playerO = createPlayer("Chris", "O");
let victory = false;
let gameActive = false;

const startButton = document.getElementById("start-game-button");

const gridContainer = document.querySelector(".grid-container");
// gridContainer.classList.add("inactive")

const card = document.querySelector(".card");
const flipCard = document.querySelector(".flip-card");
const flipCardFront = document.querySelector(".flip-card-front");
const flipCardBack = document.querySelector(".flip-card-back");

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

function createPlayer(name, symbol) {
    return {name, symbol};
};

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

function game() {
    let gameLength = gameboard.getGameboard().length;
    let currentPlayer = gameController.getPlayerArray()[0];

    let i  = 0;

    while (victory != true && i < 9) {
    
        let playerChoice = prompt(`Turn ${i + 1}. ${currentPlayer.name} choose you placement`);
        gameboard.getGameboard()[playerChoice - 1] = currentPlayer.symbol;
        i++
        gameController.victoryCheck()
        if (victory === false) {
            currentPlayer = currentPlayer === gameController.getPlayerArray()[0] ? gameController.getPlayerArray()[1] : gameController.getPlayerArray()[0];
    }

}
}


