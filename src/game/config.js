// src/game/config.js
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import PreloadScene from './scenes/PreloadScene';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [PreloadScene, MainScene],
  parent: 'phaser-game-canvas',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

export default config;
