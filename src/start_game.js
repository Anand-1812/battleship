export function startGame(user, bot) {
  bot.gameboard.getCoordinates('.bot-grid', (x, y) => {
    user.attack(bot, x, y);
  });
}
