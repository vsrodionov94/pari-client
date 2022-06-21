import Start from '../../scenes/Start';
import { Modals } from '../../types';
import Utils from '../../libs/Utils';

export default class EndScreen {
  private scene: Start;

  constructor (scene: Start) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    this.scene.add.sprite(centerX, centerY, `bg-team-${this.scene.state.team}`);
    this.scene.add.sprite(0, 0, 'end-screen').setOrigin(0);
    this.scene.add.text(centerX, 980, this.scene.state.currentPoints.toString(), { fontFamily: 'DrukWide', fontSize: '50px' }).setOrigin(0.5);
    this.createButton();
  }

  private createButton(): void {
    const startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1160, `menu-button-team-${this.scene.state.team}`);
    Utils.clickButton(this.scene, startButton, () => {
      this.scene.state.modal = Modals.None;
      this.scene.scene.restart();
    });
  }
};