import { randomlyPlaceShips } from './game_board.js';

export class StartGame {
  constructor(user, bot) {
    this.user = user;
    this.bot = bot;
    this.botAttackCoords = new Set();
  }

  gameBegin() {
    if (this.user.gameboard.allShipsSunks()) {
      console.log('Finished');
    }
  }

  userAttack() {
    const display = document.querySelector('.display');
    display.textContent = 'User turn(attack)';
    const botGrid = document.querySelector('.bot-grid');

    this.bot.gameboard.getCoordinates('.bot-grid', (x, y) => {
      const result = this.user.attack(this.bot, x, y);
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
    const key = `${x},${y}`;

    if (this.botAttackCoords.has(key)) {
      this.botAttack(); // try a different cell
      return;
    }
    this.botAttackCoords.add(key);

    const userGrid = document.querySelector('.user-grid');
    const display = document.querySelector('.display');
    display.textContent = 'Bot turn(attack)';

    const result = this.bot.attack(this.user, x, y);
    const cell = userGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);

    if (result === 'hit') {
      cell.style.backgroundColor = 'red';
    } else if (result === 'miss') {
      cell.style.backgroundColor = 'blue';
    }
  }
}
