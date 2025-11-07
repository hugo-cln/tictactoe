const BOARD_SIZE = 3;

let playerPawn;
let boardContainer;
let playButton;
let messageElement;

let boardState = [];

function startGame() {
    
}

function initBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        boardState[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            boardState[row][col] = "";

            let cell = document.createElement('div');
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;

            boardContainer.appendChild(cell);
        }
    }

}

function playTurn() {

}

function showMessage() {

}

window.onload = () => {
    playerPawn = document.getElementById('player-pawn');
    boardContainer = document.getElementById('board');
    messageElement = document.getElementById('message');
    playButton = document.getElementById('play-button');

    playButton.onclick = startGame;

    initBoard();
    playButton.disabled = false;
}