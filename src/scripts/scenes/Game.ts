import Goalkeeper from "../components/Goalkeeper";
import { State, Fonts } from "../types";
import { HealthBar } from './../components/HealthBar';

export default class Game extends Phaser.Scene {
  public state: State;
  private ball: Phaser.GameObjects.Sprite;
  private pointsText: Phaser.GameObjects.Text;
  private hint: Phaser.GameObjects.Text;
  private healthBar: HealthBar;
  private goalkeeper: Goalkeeper;

  constructor() {
    super('Game');
  }

  public init(state: State): void {
    this.state = state;
  }

  public create(): void {
    this.add.sprite(0, 0, 'game-screen').setOrigin(0);
    const { centerX, centerY } = this.cameras.main;
    this.ball = this.add.sprite(centerX, centerY + 320, 'ball');
    this.pointsText = this.add.text(150, 65, this.state.currentPoints.toString(), { fontFamily: Fonts.DrukWide, fontSize: '45px' }).setOrigin(0.5);
    this.hint = this.add.text(centerX, 300, 'ПРОМАХ', { fontFamily: Fonts.DrukWide, fontSize: '35px' }).setOrigin(0.5);
    this.healthBar = new HealthBar(this);
    this.healthBar.update(this.state.attempts);

    this.goalkeeper = new Goalkeeper(this);
  }
};
