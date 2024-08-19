import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'PlayerStanding');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(128, 192); // Increased size for the player
    this.setCollideWorldBounds(true);

    this.createAnimations(scene);

    // Create a graphics object for the debug line
    this.debugGraphics = scene.add.graphics();
  }

  createAnimations(scene) {
    scene.anims.create({
      key: 'walk',
      frames: [
        { key: 'PlayerLeftFoot' },
        { key: 'PlayerRightFoot' }
      ],
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'jumpUp',
      frames: [{ key: 'PlayerMidJump' }],
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'jumpPeak',
      frames: [{ key: 'PlayerHighJump' }],
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'jumpDown',
      frames: [{ key: 'PlayerMidJump' }],
      frameRate: 10,
      repeat: -1
    });
  }

  update(cursors, wasdKeys) {
    const speed = 300;

    // Draw the debug line around the collision box
    this.debugGraphics.clear();
    this.debugGraphics.lineStyle(2, 0x00ff00, 1); // Green color for the debug line
    this.debugGraphics.strokeRect(
      this.body.x,
      this.body.y,
      this.body.width,
      this.body.height
    );

    // Check if the player is on the ground or a platform before allowing walk animation
    if (this.body.blocked.down || this.body.touching.down) {
      if (cursors.left.isDown || wasdKeys.left.isDown) {
        this.setVelocityX(-speed);
        this.anims.play('walk', true);
      } else if (cursors.right.isDown || wasdKeys.right.isDown) {
        this.setVelocityX(speed);
        this.anims.play('walk', true);
      } else {
        this.setVelocityX(0);
        this.setTexture('PlayerStanding'); // Switch to standing still image
      }

      // Ensure the collision box is reset and the player stays on the platform
      this.adjustPositionAfterCollisionBoxExpansion();
    } else {
      // Keep the horizontal movement but prevent walk animation while in the air
      if (cursors.left.isDown || wasdKeys.left.isDown) {
        this.setVelocityX(-speed);
      } else if (cursors.right.isDown || wasdKeys.right.isDown) {
        this.setVelocityX(speed);
      } else {
        this.setVelocityX(0);
      }

      // Handle the jump animations with peak delay
      if (this.body.velocity.y < 0) {
        // Player is moving up
        this.anims.play('jumpUp', true);
        this.resetCollisionBox(); // Use normal collision box while moving up
        this.isAtPeak = false;
      } else if (this.body.velocity.y === 0 && !this.isAtPeak) {
        // Player is at the peak of the jump
        this.anims.play('jumpPeak', true);
        this.adjustCollisionBoxForHighJump(); // Adjust collision box for high jump
        this.isAtPeak = true;

        // Delay switching to the falling animation
        this.scene.time.delayedCall(200, () => {
          if (this.body.velocity.y > 0) {
            this.anims.play('jumpDown', true);
          }
          this.isAtPeak = false; // Reset after the delay
        }, [], this);
      } else if (this.body.velocity.y > 0 && !this.isAtPeak) {
        // Player is falling down
        this.anims.play('jumpDown', true);
        // this.resetCollisionBox(); // Use normal collision box while falling down
      }
    }

    // Handle jumping
    if ((cursors.up.isDown || wasdKeys.up.isDown) && (this.body.blocked.down || this.body.touching.down)) {
      this.setVelocityY(-165); // Adjust jump height if needed
    }
  }

  adjustCollisionBoxForHighJump() {
    // Calculate the new height by reducing it by a fourth
    const newHeight = this.displayHeight * 0.75;

    // Set the new size for the collision box, keeping the width the same
    this.body.setSize(this.displayWidth, newHeight);

    // No need to change the offset; the box will reduce from the top
    this.body.setOffset(0, 0);  // Keep the offset at 0 to reduce from the top
}

  resetCollisionBox() {
    // Capture the current Y position before resetting the box
    const oldHeight = this.body.height;
    
    // Reset the player's collision box to the default size
    this.body.setSize(this.displayWidth, this.displayHeight);
    this.body.setOffset(0, 0); // Reset the offset

    // Adjust the player's position upward by the difference in heights
    const heightDifference = this.body.height - oldHeight;
    this.y -= heightDifference; // Move the player up by the height difference
  }

  adjustPositionAfterCollisionBoxExpansion() {
    // Check if the player is on a platform or the ground and the collision box has expanded
    if (this.body.blocked.down || this.body.touching.down) {
      this.resetCollisionBox();
    }
  }
}
