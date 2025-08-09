/* Board Module */

function Board()
{
    const rows = 3;
    const columns = 3
    let board = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => cell())
    );

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
        dropToken 
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

function GameController(player1 = "Player 1", player2 = "Player 2")
{
    const board = Board();

    const players = [
        {name: player1, token: "x"},
        {name: player2, token: "o"},
    ]

    let currentPlayer = players[0];

    function playersMove(row,column)
    {
        board.dropToken(currentPlayer.token, row,column)
        switchPlayer(currentPlayer)
    }

    function switchPlayer(player)
    {
        player === players[0] ? currentPlayer = players[1] : currentPlayer = players[0]
    }

    return{
        playersMove
    }
}

const game = GameController();
game.playersMove(1,1)
game.playersMove(1,1)
