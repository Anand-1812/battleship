import './styles.css';
import { createGrid } from './create_grid.js';
import { Player } from './players.js';
import { randomlyPlaceShips } from './game_board.js';
import { renderBoard } from './render_board.js';
import { StartGame } from './start_game.js';

const userGrid = document.querySelector('.user-grid');
const botGrid = document.querySelector('.bot-grid');
const display = document.querySelector('.display');
const startButton = document.querySelector('.start');
const randomButton = document.querySelector('.randomize');
const resetButton = document.querySelector('.reset');

let playGame = null;
let user = null;
let bot = null;

function initializeGame() {
  // Clear existing grid
  userGrid.innerHTML = '';
  botGrid.innerHTML = '';

  // Create grid
  createGrid(userGrid, 10, true);
  createGrid(botGrid, 10, false);

  // Create new players
  user = new Player('User');
  bot = new Player('Bot');
  randomlyPlaceShips(bot.gameboard);

  // Initialize game logic
  playGame = new StartGame(user, bot);

  // Reset UI
  display.textContent = '🔄 Game Reset';
  startButton.disabled = false;
  randomButton.disabled = false;
}

initializeGame();

startButton.addEventListener('click', () => {
  if (user.gameboard.ships.length === 0) {
    display.textContent = '🚫 Please place your ships first!';
    return;
  }

  display.textContent = 'User Turn';
  startButton.disabled = true;
});

randomButton.addEventListener('click', () => {
  if (startButton.disabled) return;

  randomlyPlaceShips(user.gameboard);
  renderBoard(user.gameboard.grid, userGrid);
  randomButton.disabled = true;
  display.textContent = '✅ Ships Placed';
});

resetButton.addEventListener('click', () => {
  initializeGame();
});
