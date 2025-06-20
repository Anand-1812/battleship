import { GameBoard } from "../gameBoard";

test('checking...', () => {
  expect(1 + 1).toBe(2);
});

test('testing attack hit through coordinated', () => {
  const gameboard = new GameBoard();
  expect(gameboard.receiveAttack(2, 2)).toBe("miss");
});
