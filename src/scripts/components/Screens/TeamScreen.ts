import Start from '../../scenes/Start';
import { Teams } from '../../types';
import Utils from '../../libs/Utils';

export default class TeamScreen {
  private scene: Start;
  private currentTeam: Teams;
  private teams: TeamElement[];
  private startButton: Phaser.GameObjects.Sprite;

  constructor (scene: Start) {
    this.scene = scene;
    this.currentTeam = Teams.None;
    this.createElements();
  }

  private createElements(): void {
    this.scene.add.sprite(0, 0, 'team-screen').setOrigin(0);

    this.teams = [];
    this.teams.push(new TeamElement(this.scene, Teams.Zenit, 210, 430 - 25 + 20, () => {
      this.updateScreen(Teams.Zenit);
    }));
    this.teams.push(new TeamElement(this.scene, Teams.CSKA, 510, 430 - 25 + 20, () => {
      this.updateScreen(Teams.CSKA);
    }));
    this.teams.push(new TeamElement(this.scene, Teams.Sochi, 210, 900 - 60 + 20, () => {
      this.updateScreen(Teams.Sochi);
    }));
    this.teams.push(new TeamElement(this.scene, Teams.Novgorod, 510, 900 - 60 + 20, () => {
      this.updateScreen(Teams.Novgorod);
    }));

    this.createButton();
  }

  private updateScreen(team: Teams): void {
    this.currentTeam = team;
    this.teams.forEach(el => {
      el.update(this.currentTeam);
    });
    if (this.currentTeam !== Teams.None) {
      this.startButton.setVisible(true);
    }
  }

  private createButton(): void {
    this.startButton = this.scene.add.sprite(this.scene.cameras.main.centerX, 1170, 'play-button');
    this.startButton.setVisible(false);
    Utils.clickButton(this.scene, this.startButton, () => {
      this.scene.state.team = this.currentTeam;
      this.scene.scene.restart();
    });
  }
};

class TeamElement {
  private scene: Start;
  public team: Teams;
  private bg: Phaser.GameObjects.Sprite;
  private sprite: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private callback: () => void;
  private x: number;
  private y: number;

  constructor (scene: Start, team: Teams, x: number, y: number, callback: () => void) {
    this.scene = scene;
    this.team = team;
    this.callback = callback;
    this.x = x;
    this.y = y;
    this.create();
  }

  private create(): void {
    let text: string = '';
    const texture: string = `team-${this.team}`;
    switch (this.team) {
      case Teams.Zenit: 
        text = 'ЗЕНИТ';
        break;
      case Teams.CSKA:
        text = 'ЦСКА';
        break;
      case Teams.Sochi: 
        text = 'СОЧИ';
        break;
      case Teams.Novgorod:
        text = 'НИЖНИЙ НОВГОРОД';
        break;
    };

    const config: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'DrukWide',
      fontSize: '20px',
      wordWrap: { width: 250 },
      align: 'center',
    };

    this.bg = this.scene.add.sprite(this.x, this.y, 'team-unselected');
    this.sprite = this.scene.add.sprite(this.x, this.y - 20, texture).setScale(0.5);
    this.text = this.scene.add.text(this.x, this.y + 150, text, config).setOrigin(0.5);
    Utils.click(this.bg, () => {
      this.callback();
    });
  }

  public update(selectedTeam: Teams) {
    const bgSprite = selectedTeam === this.team ? 'team-selected' : 'team-unselected';
    this.bg.setTexture(bgSprite);
  }
};
