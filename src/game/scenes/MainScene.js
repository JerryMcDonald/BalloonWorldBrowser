import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    // Placeholder for the background (expanded to cover the larger world)
    this.add.rectangle(0, 0, this.scale.width * 2, this.scale.height, 0x87ceeb).setOrigin(0, 0); // Full-screen light blue background

    // Set the world bounds to match the expanded world
    this.physics.world.setBounds(0, 0, this.scale.width * 2, this.scale.height);

    // Create platforms using physics static group
    this.platforms = this.physics.add.staticGroup();

    // Add ground platform (stretched across the bottom)
    this.platforms.create(this.scale.width, this.scale.height - 32, null)
      .setDisplaySize(this.scale.width * 2, 64) // Full width of the expanded screen
      .refreshBody()
      .setTint(0x654321); // Brown color for the ground

    // Adjusted and added more platforms
    this.platforms.create(600, this.scale.height - 100, null)  // Lowered to 100 pixels above the ground
      .setDisplaySize(200, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(1200, this.scale.height - 150, null)  // Lowered to 150 pixels above the ground
      .setDisplaySize(200, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(50, this.scale.height - 200, null)   // Lowered to 200 pixels above the ground
      .setDisplaySize(150, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(1500, this.scale.height - 250, null)  // Lowered to 250 pixels above the ground
      .setDisplaySize(150, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(750, this.scale.height - 300, null)  // Lowered to 300 pixels above the ground
      .setDisplaySize(150, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(1700, this.scale.height - 350, null)  // Lowered to 350 pixels above the ground
      .setDisplaySize(150, 32)
      .refreshBody()
      .setTint(0x654321);

    // Additional platforms in the extended area
    this.platforms.create(1300, this.scale.height - 200, null)
      .setDisplaySize(200, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(1800, this.scale.height - 150, null)
      .setDisplaySize(200, 32)
      .refreshBody()
      .setTint(0x654321);

    this.platforms.create(2000, this.scale.height - 250, null)
      .setDisplaySize(200, 32)
      .refreshBody()
      .setTint(0x654321);

    // Placeholder for the player
    this.player = this.physics.add.sprite(100, this.scale.height - 100, null);
    this.player.setDisplaySize(32, 48); // Set size of the placeholder rectangle
    this.player.setTint(0xff0000); // Red tint for the player
    this.player.setBounce(0.2);

    // Ensure the player can move within the expanded world bounds
    this.player.setCollideWorldBounds(true);

    // Placeholder for interactive items
    this.stars = this.physics.add.group({
      key: null,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 150 }
    });

    this.stars.children.iterate((child) => {
      child.setDisplaySize(24, 24); // Set size of the placeholder rectangle
      child.setTint(0xffff00); // Yellow tint for the items
    });

    // Enable physics interactions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Input handling
    this.cursors = this.input.keyboard.createCursorKeys();

    // WASD keys for movement
    this.wasdKeys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // Set the camera to follow the player
    this.cameras.main.setBounds(0, 0, this.scale.width * 2, this.scale.height);
    this.cameras.main.startFollow(this.player);
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    // Logic for collecting stars (e.g., increase score)
  }

  update() {
    // Increase player speed
    const speed = 300;

    // Check for both arrow keys and WASD keys for movement
    if (this.cursors.left.isDown || this.wasdKeys.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setTint(0xff0000); // Red tint for moving left
    } else if (this.cursors.right.isDown || this.wasdKeys.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.setTint(0x00ff00); // Green tint for moving right
    } else {
      this.player.setVelocityX(0);
      this.player.setTint(0x0000ff); // Blue tint when idle
    }

    if ((this.cursors.up.isDown || this.wasdKeys.up.isDown) && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
