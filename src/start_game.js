import { randomlyPlaceShips } from './game_board.js';

export function startGame(user, bot) {
  const display = document.querySelector('.display');
  display.textContent = 'Your turn(attack)';
  const botGrid = document.querySelector('.bot-grid');

  randomlyPlaceShips(bot.gameboard);
  bot.gameboard.getCoordinates('.bot-grid', (x, y) => {
    const result = user.attack(bot, x, y);
    const cell = botGrid.querySelector(`[data-x="${x}"][data-y="${x}"]`);

    if (result === 'hit') {
      cell.style.backgroundColor = 'red';
    } else if (result === 'miss') {
      cell.style.backgroundColor = 'blue';
    }
  });
}
