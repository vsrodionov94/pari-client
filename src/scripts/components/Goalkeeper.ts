import Game from '../scenes/Game';

export default class Goalkeeper {
  private scene: Game;
  private sprite: Phaser.GameObjects.Sprite;
  private startX: number;
  private startY: number;
  private positions: CornerPosition[];
  constructor(scene: Game) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    this.sprite = this.scene.add.sprite(centerX, centerY + 135, 'goalkeeper-stay');
    this.startX = this.sprite.x;
    this.startY = this.sprite.y;
    this.createPosition();
  }

  private createPosition(): void {
    const { centerX, centerY } = this.scene.cameras.main;

    this.positions = [
      {
        type: Corners.left_top,
        x: centerX - 200,
        y: centerY,
        sprite: 'goalkeeper-left',
        flip: false,
      },
      {
        type: Corners.right_top,
        x: centerX + 200,
        y: centerY,
        sprite: 'goalkeeper-left',
        flip: true,
      },
      {
        type: Corners.left_middle,
        x: centerX - 150,
        y: centerY + 100,
        sprite: 'goalkeeper-right',
        flip: true,
      },
      {
        type: Corners.right_middle,
        x: centerX + 150,
        y: centerY + 100,
        sprite: 'goalkeeper-right',
        flip: false,
      },
      {
        type: Corners.left_bottom,
        x: centerX - 200,
        y: centerY + 100,
        sprite: 'goalkeeper-bottom',
        flip: true,
      },
      {
        type: Corners.right_bottom,
        x: centerX + 200,
        y: centerY + 100,
        sprite: 'goalkeeper-bottom',
        flip: false,
      },
    ];
  }

  public playAnimation(corner: Corners, success: boolean): void {
    let settings = this.positions.find(el => el.type === corner);
    if (success) {
      settings = Phaser.Utils.Array.Shuffle(this.positions).find(el => el.type != corner);
    }
    this.scene.tweens.add({
      targets: this.sprite,
      x: settings.x,
      y: settings.y,
      yoyo: true,
      onStart: () => {
        this.sprite.setTexture(settings.sprite);
        this.sprite.setFlipX(settings.flip);
      },
      onComplete: () => {
        this.sprite.setTexture('goalkeeper-stay');
        this.sprite.setFlipX(false);
      },
      ease: 'Power2',
      duration: 350,
    });
  }
};

enum Corners {
  left_top,
  right_top,
  left_middle,
  right_middle,
  left_bottom,
  right_bottom,
};


type CornerPosition = {
  type: Corners,
  x: number,
  y: number,
  sprite: string,
  flip: boolean,
};

export { Corners };
