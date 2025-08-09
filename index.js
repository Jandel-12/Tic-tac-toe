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
        const getBoard = board.map(row => row.map(column  => column.getValue));
        console.log(getBoard);
    }

    return{
        printBoard
    }
}

function cell(){
    let value = "";

    const getValue = () => {
        value
    }
    const playerToken = (player) => {
        value = player
    }

    return {
        getValue, playerToken
    }
}

const board = Board();
board.printBoard();