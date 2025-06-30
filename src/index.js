import './styles.css';
import { createGrid } from './create_grid.js';
import { Player } from './players.js';
import { randomlyPlaceShips } from './game_board.js';
import { renderBoard } from './render_board.js';
import { StartGame } from './start_game.js';

const userGrid = document.querySelector('.user-grid');
const botGrid = document.querySelector('.bot-grid');

// create grid for both user and bot
createGrid(userGrid, 10, true);
createGrid(botGrid, 10, false);

const user = new Player('User');
const bot = new Player('Bot');

randomlyPlaceShips(bot.gameboard);

const playGame = new StartGame(user, bot);

const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
  const display = document.querySelector('.display');
  display.textContent = 'User Turn';

  startButton.disabled = true;
});

const randomButton = document.querySelector('.randomize');
randomButton.addEventListener('click', () => {
  const display = document.querySelector('.display');
  display.textContent = 'Ships Placed';
  if (startButton.disabled) return;

  randomlyPlaceShips(user.gameboard);
  renderBoard(user.gameboard.grid, userGrid);
  randomButton.disabled = true;
});

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
  // 1. Clear all cells
  userGrid.innerHTML = '';
  botGrid.innerHTML = '';

  // 2. Recreate the grid
  createGrid(userGrid, 10, true);
  createGrid(botGrid, 10, false);

  // 3. Recreate players
  const newUser = new Player('User');
  const newBot = new Player('Bot');
  randomlyPlaceShips(newBot.gameboard);

  // 4. Re-render if random was already used
  if (!randomButton.disabled) {
    randomlyPlaceShips(newUser.gameboard);
    renderBoard(newUser.gameboard.grid, userGrid);
  }

  // 5. Reinitialize game
  const newGame = new StartGame(newUser, newBot);

  // 6. Reset display
  const display = document.querySelector('.display');
  display.textContent = 'Game Reset';

  // 7. Enable buttons again
  startButton.disabled = false;
  randomButton.disabled = false;
});
