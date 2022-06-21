import LoadingBar from "../components/LoadingBar";
import { State } from "../types";

const gameScreen: string = require('../../assets/images/game-screen.png');
const mainScreen: string = require('../../assets/images/main-screen.png');
const endScreen: string = require('../../assets/images/end-screen.png');
const tutorialScreen: string = require('../../assets/images/tutorial-screen.png');
const raitingsScreen: string = require('../../assets/images/raitings-screen.png');
const teamScreen: string = require('../../assets/images/team-screen.png');
const teamScreenDisabled: string = require('../../assets/images/team-screen-disabled.png');
const team1: string = require('../../assets/images/team-1.png');
const team2: string = require('../../assets/images/team-2.png');
const team3: string = require('../../assets/images/team-3.png');
const team4: string = require('../../assets/images/team-4.png');
const team1Selected: string = require('../../assets/images/team-1-selected.png');
const team2Selected: string = require('../../assets/images/team-2-selected.png');
const team3Selected: string = require('../../assets/images/team-3-selected.png');
const team4Selected: string = require('../../assets/images/team-4-selected.png');
const teamDisabled: string = require('../../assets/images/team-disabled.png');
const teamUnelected: string = require('../../assets/images/team-unselected.png');
const playButtonTeam1: string = require('../../assets/images/play-button-team-1.png');
const playButtonTeam2: string = require('../../assets/images/play-button-team-2.png');
const playButtonTeam3: string = require('../../assets/images/play-button-team-3.png');
const playButtonTeam4: string = require('../../assets/images/play-button-team-4.png');
const tutorialButtonTeam1: string = require('../../assets/images/raitings-button-team-1.png');
const tutorialButtonTeam2: string = require('../../assets/images/raitings-button-team-2.png');
const tutorialButtonTeam3: string = require('../../assets/images/raitings-button-team-3.png');
const tutorialButtonTeam4: string = require('../../assets/images/raitings-button-team-4.png');
const raitingsButtonTeam1: string = require('../../assets/images/tutorial-button-team-1.png');
const raitingsButtonTeam2: string = require('../../assets/images/tutorial-button-team-2.png');
const raitingsButtonTeam3: string = require('../../assets/images/tutorial-button-team-3.png');
const raitingsButtonTeam4: string = require('../../assets/images/tutorial-button-team-4.png');
const closeButton: string = require('../../assets/images/close-button.png');
const menuButtonTeam1: string = require('../../assets/images/menu-button-team-1.png');
const menuButtonTeam2: string = require('../../assets/images/menu-button-team-2.png');
const menuButtonTeam3: string = require('../../assets/images/menu-button-team-3.png');
const menuButtonTeam4: string = require('../../assets/images/menu-button-team-4.png');
const raitingsItemBg: string = require('../../assets/images/item-bg.png');
const raitingsPlayerBg: string = require('../../assets/images/player-bg.png');
const ball: string = require('../../assets/images/ball.png');
const point: string = require('../../assets/images/point.png');
const stay: string = require('../../assets/images/goalkeeper/stay.png');
const left: string = require('../../assets/images/goalkeeper/left.png');
const right: string = require('../../assets/images/goalkeeper/right.png');
const bottom: string = require('../../assets/images/goalkeeper/bottom.png');
const top: string = require('../../assets/images/goalkeeper/top.png');
const bgTeam1: string = require('../../assets/images/bg-team-1.png');
const bgTeam2: string = require('../../assets/images/bg-team-2.png');
const bgTeam3: string = require('../../assets/images/bg-team-3.png');
const bgTeam4: string = require('../../assets/images/bg-team-4.png');

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
    this.load.image('team-1', team1);
    this.load.image('team-2', team2);
    this.load.image('team-3', team3);
    this.load.image('team-4', team4);
    this.load.image('team-1-selected', team1Selected);
    this.load.image('team-2-selected', team2Selected);
    this.load.image('team-3-selected', team3Selected);
    this.load.image('team-4-selected', team4Selected);
    this.load.image('team-disabled', teamDisabled);
    this.load.image('team-unselected', teamUnelected);
    this.load.image('play-button-team-1', playButtonTeam1);
    this.load.image('play-button-team-2', playButtonTeam2);
    this.load.image('play-button-team-3', playButtonTeam3);
    this.load.image('play-button-team-4', playButtonTeam4);
    this.load.image('tutorial-button-team-1', tutorialButtonTeam1);
    this.load.image('tutorial-button-team-2', tutorialButtonTeam2);
    this.load.image('tutorial-button-team-3', tutorialButtonTeam3);
    this.load.image('tutorial-button-team-4', tutorialButtonTeam4);
    this.load.image('raitings-button-team-1', raitingsButtonTeam1);
    this.load.image('raitings-button-team-2', raitingsButtonTeam2);
    this.load.image('raitings-button-team-3', raitingsButtonTeam3);
    this.load.image('raitings-button-team-4', raitingsButtonTeam4);
    this.load.image('close-button', closeButton);
    this.load.image('menu-button-team-1', menuButtonTeam1);
    this.load.image('menu-button-team-2', menuButtonTeam2);
    this.load.image('menu-button-team-3', menuButtonTeam3);
    this.load.image('menu-button-team-4', menuButtonTeam4);
    this.load.image('item-bg', raitingsItemBg);
    this.load.image('player-bg', raitingsPlayerBg);
    this.load.image('ball', ball);
    this.load.image('point', point);
    this.load.image('goalkeeper-stay', stay);
    this.load.image('goalkeeper-left', left);
    this.load.image('goalkeeper-right', right);
    this.load.image('goalkeeper-bottom', bottom);
    this.load.image('goalkeeper-top', top);

    this.load.image('bg-team-1', bgTeam1);
    this.load.image('bg-team-2', bgTeam2);
    this.load.image('bg-team-3', bgTeam3);
    this.load.image('bg-team-4', bgTeam4);
  }

  public create(): void {
    this.scene.stop();
    this.scene.start('Start', this.state);
  }
};
