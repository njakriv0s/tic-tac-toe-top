const gameboard = (function() {
    let gameboardArray = new Array(9);
    const getGameboard = () => gameboardArray;
    return {getGameboard}

})();

function createPlayer(name, symbol) {
    return {name, symbol};
};

// TEMPORARY

for (let i = 0; i <9; i++) {
    gameboard.getGameboard()[i] = i;
}

// TEMPORARY

let playerX = createPlayer("Nick", "X");
let playerO = createPlayer("Chris", "O");

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
    return {getPlayerArray}
})();


// DON'T FORGET TO COMMIT FROM HERE


let gameLength = gameboard.getGameboard().length;

let currentPlayer = gameController.getPlayerArray()[0];



for (let i = 0; i < gameLength; i++) {
    alert(gameboard.getGameboard());
    let playerChoice = prompt(`Turn ${i + 1}. ${currentPlayer.name} choose you placement`);
    gameboard.getGameboard()[playerChoice] = currentPlayer.symbol;

    currentPlayer = currentPlayer === gameController.getPlayerArray()[0] ? gameController.getPlayerArray()[1] : gameController.getPlayerArray()[0];
    
}

console.log(gameboard.getGameboard());

