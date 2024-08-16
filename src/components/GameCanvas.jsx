import { useEffect } from 'react';
import Phaser from 'phaser';
import config from '../game/config';
import '../css/GameCanvas.css';

const GameCanvas = () => {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="game-canvas-container">
      <div id="phaser-game-canvas"></div>
    </div>
  );
};

export default GameCanvas;
