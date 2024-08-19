import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    // Add a background or a color for the menu
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x282c34).setOrigin(0, 0);

    // Add the "Balloon World" title
    this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'Balloon World', {
      fontSize: '64px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Add a "Start Game" button
    const startButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Start Game', {
      fontSize: '32px',
      color: '#61dafb',
      fontFamily: 'Arial'
    }).setOrigin(0.5).setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('MainScene'); // Start the actual game scene
    });

    startButton.on('pointerover', () => {
      startButton.setStyle({ color: '#21a1f1' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ color: '#61dafb' });
    });
  }
}
