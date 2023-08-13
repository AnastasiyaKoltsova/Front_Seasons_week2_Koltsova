const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status-text');
const restartBtn = document.querySelector('.restart-btn');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "";
const player1Symbol = "X";
const player2Symbol = "O";
let running = false;
let player1Name = "";
let player2Name = "";

function startGame() {
    player1Name = document.querySelector('#player1').value;
    player2Name = document.querySelector('#player2').value;

    if (player1Name.trim() === "" || player2Name.trim() === "") {
        const hintElement = document.querySelector('.hint');
        hintElement.textContent = "Введите имена обоих игроков!";
        return;
    }

    currentPlayer = player1Name;

    const hintElement = document.querySelector('.hint');
    hintElement.textContent = "";

    initializeGame();
}

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Ходит ${currentPlayer}`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] != '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer === player1Name ? player1Symbol : player2Symbol;
    cell.textContent = options[index];
}

function changePlayer() {
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    statusText.textContent = `Ходит ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === '' && cellB === '' && cellC === '') {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winner = currentPlayer === player1Name ? player1Name : player2Name;
        statusText.textContent = `${winner} выиграл!`;
        running = false;
    } else if (!options.includes('')) {
        statusText.textContent = 'Ничья!';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = player1Name;
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `Ходит ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

const startGameBtn = document.querySelector('.startGameBtn');
startGameBtn.addEventListener('click', startGame);
