import Goalkeeper, { Corners } from "../components/Goalkeeper";
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
  private animationIsPlaying: boolean;
  private ballPosition: Phaser.Math.Vector2;

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
    this.ball = this.add.sprite(centerX, centerY + 320, 'ball').setDepth(2);
    this.ballPosition = new Phaser.Math.Vector2(this.ball.x, this.ball.y);
    this.pointsText = this.add.text(150, 65, this.state.currentPoints.toString(), { fontFamily: Fonts.DrukWide, fontSize: '45px' }).setOrigin(0.5);
    this.hint = this.add.text(centerX, 300, 'ПРОМАХ', { fontFamily: Fonts.DrukWide, fontSize: '35px' }).setOrigin(0.5).setAlpha(0);
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

    Utils.click(zone1, () => this.onZoneClick(zone1, Targets.Top, Corners.left_top));
    Utils.click(zone2, () => this.onZoneClick(zone2, Targets.Top, Corners.right_top));
    Utils.click(zone3, () => this.onZoneClick(zone3, Targets.Middle, Corners.left_middle));
    Utils.click(zone4, () => this.onZoneClick(zone4, Targets.Middle, Corners.right_middle));
    Utils.click(zone5, () => this.onZoneClick(zone5, Targets.Bottom, Corners.left_bottom));
    Utils.click(zone6, () => this.onZoneClick(zone6, Targets.Bottom, Corners.right_bottom));
    if (process.env.DEV) this.createDebugZone();
  }

  private ballAnimation(position: Phaser.Math.Vector2, success: boolean): void {
    this.tweens.add({
      targets: this.ball,
      onComplete: success ? this.resetBallPosition : this.flyOutAnimation,
      onCompleteScope: this,
      x: position.x,
      y: position.y,
      duration: 350,
      ease: 'Power2',
    });
  }

  private flyOutAnimation(): void {
    const randomX = Math.max(Math.random() * 350, 150);
    const randomY = Math.max(Math.random() * 500, 250);
    this.tweens.add({
      targets: this.ball,
      onComplete: this.resetBallPosition,
      onCompleteScope: this,
      x: Math.random() < 0.5 ? `+= ${randomX}` : `-= ${randomX}`,
      y: Math.random() < 0.5 ? `-= ${randomY}` : `+= ${randomY}`,
      duration: 200,
    });
  }

  private resetBallPosition(): void {
    this.ball.setPosition(this.ballPosition.x, this.ballPosition.y);
  }

  private onZoneClick(zone: Phaser.GameObjects.Zone, target: Targets, corner: Corners): void {
    if (this.animationIsPlaying) return;
    this.animationIsPlaying = true;
    api.tryHitting({ vkId: this.state.vkId, target: target }).then(data => {
      console.log(data);
      if (data.error) {
        this.scene.stop();
        this.scene.start('Start', this.state);
      } else {
        this.state.attempts = data.attempts;
        this.ballAnimation(new Phaser.Math.Vector2(zone.x, zone.y), data.success);
        this.goalkeeper.playAnimation(corner, data.success);

        if (data.success) {
          const points = data.points - this.state.currentPoints
          this.gamePoints += points;
          this.state.currentPoints = data.points;
          this.showHint(`+${points}`);
        } else {
          this.showHint('ПРОМАХ');
        }
        if (this.state.attempts === 0) {
          this.endGame();
        }
        this.healthBar.update(this.state.attempts);
      }
    });
  }

  private showHint(str: string): void {
    this.hint.setText(str);
    this.tweens.add({
      delay: 400,
      duration: 500,
      yoyo: true,
      alpha: 1,
      targets: this.hint,
      onComplete: () => {
        this.hint.setAlpha(0);
        this.animationIsPlaying = false;
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
