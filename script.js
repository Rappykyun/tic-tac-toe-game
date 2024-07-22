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
        const cells = document.querySelectorAll('.cell');
        const messageELement = document.querySelector('.turn h3');
        const player1NameInput = document.getElementById('player-x-name');
        const player2NameInput = document.getElementById('player-o-name');
        const startButtons = document.querySelectorAll('.start-game');
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

        const bindEvents = () => {
            cells.forEach((cell , index) => {
                cell.addEventListener('click' , () => {
                    if(!gameOver && GameBoard.setCell(index , currentPlayer.mark)){
                        updateBoard();
                        checkGameStatus();
                        if(!gameOver){
                            switchPlayer();
                        }
                    }

                });
            });
            startButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const player = button.dataset.player;
                    if (player === 'x') {
                        player1 = Player(player1NameInput.value || 'Player X', 'X' );
                    } else {
                        player2 = Player(player2NameInput.value || 'Player O', 'O');
                    }
                    if(player1 && player2){
                        startGame();
                    }
                });
            });
            resetButton.addEventListener('click',resetGame);
        };

        return { updateBoard,setMessage,bindEvents };
    })();

    const startGame = () => {
        gameOver = false;
        currentPlayer = player1;
        GameBoard.resetBoard();
        displayController.updateBoard();
        displayController.setMessage(`It's <span class="active-player">${currentPlayer.name}</span>'s turn`)
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2: player1;
        displayController.setMessage(`It's <span class="active-player">${currentPlayer.name}</span>'s turn`)
    }

    const checkGameStatus = () => {
        const board = GameBoard.getBoard();
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        for (let pattern of winPatterns){
            if(board[pattern[0]] !== '' &&
                board[pattern[0]] === board[pattern[1]] &&
                board[pattern[1]] === board[pattern[2]]){
                    gameOver = true;
                    displayController.setMessage(`${currentPlayer.name} wins!`);
                    return;
                }
        }
        if(!board.includes('')){
            gameOver = true;
            displayController.setMessage(`It's a tie!`);
        }
    };
    const resetGame = () => {
        player1 = null;
        player2 = null;
        GameBoard.resetBoard();
        displayController.setMessage("Enter player names and click 'Start Game'");
        gameOver = true;
    };

    const init = () => {
        displayController.bindEvents();
        resetGame();
    }

 return { init };
})();

ticTacToe.init();