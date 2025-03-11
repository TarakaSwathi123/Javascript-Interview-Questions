class SnakeLadderGame {
  constructor(boardSize = 100) {
    this.boardSize = boardSize;
    this.snakes = new Map();
    this.ladders = new Map();
    this.players = new Map();
    this.turnQueue = [];
  }

  addSnake(start, end) {
    if (start <= end) throw new Error("Invalid snake position!");
    this.snakes.set(start, end);
  }

  addLadder(start, end) {
    if (start >= end) throw new Error("Invalid ladder position!");
    this.ladders.set(start, end);
  }

  addPlayer(name) {
    if (this.players.has(name)) throw new Error("Player already exists!");
    this.players.set(name, 1);
    this.turnQueue.push(name);
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  movePlayer(player) {
    if (!this.players.has(player)) return;

    let diceValue = this.rollDice();
    let newPosition = this.players.get(player) + diceValue;

    if (newPosition > this.boardSize) {
      console.log(`${player} rolled ${diceValue}, but stays at ${this.players.get(player)} (out of bounds)`);
      return;
    }

    if (this.snakes.has(newPosition)) {
      console.log(`${player} encountered a 🐍 Snake! Moving from ${newPosition} to ${this.snakes.get(newPosition)}`);
      newPosition = this.snakes.get(newPosition);
    } else if (this.ladders.has(newPosition)) {
      console.log(`${player} found a 🪜 Ladder! Moving from ${newPosition} to ${this.ladders.get(newPosition)}`);
      newPosition = this.ladders.get(newPosition);
    }

    this.players.set(player, newPosition);
    console.log(`${player} rolled ${diceValue} and moved to ${newPosition}`);

    if (newPosition === this.boardSize) {
      console.log(`🎉 ${player} wins the game! 🎉`);
      this.players.delete(player);
      this.turnQueue = this.turnQueue.filter(p => p !== player);
    }
  }

  playGame() {
    while (this.turnQueue.length > 0) {
      let currentPlayer = this.turnQueue[0];
      this.movePlayer(currentPlayer);
      this.turnQueue.push(this.turnQueue.shift());
    }
    console.log("🏁 Game Over!");
  }
}

// Example Usage
const game = new SnakeLadderGame();
game.addSnake(98, 40);
game.addSnake(95, 13);
game.addLadder(3, 50);
game.addLadder(20, 80);

game.addPlayer("Alice");
game.addPlayer("Bob");

game.playGame();
