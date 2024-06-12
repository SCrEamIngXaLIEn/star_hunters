
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Pause extends Phaser.Scene {

	constructor() {
		super("Pause");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// pauseText
		const pauseText = this.add.text(800, 413, "", {});
		pauseText.setOrigin(0.5, 0.5);
		pauseText.text = "PAUSED";
		pauseText.setStyle({ "fontFamily": "Cursive", "fontSize": "32px" });

		// menuText
		const menuText = this.add.text(800, 513, "", {});
		menuText.setOrigin(0.5, 0.5);
		menuText.text = "Main Menu";
		menuText.setStyle({ "fontFamily": "Cursive", "fontSize": "24px" });

		// controls
		const controls = this.add.image(813, 691, "controls");
		controls.tintFill = true;

		this.pauseText = pauseText;
		this.menuText = menuText;
		this.controls = controls;

		this.events.emit("scene-awake");
	}

	private pauseText!: Phaser.GameObjects.Text;
	private menuText!: Phaser.GameObjects.Text;
	private controls!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		const { width, height } = this.scale;

		const pauseOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75);		

		this.pauseText.setX(width / 2).setY(height / 2 - 250);		
		this.menuText.setX(width / 2).setY(height / 2 - 200);
		this.controls.setX(width / 2).setY(height /2 + 30);

		pauseOverlay.setDepth(10);
		this.pauseText.setDepth(11);
		this.menuText.setDepth(11);
		this.controls.setDepth(11);
		this.menuText.setInteractive();

		this.menuText.on('pointerover', () => {
			this.menuText.setTint(0xFFE948);
			this.menuText.setScale(1.1);
		});

		this.menuText.on('pointerout', () => {
			this.menuText.clearTint();
			this.menuText.setScale(1);
		});

		this.menuText.on('pointerdown', () => {
			this.scene.stop('PauseScene');
			this.scene.stop('level1');
			this.scene.start('Start');
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
