const ticTacToe = ( function() { 
    let gameBoard,player1,player2,currentPlayer,gameOver;

    const GameBoard = (() => {
        const board = ['','','','','','','','',''];

        const getBoard = () => board;

        const setCell = (index,mark) => {
            if(board[index] === ''){
                board[index] = mark;
                return true;
            }
            return false;
        };

        const resetBoard = () => {
            for(let i = 0; i < board.length; i++){
                board[i] = '';
            }
        };

        return { getBoard,setCell,resetBoard};

    })();

    const Player = (name,mark) => {
        return {name,mark};
    };

    const displayController = (() => {
        const cells = document.querySelectorAll(',cell');
        const messageELement = document.querySelector('.turn h3');
        const player1NameInput = document.getElementById('player-x-name');
        const player2NameInput = document.getElementById('player-o-name');
        const startButtons = document.querySelectorAll('.star-game');
        const resetButton = document.querySelector('.reset-game');

        const updateBoard = () => {
            const board = GameBoard.getBoard();
            cells.forEach((cell,index) => {
                cell.textContent = board[index];
            });
        };

        const setMessage = (message) => {
            messageELement.innerHTML = message;
        };

        const bindEvemts = () => {

        };

        return { updateBoard,setMessage,bindEvemts };
    })();

 return { init };
})();

ticTacToe.init();