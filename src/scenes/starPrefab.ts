
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface starPrefab {

	 body: Phaser.Physics.Arcade.Body;
}

export default class starPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "star", frame);

		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.setSize(24, 22, false);

		/* START-USER-CTR-CODE */
		// Store the initial Y coordinate
		this.initialY = y;

		this.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

		// Create the hover tween
        this.createHoverTween();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private initialY?: number;

	private hoverTween?: Phaser.Tweens.Tween;

	collected() {

		this.disableBody(true, true);

	}

	resetStar() {

		this.enableBody(true, this.x, this.initialY, true, true);

		// Restart the hover tween
        if (this.hoverTween) {
            this.hoverTween.restart();
        } else {
            this.createHoverTween();
        }

	}

	stopHoverTween() {
        if (this.hoverTween) {
            this.hoverTween.pause();
        }
    }

	static noStarActive(starsLayer: Phaser.GameObjects.Layer) {
        for (const star of starsLayer.list) {
            if (star.active) {
                return false;
            }
        }
        return true;
    }

	private createHoverTween() {
        if (!this.initialY) return;

        this.hoverTween = this.scene.tweens.add({
            targets: this,
            y: this.initialY - 10,
            duration: 650,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
