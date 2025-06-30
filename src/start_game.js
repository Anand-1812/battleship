import { createGrid } from './create_grid.js';
import { Player } from './players.js';
import { randomlyPlaceShips } from './game_board.js';
import { renderBoard } from './render_board.js';

export class StartGame {
  constructor(user, bot) {
    this.user = user;
    this.bot = bot;
    this.botAttackCoords = new Set();
    this.userAttackCoords = new Set();
    this.currentTurn = 'user';
    this.isGameOver = false;

    this.display = document.querySelector('.display');
    this.botGrid = document.querySelector('.bot-grid');
    this.userGrid = document.querySelector('.user-grid');
    this.startButton = document.querySelector('.start');
    this.randomButton = document.querySelector('.randomize');

    this.bot.gameboard.getCoordinates('.bot-grid', (x, y) => {
      this.handleUserClick(x, y);
    });
  }

  handleUserClick(x, y) {
    if (this.currentTurn !== 'user' || this.isGameOver) return;

    const key = `${x},${y}`;
    if (this.userAttackCoords.has(key)) return;
    this.userAttackCoords.add(key);

    const cell = this.botGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    const result = this.user.attack(this.bot, x, y);

    this.markCell(cell, result);

    if (this.bot.gameboard.allShipsSunks()) {
      this.endGame('🎉 User Wins!');
      return;
    }

    if (result === 'miss') {
      this.display.textContent = 'You missed! Bot’s turn...';
      this.currentTurn = 'bot';
      setTimeout(() => this.botAttack(), 500);
    } else {
      this.display.textContent = '🎯 Hit! Attack again!';
    }
  }

  botAttack() {
    if (this.isGameOver) return;

    this.display.textContent = '🤖 Bot is thinking...';

    setTimeout(() => {
      let x, y, key;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        key = `${x},${y}`;
      } while (this.botAttackCoords.has(key));

      this.botAttackCoords.add(key);
      const cell = this.userGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      const result = this.bot.attack(this.user, x, y);

      this.markCell(cell, result);

      if (this.user.gameboard.allShipsSunks()) {
        this.endGame('🤖 Bot Wins!');
        return;
      }

      if (result === 'miss') {
        this.display.textContent = 'Bot missed! Your turn 🔁';
        this.currentTurn = 'user';
      } else {
        this.display.textContent = 'Bot hit you! 💥';
        setTimeout(() => this.botAttack(), 800);
      }
    }, 1000);
  }

  markCell(cell, result) {
    if (!cell) return;

    if (result === 'hit') {
      cell.classList.add('hit-cell');
    } else if (result === 'miss') {
      cell.classList.add('miss-cell', 'shake');
      setTimeout(() => cell.classList.remove('shake'), 300);
    }
  }

  endGame(message) {
    this.display.textContent = message;
    this.display.classList.add('game-over');
    this.isGameOver = true;
    this.disableGridClicks();

    setTimeout(() => {
      this.display.classList.remove('game-over');
    }, 2000);
  }

  disableGridClicks() {
    const botCells = this.botGrid.querySelectorAll('.gridCol');
    botCells.forEach(cell => {
      cell.style.pointerEvents = 'none';
    });
  }
}
