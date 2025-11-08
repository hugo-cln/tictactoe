const BOARD_SIZE = 3;

let playerPawn;
let boardContainer;
let playButton;
let messageElement;

let boardState = [];
let computerPawn;
let isGameStarted = false;
let isComputerTurn = false;

// Board generation
function initBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        boardState[row] = [];
        
        let rowDiv = document.createElement('div');
        rowDiv.className = "row";
        
        for (let col = 0; col < BOARD_SIZE; col++) {
            let cell = document.createElement('span');

            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.onclick = () => handlePlayerTurn(cell);
            
            rowDiv.appendChild(cell);
            boardState[row][col] = {value: "", element: cell};
        }
        
        boardContainer.appendChild(rowDiv);
    }
}

function resetBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (const cell of boardState[row]) {
            cell.value = "";
            cell.element.innerText = "";
        }
    }
}

// Game state handling
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
    let message = winner ? `${winner} à gagné !` : "Personne n'a gagné...";
    
    showMessage(message);

    isGameStarted = false;
    isComputerTurn = false;
}

// Analyze the board for a tie or a winner.
// Returns true if the game is finished, false otherwise.
function isGameFinished() {
    let availableCellsCount = getAvailableCells().length;

    // Game cannot be won before the first player placed BOARD_SIZE pawns.
    let maxCells = Math.pow(BOARD_SIZE, 2);
    if (maxCells - availableCellsCount < (BOARD_SIZE * 2) - 1) {
        return false;
    }

    // Check for a winner
    let rowFirstPawn;
    for (let row = 0; row < BOARD_SIZE; row++) {
        rowFirstPawn = boardState[row][0].value;

        if (rowFirstPawn === '') continue;
        
        if (boardState[row].filter(cell => cell.value === rowFirstPawn).length === BOARD_SIZE) {
            finishGame(getPlayerNameFromPawn(rowFirstPawn));
            return true;
        }
    }

    let colFirstPawn;
    for (let col = 0; col < BOARD_SIZE; col++) {
        colFirstPawn = boardState[0][col].value;

        if (colFirstPawn === '') continue;

        if(getColumnCells(col).filter(cell => cell.innerText === colFirstPawn).length === BOARD_SIZE) {
            finishGame(getPlayerNameFromPawn(colFirstPawn));
            return true;
        }
    }

    // Diagonals wins
    let pawn = boardState[0][0].value;

    if (pawn !== '' && checkDiagonal(pawn, true)) {
        finishGame(getPlayerNameFromPawn(pawn));
        return true;
    } else {
        pawn = boardState[BOARD_SIZE - 1][0].value;

        if (pawn !== '' && checkDiagonal(pawn, false)) {
            finishGame(getPlayerNameFromPawn(pawn));
            return true;
        }
    }

    // Check if the board is full (tie)
    if (availableCellsCount === 0) {
        finishGame(null);
        return true;
    }

    return false;
}

function checkDiagonal(pawn, isMainDiagonal) {
    let pawnCount = 0;

    for (let i = 0; i < BOARD_SIZE; i++) {
        let cell = isMainDiagonal
            ? boardState[i][i]
            : boardState[i][BOARD_SIZE - i - 1];
        
        if (cell.value === pawn) {
            pawnCount++;
        }
    }

    return pawnCount === BOARD_SIZE;
}

// Pawn handling
// Return true if the pawn has been placed, false otherwise.
function placePawn(cell, pawn) {
    let row = cell.dataset.row;
    let col = cell.dataset.col;

    if (boardState[row][col].value !== "") return false;

    boardState[row][col].value = pawn;
    cell.innerText = pawn;

    return true;
}

function playComputerTurn() {
    let cells = getAvailableCells();
    let randomCell = cells[getRandomInt(cells.length)];

    if (placePawn(randomCell, computerPawn)) {
        if (!isGameFinished()) {
            isComputerTurn = false;
            showMessage("C'est à vous de jouer.");
        }
    }
}

function handlePlayerTurn(cell) {
    if (!isGameStarted || isComputerTurn) return;

    if (placePawn(cell, playerPawn.value)) {
        if (!isGameFinished()) {
            isComputerTurn = true;
            showMessage("C'est à l'ordinateur de jouer.");
            // Arbitrary waiting time
            setTimeout(playComputerTurn, 500);
        }
    }
}

// Utilitaries functions
function getAvailableCells() {
    return Array.from(boardContainer.getElementsByTagName('span')).filter(cell => cell.innerText === ''); 
}

function getColumnCells(col) {
    return Array.from(boardContainer.getElementsByTagName('span')).filter(cell => Number(cell.dataset.col) === col); 
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#try_it
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getPlayerNameFromPawn(pawn) {
    if (pawn === computerPawn) {
        return "L'ordinateur";
    } else {
        return "Le joueur";
    }
}

function showMessage(message) {
    messageElement.innerText = message;
}

// Startup
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