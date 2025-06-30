export function renderBoard(grid, domGrid) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = domGrid.querySelector(`[data-y="${y}"][data-x="${x}"]`);
      if (cell && grid[y][x] !== null) {
        cell.style.backgroundColor = '#a0b8e2';
      }
    }
  }
}
