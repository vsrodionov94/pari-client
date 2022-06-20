import LoadingBar from "../components/LoadingBar";
import { State } from "../types";

const gameScreen: string = require('../../assets/images/game-screen.png');
const mainScreen: string = require('../../assets/images/main-screen.png');
const endScreen: string = require('../../assets/images/end-screen.png');
const tutorialScreen: string = require('../../assets/images/tutorial-screen.png');
const raitingsScreen: string = require('../../assets/images/raitings-screen.png');
const teamScreen: string = require('../../assets/images/team-screen.png');
const teamScreenDisabled: string = require('../../assets/images/team-screen-disabled.png');
const health: string = require('../../assets/images/health.png');
const team1: string = require('../../assets/images/team-1.png');
const team2: string = require('../../assets/images/team-2.png');
const team3: string = require('../../assets/images/team-3.png');
const team4: string = require('../../assets/images/team-4.png');
const teamSelected: string = require('../../assets/images/team-selected.png');
const teamDisabled: string = require('../../assets/images/team-disabled.png');
const teamUnelected: string = require('../../assets/images/team-unselected.png');
const playButton: string = require('../../assets/images/play-button.png');
const raitingsButton: string = require('../../assets/images/raitings-button.png');
const tutorialButton: string = require('../../assets/images/tutorial-button.png');
const closeButton: string = require('../../assets/images/close-button.png');
const menuButton: string = require('../../assets/images/menu-button.png');
const raitingsItemBg: string = require('../../assets/images/item-bg.png');
const raitingsPlayerBg: string = require('../../assets/images/player-bg.png');

export default class Preload extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Preload');
  }

  public init(state: State) {
    this.state = state;
  }

  public preload(): void {
    this.add.sprite(0, 0, 'load-screen').setOrigin(0);
    new LoadingBar(this);
    this.preloadAssets();
  }

  private preloadAssets(): void {
    this.load.image('game-screen', gameScreen);
    this.load.image('main-screen', mainScreen);
    this.load.image('end-screen', endScreen);
    this.load.image('tutorial-screen', tutorialScreen);
    this.load.image('raitings-screen', raitingsScreen);
    this.load.image('team-screen', teamScreen);
    this.load.image('team-screen-disabled', teamScreenDisabled);
    this.load.image('health', health);
    this.load.image('team-1', team1);
    this.load.image('team-2', team2);
    this.load.image('team-3', team3);
    this.load.image('team-4', team4);
    this.load.image('team-selected', teamSelected);
    this.load.image('team-disabled', teamDisabled);
    this.load.image('team-unselected', teamUnelected);
    this.load.image('play-button', playButton);
    this.load.image('tutorial-button', tutorialButton);
    this.load.image('raitings-button', raitingsButton);
    this.load.image('close-button', closeButton);
    this.load.image('menu-button', menuButton);
    this.load.image('item-bg', raitingsItemBg);
    this.load.image('player-bg', raitingsPlayerBg);
  }

  public create(): void {
    this.scene.stop();
    this.scene.start('Start', this.state);
  }
};
