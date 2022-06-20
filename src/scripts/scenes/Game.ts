export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  public create(): void {
    this.add.sprite(0, 0, 'game-screen').setOrigin(0);
  }
};