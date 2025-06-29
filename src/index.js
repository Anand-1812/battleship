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
  startButton.disabled = true;
});

const randomButton = document.querySelector('.randomize');
randomButton.addEventListener('click', () => {
  const display = document.querySelector('.display');
  display.textContent = 'Ships Placed (attack)';
  if (startButton.disabled) return;

  randomlyPlaceShips(user.gameboard);
  renderBoard(user.gameboard.grid, userGrid);
  randomButton.disabled = true;
});
