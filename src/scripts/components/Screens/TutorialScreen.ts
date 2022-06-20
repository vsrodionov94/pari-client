import Start from '../../scenes/Start';
import { Modals, Teams } from '../../types';
import Utils from '../../libs/Utils';

export default class TutorialScreen {
  private scene: Start;

  constructor (scene: Start) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    this.scene.add.sprite(0, 0, 'tutorial-screen').setOrigin(0);
    this.createButton();
  }

  private createButton(): void {
    const startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1160, 'play-button');
    Utils.clickButton(this.scene, startButton, () => {
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