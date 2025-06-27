import { randomlyPlaceShips } from './game_board.js';
import { GameBoard } from './game_board.js';

export class StartGame {
  constructor(user, bot) {
    this.user = user;
    this.bot = bot;
  }

  gameBegin() {
    const gameboard = new GameBoard();
    if (gameboard.allShipsSunks()) {
      console.log('Finished');
    }
  }

  userAttack() {
    const display = document.querySelector('.display');
    display.textContent = 'User turn(attack)';
    const botGrid = document.querySelector('.bot-grid');

    randomlyPlaceShips(bot.gameboard);
    bot.gameboard.getCoordinates('.bot-grid', (x, y) => {
      const result = user.attack(bot, x, y);
      const cell = botGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);

      if (result === 'hit') {
        cell.style.backgroundColor = 'red';
      } else if (result === 'miss') {
        cell.style.backgroundColor = 'blue';
      }
    });
  }

  botAttack() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    let key = `${x},${y}`;

    randomlyPlaceShips(user.gameboard);
    const userGrid = document.querySelector('.user-grid');
    const display = document.querySelector('.display');
    display.textContent = 'Bot turn(attack)';
    let coord = new Set();
    coord.add(key);

    if (coord.has(key)) {
      alert('Bot has gone mad😑');
    } else {
      const result = bot.attack(user, x, y);

      const cell = userGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);

      if (result === 'hit') {
        cell.style.backgroundColor = 'red';
      } else if (result === 'miss') {
        cell.style.backgroundColor = 'blue';
      }
    }
  }
}
