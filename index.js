// DOM elements
const gridContainer = document.getElementById('grid-container');
const playerTurn = document.getElementById('turn');
const winner = document.getElementById('winner');

function createBoard() {
  // Create 9 grid items
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Create a new div element
      const gridItem = document.createElement('div');
      
      // Add Tailwind classes to the grid item
      gridItem.classList.add('bg-blue-500', 'text-white', 'p-12', 'text-center', 'hover:cursor-pointer');

      gridItem.addEventListener('click', () => {
        if (game.isBoardEmpty(i, j) == '') {
          if (game.playerTurn() == 0) {
            gridItem.textContent = 'X';
            game.updateBoard(i, j, 'X');
          } else {
            gridItem.textContent = 'O';
            game.updateBoard(i, j, 'O');
          }
          game.updateTurn();
          ScreenController.updateWinner(game.checkWinner());
          ScreenController.updatePlayerTurn(game.playerTurn());
        }
      })
      // Append the grid item to the grid container
      gridContainer.appendChild(gridItem);
    }
  }
}

const game = (function() {
  let turn = 0;
  let board = [['','',''],['','',''],['','','']];
  player = [0, 1];

  const playerTurn = () => player[turn];
  const updateTurn = () => turn < 1 ? turn++ : turn = 0;
  // Update board array with user input
  const updateBoard = (row, col, turn) => board[row][col] = turn;
  // Checks to see if the board is empty before allowing user to place a input
  const isBoardEmpty = (row, col) => board[row][col] == undefined ? '' : board[row][col];
  // Checks the board to see if there is a winner
  const checkWinner = () => {
    // [x, x, x]
    // [o, x, o]
    // [x, o, o]
    // Check rows
    for (let i = 0; i < 3; i++) {
      // if element in the row is not empty and the element is the same as the other element in the row return element
      if (board[i][0] && board[i][0] == board[i][1] && board[i][0] === board[i][2]) return board[i][0];
    }
    
    // Check columns
    for (let i = 0; i < 3; i++) {
      // if element in the row is not empty and the element is the same as the other element in the row return element
      if (board[0][i] && board[0][i] == board[1][i] && board[0][i] === board[2][i]) return board[0][i];
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2];
    }
    return null;
  }

  return { playerTurn, updateTurn, updateBoard, isBoardEmpty, checkWinner }
})();

// Performs DOM manipulation to update screen
const ScreenController = (function() {
  const updatePlayerTurn = (turn) => playerTurn.textContent = `Player ${turn} turn`;
  const updateWinner = (player) => winner.textContent = player == null ? 'No winner' : player;
  return { updatePlayerTurn, updateWinner }
})();

createBoard();