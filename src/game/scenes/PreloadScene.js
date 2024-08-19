import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Load character images
    this.load.image('PlayerStanding', 'assets/sprites/player/PlayerStanding.png');
    this.load.image('PlayerLeftFoot', 'assets/sprites/player/PlayerLeftFoot.png');
    this.load.image('PlayerRightFoot', 'assets/sprites/player/PlayerRightFoot.png');
    this.load.image('PlayerMidJump', 'assets/sprites/player/PlayerMidJump.png');
    this.load.image('PlayerHighJump', 'assets/sprites/player/PlayerHighJump.png');
    this.load.image('PlayerHighJump2', 'assets/sprites/player/PlayerHighJump2.png');


    // Load other assets (e.g., platforms, background, etc.)
    // this.load.image('platform', 'assets/sprites/player/platform.png');
    // this.load.image('background', 'assets/sprites/player/background.png');

    // You can add a loading bar or loading text if needed
    let loadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
  }

  create() {
    // Transition to the main game scene after preloading is complete
    this.scene.start('MainScene');
  }
}
