import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'PlayerStanding');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(148, 192); // Increased size for the player
    
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
      // this.adjustPositionAfterCollisionBoxExpansion();
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
        // this.resetCollisionBox(); // Use normal collision box while moving up
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
            this.restoreCollisionBoxWithCheck(); // Restore collision box when transitioning to mid jump
          }
          this.isAtPeak = false; // Reset after the delay
        }, [], this);
      } else if (this.body.velocity.y > 0 && !this.isAtPeak) {
        // Player is falling down
        this.anims.play('jumpDown', true);
        // No need to reset the collision box here since it's handled when transitioning from high to mid jump
      }
    }

    // Handle jumping
    if ((cursors.up.isDown || wasdKeys.up.isDown) && (this.body.blocked.down || this.body.touching.down)) {
      this.setVelocityY(-165); // Adjust jump height if needed
    }
  }

  // adjustPositionAfterCollisionBoxExpansion() {
  //   // Check if the player is on a platform or the ground and the collision box has expanded
  //   if (this.body.blocked.down || this.body.touching.down) {
  //     this.resetCollisionBox();
  //   }
  // }

  adjustCollisionBoxForHighJump() {
    // Calculate the new height by reducing it by a fourth
    const newHeight = this.displayHeight * 0.75;

    // Set the new size for the collision box, keeping the width the same
    this.body.setSize(this.displayWidth, newHeight);

    // No need to change the offset; the box will reduce from the top
    this.body.setOffset(0, 0);  // Keep the offset at 0 to reduce from the top
  }

  resetCollisionBox() {
    // Reset the player's collision box to the default size
    this.body.setSize(this.displayWidth, this.displayHeight);
    this.body.setOffset(0, 0); // Reset the offset
  }

  restoreCollisionBoxWithCheck() {
    // Get the current height before resetting the collision box
    const oldHeight = this.body.height;

    // Reset the collision box to its normal size
    this.resetCollisionBox();

    const newHeight = this.body.height;

    // keep track of the size difference between the old collision box and the new one
    const collisionBoxSizeDifference = newHeight - oldHeight;

    // Check if the expanded collision box intersects with a platform below
    if (this.checkForPlatformBelow(collisionBoxSizeDifference)) {

      // Only move the player up if the expanded collision box intersects with a platform
      if (collisionBoxSizeDifference > 0) {
        this.y -= collisionBoxSizeDifference / 2;
        // this.setVelocityY(0); // Ensure the player doesn't clip through the platform
      }
    }
  }

  checkForPlatformBelow(collisionBoxSizeDifference) {
    // Perform a check to see if there's a platform directly below the player
    const playerBounds = this.getBounds();
  
    // Assuming platforms is a Phaser group containing all the platform objects
    const platforms = this.scene.platforms.getChildren(); // Get all platform objects
  
    for (const platform of platforms) {
      const platformBounds = platform.getBounds();
  
      // Skip the ground platform by checking its Y position or size
      if (platformBounds.top === this.scale.height - 32) {
        continue; // Skip this platform as it's the ground
      }
  
      // Check if the bottom of the player is above the top of the platform
      // and within the horizontal bounds of the platform
      if (
        playerBounds.bottom <= platformBounds.top + collisionBoxSizeDifference && // Player's bottom is above platform's top
        playerBounds.bottom > platformBounds.top && // Player's bottom is very close to platform's top
        playerBounds.right > platformBounds.left && // Player is within platform bounds horizontally
        playerBounds.left < platformBounds.right // Ensure we're checking the platform below
      ) {
        return true; // There is a platform directly below
      }
    }
    return false;
  }
  

}
