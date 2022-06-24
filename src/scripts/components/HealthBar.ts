import Game from '../scenes/Game';

export class HealthBar {
  private scene: Game;
  private elements: Phaser.GameObjects.Sprite[];
  private currentHealth: number = 5;

  constructor(scene: Game) {
    this.scene = scene;

    this.elements = [];
    let startX = this.scene.cameras.main.displayWidth - 54;
    const offset = 45;
    for (let i = 0; i < 5; i += 1) {
      const sprite = this.scene.add.sprite(startX, 108, 'point').setOrigin(1, 0.5);
      startX -= offset;
      this.elements.push(sprite);
    }
  }

  public update(health: number): void {
    if (health != this.currentHealth) {
      this.currentHealth = health;
      this.updateState();
    }
  }

  private updateState(): void {
    this.elements.forEach((element, index) => {
      element.setVisible(index < this.currentHealth);
    });
  }
};
