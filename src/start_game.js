export class StartGame {
  constructor(user, bot) {
    this.user = user;
    this.bot = bot;
    this.botAttackCoords = new Set();
    this.currentTurn = 'user';

    this.bot.gameboard.getCoordinates('.bot-grid', (x, y) => {
      this.handleUserClick(x, y);
    });
  }

  handleUserClick(x, y) {
    if (this.currentTurn !== 'user') return;
    const display = document.querySelector('.display');

    const botGrid = document.querySelector('.bot-grid');
    const result = this.user.attack(this.bot, x, y);
    const cell = botGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);

    if (result === 'hit') {
      cell.style.backgroundColor = '#C0C9EE';
      display.textContent = 'keep attacking';
      return;
    } else if (result === 'miss') {
      cell.style.backgroundColor = '#F4EBD3';
      this.currentTurn = 'bot';
      setTimeout(() => this.botAttack(), 500);
    }

    if (this.bot.gameboard.allShipsSunks()) {
      display.textContent = 'User wins';
      return;
    }
  }

  botAttack() {
    const display = document.querySelector('.display');
    display.textContent = 'Bot turn';

    setTimeout(() => {
      let x, y, key;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        key = `${x},${y}`;
      } while (this.botAttackCoords.has(key));

      this.botAttackCoords.add(key);

      const userGrid = document.querySelector('.user-grid');
      const result = this.bot.attack(this.user, x, y);
      const cell = userGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);

      if (result === 'hit') {
        cell.style.backgroundColor = '#C0C9EE';
        setTimeout(() => this.botAttack(), 1000);
        return;
      } else if (result === 'miss') {
        cell.style.backgroundColor = '#F4EBD3';
      }

      if (this.user.gameboard.allShipsSunks()) {
        display.textContent = 'Bot Wins🤖';
        return;
      }

      this.currentTurn = 'user';
      display.textContent = 'User turn';
    }, 1000);
  }
}
