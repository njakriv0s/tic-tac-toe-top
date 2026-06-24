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

console.log(playerX.symbol);
console.log(playerO.name);

console.log(gameboard.getGameboard())
