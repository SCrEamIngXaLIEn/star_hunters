
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface playerPrefab {

	 body: Phaser.Physics.Arcade.Body;
}

export default class playerPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "player", frame ?? 4);

		scene.physics.add.existing(this, false);
		this.body.bounce.x = 0.2;
		this.body.bounce.y = 0.2;
		this.body.collideWorldBounds = true;
		this.body.setOffset(0, 13);
		this.body.setSize(32, 35, false);

		// leftKey
		const leftKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKey
		const rightKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// upKey
		const upKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// AKey
		const aKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);

		// DKey
		const dKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		// WKey
		const wKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);

		// spaceKey
		const spaceKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// shiftKey
		const shiftKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.upKey = upKey;
		this.aKey = aKey;
		this.dKey = dKey;
		this.wKey = wKey;
		this.spaceKey = spaceKey;
		this.shiftKey = shiftKey;

		/* START-USER-CTR-CODE */

		this.setPipeline('Light2D');

		this.scene.events.once("scene-awake", () => this.awake());

		/* END-USER-CTR-CODE */
	}

	private leftKey: Phaser.Input.Keyboard.Key;
	private rightKey: Phaser.Input.Keyboard.Key;
	private upKey: Phaser.Input.Keyboard.Key;
	private aKey: Phaser.Input.Keyboard.Key;
	private dKey: Phaser.Input.Keyboard.Key;
	private wKey: Phaser.Input.Keyboard.Key;
	private spaceKey: Phaser.Input.Keyboard.Key;
	private shiftKey: Phaser.Input.Keyboard.Key;
	public autoPlayAnimation: string = "idle";

	/* START-USER-CODE */
	private speed: number = 160;

	awake() {
		this.play(this.autoPlayAnimation);
	}

	die() {

		this.setTint(0xff0000);
		this.play("idle");
	}

	controls() {
		if (this.scene.physics.world.isPaused) {
			return;
		}
		if (this.leftKey.isDown || this.aKey.isDown) {
			this.setVelocityX(-this.speed);
			this.play("left", true);
		}
		else if (this.rightKey.isDown || this.dKey.isDown) {
			this.setVelocityX(this.speed);
			this.play("right", true);
		}
		else {
			this.setVelocityX(0);
			this.play("idle");
		}

		if (this.body.touching.down) {
			if (this.upKey.isDown || this.wKey.isDown || this.spaceKey.isDown) {
				this.setVelocityY(-460);
			} 
		}
		if (this.shiftKey.isDown) {
			this.speed = 320;
		}
		else {
			this.speed = 160;
		}

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
