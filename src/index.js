import "./styles.css";
import { createGrid } from "./create_grid.js";
import { Player } from "./players.js";
import { randomlyPlaceShips } from "./game_board.js";
import { renderBoard } from "./render_board.js";

const userGrid = document.querySelector(".user-grid")
const botGrid = document.querySelector(".bot-grid")

// create grid for both user and bot
createGrid(userGrid, 10, true);
createGrid(botGrid, 10, false);

const user = new Player('User');

randomlyPlaceShips(user.gameboard);
renderBoard(user.gameboard.grid, userGrid);

const bot = new Player('Bot');

randomlyPlaceShips(bot.gameboard);
console.log(bot.gameboard.ships);