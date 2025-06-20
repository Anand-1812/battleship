import { Ship } from "./ship";

// Game Board Class
export class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10}, () => Array(10).fill(null));
    this.ships = [];
  }

  // places the ships in the grid
  placeShips(x, y, length, direction) {
    const ship = new Ship(length);
    const coordinates = [];

    for (let i = 0;i < length;i++) {

      let xi = x + (direction === 'horizontal' ? i : 0);
      let yi = y + (direction === 'vertical' ? i : 0);

      if (xi >= 10 || yi >= 10 || this.grid[yi][xi] !== null) {
        throw new Error("Invalid ship placement.");
      }

      coordinates.push([xi, yi]);
    }

    coordinates.forEach(([xi, yi]) => {
      this.grid[yi][xi] = ship;
    });

    this.ships.push({ ship, coordinates} );
  }

  recieveAttack(x, y) {
    if (!missedShots) this.missedShots = [];

    for (const {ship, coordinates} of this.ships) {
      for (const {row, col} of coordinates) {
        if (row === x && col === y) {
          ship.hit();
          return;
        }
      }
    }

    missedShots.push([x, y]);
  }
}