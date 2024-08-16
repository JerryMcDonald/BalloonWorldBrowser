// src/game/scenes/PreloadScene.js
import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
  
    preload() {
      this.load.image('background', 'assets/background.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('star', 'assets/star.png');
    }
  
    create() {
      this.scene.start('MainScene');
    }
  }
  