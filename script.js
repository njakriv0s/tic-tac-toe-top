const gameboard = (function() {
    let gameboardArray = new Array(9);
    const getGameboard = () => gameboardArray;
    return {getGameboard}

})();

function createPlayer(name, symbol) {
    return {name, symbol};
};

let playerX = createPlayer("Nick", "X");
let playerO = createPlayer("Chris", "O");

const playTurn = (function playsFirst() {
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

console.log(playTurn.getPlayerArray());
