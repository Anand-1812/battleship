import "./styles.css";
import { createGrid } from "./createGrid.js";

// create grid for both user and bot
createGrid(document.querySelector(".user-grid"), 10, true);
createGrid(document.querySelector(".bot-grid"), 10, false);

