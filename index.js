/* Board Module */

function Board()
{
    const rows = 3;
    const columns = 3
    let board = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => cell())
    );

    const getBoard = () =>
    {
        return board
    }

    const printBoard = () =>
    {
        const getBoard = board.map(row => row.map(column  => column.getValue()));
        console.log(getBoard);
    }

    const dropToken = (token, row, column) => {
        const position = board[row][column];
        position.playerToken(token)
        printBoard();
    }

    return{
        printBoard,
        dropToken,
        getBoard
    }
}

function cell(){
    let value = "";

    const getValue = () => {
        return value
    }
    const playerToken = (player) => {
        return value = player
    }

    return {
        getValue, playerToken
    }
}


/* Game controller */

function GameController(player1 = "Player 1", player2 = "Player 2") {
    const board = Board();

    const players = [
        { name: player1, token: "x" },
        { name: player2, token: "o" },
    ];

    let currentPlayer = players[0];
    let gameOver = false;

    function playersMove(row, column) {
        if (gameOver) {
            console.log("Game over! Please restart.");
            return;
        }

        const grid = board.getBoard();

        if (!validMove(row, column, grid)) {
            console.log("Please pick another position");
            return;
        }

        // Place the token first
        board.dropToken(currentPlayer.token, row, column);

        // Check for winner
        if (checkWinner(grid)) {
            const winnerDisplay = document.getElementById("winnerDisplay");
            winnerDisplay.textContent = `The winner is ${currentPlayer.name}`
            gameOver = true;
            return;
        }

        // Check for tie
        if (isBoardFull(grid)) {
            console.log("It's a tie!");
            gameOver = true;
            return;
        }

        // Switch to next player
        switchPlayer();
    }

    function validMove(row, column, arr) {
        return !arr[row][column].getValue();
    }

    function checkWinner(grid) {
        const size = grid.length;
        const values = grid.map(row => row.map(cell => cell.getValue()));

        // Check rows and columns
        for (let i = 0; i < size; i++) {
            if (values[i][0] && values[i].every(v => v === values[i][0])) return true;
            if (values[0][i] && values.every(row => row[i] === values[0][i])) return true;
        }

        // Check diagonals
        if (values[0][0] && values.every((row, idx) => row[idx] === values[0][0])) return true;
        if (values[0][size - 1] && values.every((row, idx) => row[size - 1 - idx] === values[0][size - 1])) return true;

        return false;
    }

    function isBoardFull(grid) {
        return grid.every(row => row.every(cell => cell.getValue()));
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    function getBoard() {
        return board.getBoard();
    }

    return {
        playersMove,
        getBoard
    };
}




function GameUI(){
    const game = GameController();

    const Gameboard = game.getBoard();

    const board = document.querySelector(".board");
    const updateScreen = () =>{

        board.textContent = "";

        Gameboard.forEach((row, rIdx) => {

            row.forEach((cell, cIdx) => 
            {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rIdx;
                cellButton.dataset.column = cIdx;
                cellButton.textContent = cell.getValue();
                board.appendChild(cellButton);
            }
            )
        });
    }
     function clickHandler(e)
    {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        // Make sure I've clicked a column and not the gaps in between
        if (!selectedColumn && selectedColumn) return;
        
        game.playersMove(selectedRow,selectedColumn);
        updateScreen(); 
    }
    board.addEventListener('click', clickHandler)

    updateScreen();
    
}

const game1 = GameUI();




