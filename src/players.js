import { GameBoard } from "./gameBoard";

// Player Class
class Player {
  constructor() {
    // each player will have a new gameboard
    this.gameboard = new GameBoard();
  }
}