import Goalkeeper from "../components/Goalkeeper";
import api from "../libs/Api";
import { State, Fonts, Targets, Modals } from "../types";
import { HealthBar } from './../components/HealthBar';
import Utils from './../libs/Utils';

export default class Game extends Phaser.Scene {
  public state: State;
  private ball: Phaser.GameObjects.Sprite;
  private pointsText: Phaser.GameObjects.Text;
  private hint: Phaser.GameObjects.Text;
  private healthBar: HealthBar;
  private goalkeeper: Goalkeeper;
  private gamePoints: number;

  constructor() {
    super('Game');
  }

  public init(state: State): void {
    this.state = state;
  }

  public create(): void {
    if (this.state.attempts === 0) {
      this.endGame();
    }
    this.gamePoints = 0;
    this.add.sprite(0, 0, 'game-screen').setOrigin(0);
    const { centerX, centerY } = this.cameras.main;
    this.ball = this.add.sprite(centerX, centerY + 320, 'ball');
    this.pointsText = this.add.text(150, 65, this.state.currentPoints.toString(), { fontFamily: Fonts.DrukWide, fontSize: '45px' }).setOrigin(0.5);
    this.hint = this.add.text(centerX, 300, 'ПРОМАХ', { fontFamily: Fonts.DrukWide, fontSize: '35px' }).setOrigin(0.5);
    this.healthBar = new HealthBar(this);
    this.healthBar.update(this.state.attempts);

    this.goalkeeper = new Goalkeeper(this);
    this.createZones();
  }

  private createZones(): void {
    const { centerX, centerY, displayWidth } = this.cameras.main;
    const zoneWidth = 150;
    const zoneHeight = 100;
    const zone1 = this.add.zone(120, centerY - 50, zoneWidth, zoneHeight).setDropZone(undefined, () => {});
    const zone2 = this.add.zone(displayWidth - 120, centerY - 50, zoneWidth, zoneHeight).setDropZone(undefined, () => {});
    const zone3 = this.add.zone(200, centerY + 50, zoneWidth, zoneHeight).setDropZone(undefined, () => {});
    const zone4 = this.add.zone(displayWidth - 210, centerY + 50, zoneWidth, zoneHeight).setDropZone(undefined, () => {});
    const zone5 = this.add.zone(120, centerY + 150, zoneWidth, zoneHeight).setDropZone(undefined, () => {});
    const zone6 = this.add.zone(displayWidth - 120, centerY + 150, zoneWidth, zoneHeight).setDropZone(undefined, () => {});

    Utils.click(zone1, () => this.onZoneClick(Targets.Top));
    Utils.click(zone2, () => this.onZoneClick(Targets.Top));
    Utils.click(zone3, () => this.onZoneClick(Targets.Middle));
    Utils.click(zone4, () => this.onZoneClick(Targets.Middle));
    Utils.click(zone5, () => this.onZoneClick(Targets.Bottom));
    Utils.click(zone6, () => this.onZoneClick(Targets.Bottom));
    this.createDebugZone();
  }

  private onZoneClick(target: Targets): void {
    api.tryHitting({ vkId: this.state.vkId, target: target }).then(data => {
      console.log(data);
      if (data.error) {
        this.scene.stop();
        this.scene.start('Start', this.state);
      } else {
        this.state.attempts = data.attempts;
        if (data.success) {
          const points = data.points - this.state.currentPoints
          this.gamePoints += points;
          this.state.currentPoints = data.points;
          this.hint.setText(`+${points}`);
        } else {
          this.hint.setText('ПРОМАХ');
        }
        if (this.state.attempts === 0) {
          this.endGame();
        }
      }
    });
  }

  private endGame(): void {
    this.scene.stop();
    this.state.modal = Modals.End;
    this.scene.start('Start', this.state);
  }

  private createDebugZone(): void {
    let color = 0xff00ff;
    this.children.list.forEach(el => {
      if (el.type === 'Zone') {
        const zone = el as Phaser.GameObjects.Zone;
        this.createZoneGraphics(zone, color);
        color += 0x000050;
      }
    })
  }

  private createZoneGraphics(zone: Phaser.GameObjects.Zone, color: number): void {
    const { height, width } = zone.input.hitArea;
    const { x, y } = zone;
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, color);
    graphics.strokeRect(x - width / 2, y - height / 2, width, height);
  }
};
