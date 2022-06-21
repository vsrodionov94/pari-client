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
  }

  private initUser(): void {
    if (process.env.DEV) {
      this.state.vkId = 10
      this.state.name = 'Неизвестный Васян dasdasdasdas';
      this.checkUser();
    } else {
      bridge.send('VKWebAppGetUserInfo').then(data => {
        this.state.vkId = data.id;
        this.state.name = `${data.first_name} ${data.last_name}`;
        this.checkUser();
      });
    }
  }

  private checkUser(): void {
    api.checkUser({ vkId: this.state.vkId, name: this.state.name })
      .then(data => {
        this.state.attempts = data.attempts;
        this.state.team = data.team;
        this.state.currentPoints = data.points;
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