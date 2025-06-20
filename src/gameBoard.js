import { Ship } from "./ship";

// Game Board Class
export class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10}, Array(10).fill(null));
    this.ships = [];
  }

  // places the ships in the grid
  placeShips(x, y, length, direction) {
    const ship = new Ship(length);
    const coordinates = [];

    for (let i = 0;i < length;i++) {
      let xi = x;
      let yi = y;

      if (direction === 'horizontal') xi += 1;
      else if (direction === 'vertical') yi += 1;

      if (xi >= 10 || yi >= 10 || this.grid[xi][yi] !== NULL) {
        throw new Error("Invalid ship placement.");
      }

      coordinates.push([xi, yi]);
    }

    coordinates.forEach(([xi, yi]) => {
      this.grid[yi][xi] = ship;
    });

    this.ships.push(ship);
  }

  recieveAttack(x, y) {
    missedShots = [];

    
  }
}