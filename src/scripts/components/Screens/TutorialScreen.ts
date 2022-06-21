import Start from '../../scenes/Start';
import { Fonts, Modals, Teams } from '../../types';
import Utils from '../../libs/Utils';
const copyright = 'Пора определить, чей удар самый точный!\n\nВыбирай свою команду и сразись лицом к лицу с виртуальными соперниками.\n\nЕжедневно у тебя будет по 5 жизней. Выбирай направление своих ударов с умом: чем сложнее удар – тем больше баллов, но и выше риск неудачи.\n\nНе забывай заходить в игру каждый день и зарабатывай баллы. Самый меткий игрок получит сертификат GIftery и ещё пять получат фрибеты.'

export default class TutorialScreen {
  private scene: Start;

  constructor (scene: Start) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    this.scene.add.sprite(0, 0, `bg-team-${this.scene.state.team}`).setOrigin(0);
    this.scene.add.sprite(0, 0, `modal-bg-team-${this.scene.state.team}`).setOrigin(0);
    const { centerX, centerY } = this.scene.cameras.main;
    const header = this.scene.add.text(centerX, 150, 'ПРАВИЛА', { fontFamily: Fonts.DrukWide, fontSize: '50px' }).setOrigin(0.5);
    this.scene.add.text(centerX, centerY, copyright, {
      fontFamily: Fonts.FuturaPT, 
      fontSize: '35px', 
      wordWrap: { width: 450 }, 
      align: 'center'
    }).setOrigin(0.5);
    this.createButton();
  }

  private createButton(): void {
    const startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1160, `play-button-team-${this.scene.state.team}`).setVisible(this.scene.state.attempts > 0);
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