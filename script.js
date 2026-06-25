function createPlayer(name, symbol) {
    return {name, symbol};
};

let playerX = createPlayer("", "X");
let playerO = createPlayer("", "O");
let victory = false;
let gameActive = false;

const startButton = document.getElementById("start-game-button");
const content = document.querySelector(".content");
const gridContainer = document.querySelector(".grid-container");
const card = document.querySelectorAll(".card");
const flipCard = document.querySelectorAll(".flip-card");
const flipCardFront = document.querySelectorAll(".flip-card-front");
const flipCardBack = document.querySelectorAll(".flip-card-back");

let playerTurn = document.createElement("p");
playerTurn.classList.add("player-turn");


startButton.addEventListener("click", (e) =>{
    gameActive = true;
    startButton.remove();
    let contentInside = document.createElement("div");
    contentInside.classList.add("content-inside");
    content.appendChild(contentInside)

    let input = document.createElement("input");
    input.classList.add("player-name-input");
    input.placeholder = "Player 1 name";
    contentInside.appendChild(input);
    input.focus();
    let enterInput = document.createElement("button");
    enterInput.classList.add("enter-input");
    enterInput.textContent = "Enter name"
    contentInside.appendChild(enterInput);

    enterInput.addEventListener("click", (e) => {
        if (playerX.name === "") {
            playerX.name = input.value;
            input.value = "";
            input.focus();
            input.placeholder = "Player 2 name";
        }
        else {
            playerO.name = input.value;
            input.remove();
            enterInput.remove();
            contentInside.remove();
            gridContainer.classList.remove('inactive');
            playerTurn.textContent = `${gameController.getPlayerArray()[0].name} plays next!`;
            content.appendChild(playerTurn);
        }
    })
});

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
                    victory = true;
                    playerTurn.textContent = `Victory! ${currentPlayer.name} won!`;
                    content.appendChild(playerTurn);
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

card.forEach((flipCard, index) => flipCard.addEventListener("click", (e) => {
    i++;
    console.log(i);
    flipCard.querySelector(".flip-card").classList.add("flipped");
    gameboard.getGameboard()[index] = currentPlayer.symbol;
    if(currentPlayer === playerX) {
        flipCard.querySelector(".flip-card-back").textContent = "X";
        flipCard.querySelector(".flip-card-back").style.background = "linear-gradient(45deg, red, white)";
        flipCard.classList.add("inactive")


        playerTurn.textContent = `${playerO.name} plays next!`;
        content.appendChild(playerTurn);
    }
    else {
        flipCard.querySelector(".flip-card-back").textContent = "O";
        flipCard.querySelector(".flip-card-back").style.background = "linear-gradient(45deg, blue, white)";
        flipCard.classList.add("inactive")

        playerTurn.textContent = `${playerX.name} plays next!`;
        content.appendChild(playerTurn);
    }

    gameController.victoryCheck()

    if (victory === false) {
            currentPlayer = currentPlayer === gameController.getPlayerArray()[0] ? gameController.getPlayerArray()[1] : gameController.getPlayerArray()[0];
        }
    else {
        gridContainer.classList.add("inactive");
    }

    if (i === 9) {
        playerTurn.textContent = `It's a draw!`;
        content.appendChild(playerTurn);
    }

}))
