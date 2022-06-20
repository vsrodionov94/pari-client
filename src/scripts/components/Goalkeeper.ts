import Game from '../scenes/Game';

export default class Goalkeeper {
  private scene: Game;
  private sprite: Phaser.GameObjects.Sprite;
  private startX: number;
  private startY: number;

  constructor(scene: Game) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    this.sprite = this.scene.add.sprite(centerX, centerY + 135, 'goalkeeper-stay');
    this.startX = this.sprite.x;
    this.startY = this.sprite.y;
  }
};
