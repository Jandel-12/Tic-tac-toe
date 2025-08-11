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
    const printBoard = () => {
        console.log(board)
    }


    const dropToken = (token, row, column) => {
        const position = board[row][column];
        position.playerToken(token)
    }

    const clearBoard = () =>
    {
        board.forEach(row => row.map(cell => cell.resetValue()));
    }

    return{
        dropToken,
        getBoard,
        clearBoard,
        printBoard
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

    const resetValue = () =>
    {
        return value = ""
    }

    return {
        getValue, playerToken,resetValue
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
        if (gameOver) return;

        const grid = board.getBoard();
        if (!validMove(row, column, grid)) return;

        board.dropToken(currentPlayer.token, row, column);

        if (checkWinner(grid)) {
            gameOver = true;
            return { status: "win", winner: currentPlayer.name };
        }

        if (isBoardFull(grid)) {
            gameOver = true;
            return { status: "tie" };
        }

        switchPlayer();
        return { status: "nextTurn", player: currentPlayer.name };
    }

    function validMove(row, column, arr) {
        return !arr[row][column].getValue();
    }

    function checkWinner(grid) {
        const size = grid.length;
        const values = grid.map(row => row.map(cell => cell.getValue()));

        // Check rows & columns
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

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function reset()
    {
        gameOver = false;
        board.clearBoard();
    }

    return {
        playersMove,
        getBoard,
        getCurrentPlayer,
        reset
    };
}

function GameUI() {
    const game = GameController();
    const boardEl = document.querySelector(".board");
    const playerOneEl = document.querySelector(".playerOne");
    const playerTwoEl = document.querySelector(".playerTwo");
    const winnerDisplay = document.getElementById("winnerDisplay");

    function updateScreen() {
        boardEl.textContent = "";
        const Gameboard = game.getBoard();
        
        Gameboard.forEach((row, rIdx) => {
            row.forEach((cell, cIdx) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rIdx;
                cellButton.dataset.column = cIdx;
                cellButton.textContent = cell.getValue();
                boardEl.appendChild(cellButton);
            });
        });

        // Update active player display
        const current = game.getCurrentPlayer();
        playerOneEl.classList.toggle("active", current.name === "Player 1");
        playerTwoEl.classList.toggle("active", current.name === "Player 2");
    }

    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (selectedRow === undefined || selectedColumn === undefined) return;

        const result = game.playersMove(Number(selectedRow), Number(selectedColumn));
        
        if (result?.status === "win") {
            winnerDisplay.textContent = `The winner is ${result.winner}`;
        } else if (result?.status === "tie") {
            winnerDisplay.textContent = "It's a tie!";
        }

        updateScreen();
    }

    function updateStatus()
    {
        winnerDisplay.textContent = "";
    }

    document.getElementById("restartBtn").addEventListener("click", () => {
    startGame(); 
    });

    function startGame() {
    game.reset(); 
    updateScreen();
    updateStatus("Player 1's turn");
    }


    boardEl.addEventListener("click", clickHandler);
    updateScreen();
}

GameUI();





