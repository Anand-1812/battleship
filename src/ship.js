// ship class

export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0
  }

  hit() {
    this.timesHit += 1;
  }

  get isSunk() {
    return this.timesHit >= this.length
  }
}