import { GameBoard } from "./game_board.js";

// Player Class
export class Player {
  constructor(name) {
    // each player will have a new gameboard
    this.name = name;
    this.gameboard = new GameBoard();
  }

  attack(opponent, x, y) {
    return opponent.gameboard.receiveAttack(x, y);
  }
}