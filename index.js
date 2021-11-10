//this will shows the status of game played recently or (current status of game)
const statusDisplay = document.querySelector('.game--status');

let gameActive = true; //this shows that the game has Started
let currentPlayer = "X"; //the game will start from 'Player X'
let gameState = ["", "", "", "", "", "", "", "", ""]; //this shows that the cells are empty

const winningMessage = () => `Player ${currentPlayer} has won!`; // this shows winning game message & which current Player has won
const drawMessage = () => `Game ended in a draw!`;              // this shows the game is draw
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`; //this shows the current Player turn

// this function shows the Current Player Turn i.e ('Player X'/'Player O')
statusDisplay.innerHTML = currentPlayerTurn();

//this is for the winning conditions of the game
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// this handleCellPlayed function is for , when player click on cell then it will start work
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// this handleCellPlayed function is for when the 'Player X'/'Player O' click on cell then its worked
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn(); //this shows the which player turn
}

// this handleResultValidation function will check the condition of all the cells
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++)
    {
        const winCondition = winningConditions[i]; 
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') 
        {
            continue;
        }
        if (a === b && b === c) //all 3 cells are the same, which fullfils the win condition
        {
            roundWon = true;
            break;
        }
    }
    // this will check that , if player has won 
    if (roundWon)
    {
        statusDisplay.innerHTML = winningMessage(); // this will show , which player has won message
        gameActive = false; //or it will continue the game
        return;
    }
    // this will check that , game was draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) 
    {
        statusDisplay.innerHTML = drawMessage(); // this will show , the game has Draw
        gameActive = false; //or it will continue the game
        return;
    }

    handlePlayerChange(); 
}

// this handleCellClick function will work when a particular cell is clicked by Player
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) 
    {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// this handleRestartGame function will work when we restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

}
// querySelectorAll('.cell') verifies that the last element in each cell & 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// 
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
 