import Phaser from 'phaser';
import Player from '../player.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  
  create() {
    // Adjust background and world bounds as before
    this.add.rectangle(0, 0, this.scale.width * 2, this.scale.height, 0x87ceeb).setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, this.scale.width * 2, this.scale.height);

    // Create platforms and other game elements as before
    this.platforms = this.physics.add.staticGroup();
    this.createPlatforms();

    // Adjust the player’s initial spawn position to ensure they don’t start too low
    this.player = new Player(this, 200, this.scale.height - 200); // Move player up slightly

    // Add input handling and camera follow as before
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasdKeys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    this.physics.add.collider(this.player, this.platforms);
    this.cameras.main.setBounds(0, 0, this.scale.width * 2, this.scale.height);
    this.cameras.main.startFollow(this.player);
  }

  createPlatforms() {
    this.platforms.create(this.scale.width, this.scale.height - 32, null)
      .setDisplaySize(this.scale.width * 2, 64)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(600, this.scale.height - 100, null)
      .setDisplaySize(200, 32)
      .refreshBody()
      .setTint(0x654321);

    // this.platforms.create(1200, this.scale.height - 150, null)
    //   .setDisplaySize(200, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(50, this.scale.height - 350, null)
    //   .setDisplaySize(150, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(1500, this.scale.height - 250, null)
    //   .setDisplaySize(150, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(750, this.scale.height - 350, null)
    //   .setDisplaySize(150, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(1700, this.scale.height - 350, null)
    //   .setDisplaySize(150, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(1300, this.scale.height - 200, null)
    //   .setDisplaySize(200, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(1800, this.scale.height - 150, null)
    //   .setDisplaySize(200, 32)
    //   .refreshBody()
    //   .setTint(0x654321);

    // this.platforms.create(2000, this.scale.height - 250, null)
    //   .setDisplaySize(200, 32)
    //   .refreshBody()
    //   .setTint(0x654321);
  }

  createStars() {
    const stars = this.physics.add.group({
      key: null,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 150 }
    });

    stars.children.iterate((child) => {
      child.setDisplaySize(24, 24);
      child.setTint(0xffff00);
    });

    return stars;
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    // Logic for collecting stars (e.g., increase score)
  }

  update() {
    this.player.update(this.cursors, this.wasdKeys);
  }
}
