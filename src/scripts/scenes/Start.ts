import { Modals, State, Teams } from '../types';
import Utils from '../libs/Utils';
import TeamScreen from '../components/Screens/TeamScreen';
import MainScreen from '../components/Screens/MainScreen';
import RaitingsScreen from '../components/Screens/RaitingsScreen';
import TutorialScreen from '../components/Screens/TutorialScreen';
import EndScreen from '../components/Screens/EndScreen';

export default class Start extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Start');
  }

  public init(state: State) {
    this.state = state;
  }

  public create(): void {
    if (this.state.team === Teams.None) {
      new TeamScreen(this);
    } else if (this.state.modal !== Modals.None) {
      if (this.state.modal === Modals.Tutorial) {
        new TutorialScreen(this);
      } else if (this.state.modal === Modals.Raitings) {
        new RaitingsScreen(this);
      } else if (this.state.modal === Modals.End) {
        new EndScreen(this);
      }
    } else {
      new MainScreen(this);
    }
  }
}