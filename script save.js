function createPlayer(name, symbol) {
    return {name, symbol};
};

let playerX = createPlayer("", "X");
let playerO = createPlayer("", "O");
let victory = false;
let gameActive = false;

const startButton = document.getElementById("start-game-button");
startButton.focus();
const content = document.querySelector(".content");
const gridContainer = document.querySelector(".grid-container");
const card = document.querySelectorAll(".card");
const flipCard = document.querySelectorAll(".flip-card");
const flipCardFront = document.querySelectorAll(".flip-card-front");
const flipCardBack = document.querySelectorAll(".flip-card-back");

let playerTurn = document.createElement("p");
playerTurn.classList.add("player-turn");

// let playAgainButton = document.createElement("button");
// playAgainButton.classList.add("enter-input");
// playAgainButton.textContent = "Play Again?";


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
    function resetGameboard() {
        gameboardArray = new Array(9);
    }
    return {getGameboard, resetGameboard}   
})();

// RESET BOARD HERE==================================

const gameController = (function playsFirst() {
    const playerArray = new Array(2);

    function randomizeTurn() {
        let playerXPosition = Math.floor(Math.random() * 2);
        playerArray[playerXPosition] = playerX;
        if (playerXPosition === 0) {
            playerArray[1] = playerO;
        }
        else {
            playerArray[0] = playerO;
        }   
    }
    randomizeTurn();
    
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
                if (gameboard.getGameboard()[winCombos[i][0]] != undefined) {
                    if (gameboard.getGameboard()[winCombos[i][0]] === gameboard.getGameboard()[winCombos[i][1]] && gameboard.getGameboard()[winCombos[i][1]] === gameboard.getGameboard()[winCombos[i][2]]) {
                    victory = true;
                    playerTurn.textContent = `Victory! ${currentPlayer.name} won!`;
                    content.appendChild(playerTurn);
                    let playAgainButton = document.createElement("button");
                    playAgainButton.classList.add("enter-input");
                    playAgainButton.textContent = "Play Again?";
                    content.appendChild(playAgainButton);
                    
                    // PLAY AGAIN BUTTON==========================================================================
                    playAgainButton.addEventListener("click", (e) => {
                        victory = false;
                        randomizeTurn();
                        playAgainButton.remove();
                        card.forEach((card) => card.classList.remove("inactive"));
                        flipCard.forEach((flip) => flip.classList.remove("flipped"));
                        gridContainer.classList.remove("inactive");
                        gameboard.resetGameboard();
                        playerTurn.textContent = `${gameController.getPlayerArray()[0].name} plays next!`;
                        
                    })

                    }
                }
            }
    }

    return {getPlayerArray, victoryCheck, randomizeTurn}
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
        flipCard.querySelector(".flip-card-back").style.background = "linear-gradient(45deg, rgba(255, 0, 0, 0.4), rgba(255, 255, 255, 0.4))";
        flipCard.classList.add("inactive")


        playerTurn.textContent = `${playerO.name} plays next!`;
        content.appendChild(playerTurn);
    }
    else {
        flipCard.querySelector(".flip-card-back").textContent = "O";
        flipCard.querySelector(".flip-card-back").style.background = "linear-gradient(45deg, rgba(0, 0, 255, 0.4), rgba(255, 255, 255, 0.4))";
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

    if (i === 9 && victory === false) {``
        playerTurn.textContent = `It's a draw!`;
        content.appendChild(playerTurn);

        let resetPlayButton = document.createElement("button");
        resetPlayButton.classList.add("enter-input");
        resetPlayButton.textContent = "Play again?"




        content.appendChild(resetPlayButton);
        resetPlayButton.addEventListener("click", (e) => {
            i = 0;
            gameController.randomizeTurn();
            resetPlayButton.remove();
            card.forEach((card) => card.classList.remove("inactive"));
            flipCard.forEach((flip) => flip.classList.remove("flipped"));
            gridContainer.classList.remove("inactive");
            gameboard.resetGameboard();
            playerTurn.textContent = `${gameController.getPlayerArray()[0].name} plays next!`;
            
        })
    }

}))
