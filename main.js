const BOARD_SIZE = 3;

let playerPawn;
let boardContainer;
let playButton;
let messageElement;

let boardState = [];
let computerPawn;
let isGameStarted = false;
let isComputerTurn = false;


function initBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        boardState[row] = [];
        
        let rowDiv = document.createElement('div');
        rowDiv.className = "row";
        
        for (let col = 0; col < BOARD_SIZE; col++) {
            boardState[row][col] = "";
            
            let cell = document.createElement('span');
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

    for (let cell of boardContainer.getElementsByTagName('span')) {
        cell.innerText = "";
    }
}

function startGame() {
    playerPawn.disabled = true;
    playButton.innerText = "Relancer la partie";

    // Reset board
    resetBoard();

    computerPawn = playerPawn.value === 'o' ? 'x' : 'o';
    isGameStarted = true;
    showMessage("Cliquez sur une cellule pour placer votre pion.");
}

function finishGame(winner) {
    if (winner === null) {
        showMessage("Personne n'a gagné...");
    
    } else {
        showMessage(`${winner} à gagné !`);
    }

    isGameStarted = false;

}


// Analyze the board for a tie or a winner.
// Returns true if the game is finished, false otherwise.
function analyzeBoard() {
    // Check if the board is full (tie)
    availableCells = boardContainer.getElementsByTagName('span').filter(cell => cell.innerText === '');
    if (availableCells.length === 0) {
        finishGame(null);
        return true;
    }

    // Check for a winner
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {

        }
    }
}

function placePawn(cell, pawn) {
    let row = cell.dataset.row;
    let col = cell.dataset.col;

    if (boardState[row][col] !== "") return;

    boardState[row][col] = pawn;
    cell.innerText = pawn;

    analyzeBoard();
}

function getAvailableCells() {
    let availablesCells = [];

    for (let cell of boardContainer.getElementsByTagName('span')) {
        if (cell.innerText === "") {
            availablesCells.push(cell);
        }
    }

    return availablesCells;    
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#try_it
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function playComputerTurn() {
    let cells = getAvailableCells();
    let randomCell = cells[getRandomInt(cells.length)];

    placePawn(randomCell, computerPawn);

    isComputerTurn = false;
    showMessage("C'est à vous de jouer.");
}

function handlePlayerTurn(cell) {
    if (!isGameStarted || isComputerTurn) return;

    placePawn(cell, playerPawn.value);

    isComputerTurn = true;
    showMessage("C'est à l'ordinateur de jouer.");
    setTimeout(playComputerTurn, 1000);
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