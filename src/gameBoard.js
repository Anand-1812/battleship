import { Ship } from "./ship";

const shipConfig = [
  { name: "Carrier", length: 3 },
  { name: "Battleship", length: 2 },
  { name: "Cruiser", length: 2 },
  { name: "Submarine", length: 1 },
  { name: "Destroyer", length: 1 },
  { name: "Death Fire", length: 1 }
];

export function randomlyPlaceShips(gameboard) {
  shipConfig.forEach(({ length }) => {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

      try {
        gameboard.placeShips(x, y, length, direction);
        placed = true;
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    }
  });
}

// Game Board Class
export class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10}, () => Array(10).fill(null));
    this.ships = [];
    this.missedShots = [];
    this.attacked = new Set();
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

  receiveAttack(x, y) {
    const key = `${x}, ${y}`;
    if (this.attacked.has(key)) {
      return "already attacked";
    }
    this.attacked.add(key);

    for (const {ship, coordinates} of this.ships) {
      for (const [row, col] of coordinates) {
        if (row === x && col === y) {
          ship.hit();
          return "hit";
        }
      }
    }

    this.missedShots.push([x, y]);
    return "miss";
  }

  allShipsSunks() {
    return this.ships.every(({ ship }) => ship.isSunk);
  }
}