const userDiv = document.querySelector(".user-grid");
const botDiv = document.querySelector(".bot-grid");

export function createGrid(container, size = 10) {
  for (let i = 0; i < size; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "gridRow";

    for (let j = 0; j < size; j++) {
      const colDiv = document.createElement("div");
      colDiv.className = "gridCol";
      rowDiv.appendChild(colDiv);
    }

    container.appendChild(rowDiv);
  }
}

// Make both grids
createGrid(userDiv);
createGrid(botDiv);