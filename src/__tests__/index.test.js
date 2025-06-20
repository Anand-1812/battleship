import { GameBoard } from "../gameBoard";

test('checking...', () => {
  expect(1 + 1).toBe(2);
});

test('checking attack hit...', () => {
  const gameboard = new GameBoard();
  gameboard.placeShips(2, 2, 3, 'horizontal')
  expect(gameboard.receiveAttack(2, 2)).toBe("hit");
});
