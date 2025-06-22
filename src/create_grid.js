const userDiv = document.querySelector(".user-grid");
const botDiv = document.querySelector(".bot-grid");

export function createGrid(container, size = 10, isUser = false) {
  for (let i = 0; i < size; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "gridRow";

    for (let j = 0; j < size; j++) {
      const colDiv = document.createElement("div");
      colDiv.className = "gridCol";
      colDiv.dataset.row = i;
      colDiv.dataset.col = j;
      
      rowDiv.appendChild(colDiv);
    }

    container.appendChild(rowDiv);
  }
}