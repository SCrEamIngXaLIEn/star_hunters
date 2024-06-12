
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface platformPrefab {

	 body: Phaser.Physics.Arcade.StaticBody;
}

export default class platformPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "platform", frame);

		this.setOrigin(0, 0);
		scene.physics.add.existing(this, true);
		this.body.setSize(400, 32, false);

		/* START-USER-CTR-CODE */
		this.scene.events.once("scene-awake", () => {
			this.refreshBody();
		});

		this.body.checkCollision.down = false;
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
