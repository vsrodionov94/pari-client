import Start from '../../scenes/Start';
import { Modals, RaitingsUser, Teams } from '../../types';
import Utils from '../../libs/Utils';

export default class RaitingsScreen {
  private scene: Start;

  constructor (scene: Start) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    this.scene.add.sprite(0, 0, 'raitings-screen').setOrigin(0);
    const { centerX } = this.scene.cameras.main;
    const header = this.scene.add.text(centerX, 150, 'ЛИДЕРЫ', { fontFamily: 'DrukWide', fontSize: '50px' }).setOrigin(0.5);
    this.createButton();

    const raitings: RaitingsUser[] = [
      {
        place: 1,
        points: 100,
        name: 'vasya',
      },
      {
        place: 2,
        points: 100,
        name: 'vasya',
      },      {
        place: 3,
        points: 100,
        name: 'vasya',
      },
      {
        place: 4,
        points: 100,
        name: 'vasya',
      },
      {
        place: 5,
        points: 100,
        name: 'vasya',
      },      
      {
        place: 6,
        points: 100,
        name: 'vasya',
      },      
      {
        place: 7,
        points: 100,
        name: 'vasya',
      },      
      {
        place: 8,
        points: 100,
        name: 'vasya',
      },      
      {
        place: 9,
        points: 100,
        name: 'vasya',
      },      
      {
        place: 10,
        points: 100,
        name: 'vasya',
      },
    ];
    const user: RaitingsUser = {
      place: 150,
      points: 100,
      name: 'vasya',
    };
    let startY = 251;
    raitings.forEach(el => {
      new RaitingsElement(this.scene, startY, el, el.place === user.place);
      startY += 77;
    });

    if (raitings.every(el => el.place != user.place)) {
      new RaitingsElement(this.scene,startY, user, true);
    }
  }

  private createButton(): void {
    const startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1160, 'play-button');
    Utils.clickButton(this.scene, startButton, () => {
      this.scene.state.modal = Modals.None;
      this.scene.scene.stop();
      this.scene.scene.start('Game', this.scene.state);
    });

    const closeButton = this.scene.add.sprite(this.scene.cameras.main.centerX + 250, 110, 'close-button');
    Utils.clickButton(this.scene, closeButton, () => {
      this.scene.state.modal = Modals.None;
      this.scene.scene.restart();
    });
  }
};

class RaitingsElement {
  private scene: Start;
  private data: RaitingsUser;
  private isCurrentUser: boolean;
  private y: number;

  constructor(scene: Start, y: number, data: RaitingsUser, isCurrentUser: boolean) {
    this.scene = scene;
    this.data = data;
    this.isCurrentUser = isCurrentUser;
    this.y = y;
    this.createElements();
  }

  private createElements(): void {
    const { centerX } = this.scene.cameras.main;
    const bgTexture = this.isCurrentUser ? 'player-bg' : 'item-bg';
    const bg = this.scene.add.sprite(centerX, this.y, bgTexture);
    const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '24px',
      fontFamily: 'DrukWide',
    };
    const bgGeom = bg.getBounds();
    this.scene.add.text(bgGeom.left + 24, this.y, `${this.data.place}.`, textConfig).setOrigin(0, 0.5);
    this.scene.add.text(bgGeom.left + 120, this.y, this.data.name, textConfig).setFontFamily('FuturaPT').setOrigin(0, 0.5);
    this.scene.add.text(bgGeom.right - 23, this.y, this.data.points.toString(), textConfig).setOrigin(1, 0.5);
  }
}