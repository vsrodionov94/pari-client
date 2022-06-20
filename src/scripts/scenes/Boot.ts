import * as Webfont from '../libs/Webfonts.js';
import { State } from '../types';
import state from '../state';
import api from '../libs/Api';
import bridge from '@vkontakte/vk-bridge';

const loadScreen: string = require('../../assets/images/load-screen.png');
const progressBar: string = require('../../assets/images/progress-bar.png');

export default class BootScene extends Phaser.Scene {
  private fontsReady: boolean;
  private userReady: boolean;
  public state: State;
  
  constructor() {
    super('Boot');
  }

  public init(): void {
    this.state = state;
    bridge.send('VKWebAppInit');
    Webfont.load({
      custom: { families: [
      'DrukWide',
      'FuturaPT',
    ] },
      active: () => { this.fontsReady = true },
    });

    this.initUser();
    this.checkUser();
  }

  private initUser(): void {
    this.state.vkId = 12345
    this.state.name = 'Неизвестный игрок';

    bridge.send('VKWebAppGetUserInfo').then(data => {
      this.state.vkId = data.id;
      this.state.name = `${data.first_name} ${data.last_name}`;
    });
  }

  private checkUser(): void {
    this.userReady = true;
    return;
    api.checkUser({ vkId: this.state.vkId, name: this.state.name })
      .then(data => {
        this.state.attempts = data.attempts;
        this.userReady = true;
      });
  }

  public preload (): void {
    this.load.image('load-screen', loadScreen);
    this.load.image('progress-bar', progressBar);
  }

  public update(): void {
    if (!this.fontsReady) return;
    if (!this.userReady) return;
    this.scene.start('Preload', this.state);
  }
}