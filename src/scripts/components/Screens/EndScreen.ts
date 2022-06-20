import Start from '../../scenes/Start';
import { Modals, Teams } from '../../types';
import Utils from '../../libs/Utils';

export default class EndScreen {
  private scene: Start;

  constructor (scene: Start) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    this.scene.add.sprite(0, 0, 'end-screen').setOrigin(0);
    const { centerX } = this.scene.cameras.main;
    const score = this.scene.add.text(centerX, 980, '5360', { fontFamily: 'DrukWide', fontSize: '50px' }).setOrigin(0.5);
    this.createButton();
  }

  private createButton(): void {
    const startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1160, 'menu-button');
    Utils.clickButton(this.scene, startButton, () => {
      this.scene.state.modal = Modals.None;
      this.scene.scene.restart();
    });
  }
};