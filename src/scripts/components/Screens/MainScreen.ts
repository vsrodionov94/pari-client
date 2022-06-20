import Start from '../../scenes/Start';
import { Modals, Teams } from '../../types';
import Utils from '../../libs/Utils';

export default class MainScreen {
  private scene: Start;

  constructor (scene: Start) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    this.scene.add.sprite(0, 0, 'main-screen').setOrigin(0);
    const { centerX, centerY } = this.scene.cameras.main;
    const teamSprite = this.scene.add.sprite(centerX, centerY - 50, `team-${this.scene.state.team}`);
    this.createButton();
  }

  private createButton(): void {
    const startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1020, 'play-button');
    Utils.clickButton(this.scene, startButton, () => {
      this.scene.state.modal = Modals.None;
      this.scene.scene.stop();
      this.scene.scene.start('Game', this.scene.state);
    });

    const raitingsButton = this.scene.add.sprite(this.scene.cameras.main.centerX + 150, 1150, 'raitings-button');
    Utils.clickButton(this.scene, raitingsButton, () => {
      this.scene.state.modal = Modals.Raitings;
      this.scene.scene.restart(this.scene.state);
    });

    const tutorialButton = this.scene.add.sprite(this.scene.cameras.main.centerX - 150,  1150, 'tutorial-button');
    Utils.clickButton(this.scene, tutorialButton, () => {
      this.scene.state.modal = Modals.Tutorial;
      this.scene.scene.restart(this.scene.state);
    });
  }
};