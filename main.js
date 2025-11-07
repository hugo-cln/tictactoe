const BOARD_SIZE = 3;

let playerPawn;
let boardContainer;
let playButton;
let messageElement;

let boardState = [];
let computerPawn;
let gameStarted = false;


function initBoard() {
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        boardState[row] = [];
        
        let rowDiv = document.createElement('div');
        rowDiv.className = "row";
        
        for (let col = 0; col < BOARD_SIZE; col++) {
            boardState[row][col] = "";
            
            let cell = document.createElement('div');
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.onclick = () => handlePlayerTurn(cell);
            
            rowDiv.appendChild(cell);
        }
        
        boardContainer.appendChild(rowDiv);
    }
}
// A optimiser
function resetBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            boardState[row][col] = "";
        }
    }

    for (let row of boardContainer.children) {
        for (let cell of row.children) {
            cell.innerText = "";
        }
    }
}

function startGame() {
    playerPawn.disabled = true;
    playButton.innerText = "Relancer la partie";

    // Reset board
    resetBoard();

    gameStarted = true;
    showMessage("Cliquez sur une cellule pour placer votre pion.");
}

function playTurn() {

}

function handlePlayerTurn(cell) {
    if (!gameStarted) return;

    let row = cell.dataset.row;
    let col = cell.dataset.col;

    if (boardState[row][col] !== "") return;

    boardState[row][col] = playerPawn.value;
    cell.innerText = playerPawn.value;

}

function showMessage(message) {
    messageElement.innerText = message;

}

window.onload = () => {
    playerPawn = document.getElementById('player-pawn');
    boardContainer = document.getElementById('board');
    messageElement = document.getElementById('message');
    playButton = document.getElementById('play-button');

    playButton.onclick = startGame;

    initBoard();
    playButton.disabled = false;
    showMessage("Choississez un pion et cliquez sur Jouer pour commencer !");
}