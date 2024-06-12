
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import scorePrefab from "./scorePrefab";
import LevelUtils from "./LevelUtils";
/* END-USER-IMPORTS */

export default class Start extends Phaser.Scene {

	constructor() {
		super("Start");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	preload(): void {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	editorCreate(): void {

		// background
		const background = this.add.rectangle(400, 300, 800, 475);
		background.isFilled = true;
		background.fillColor = 1481413;

		// title
		const title = this.add.image(400, 198, "title");
		title.scaleX = 0.75;
		title.scaleY = 0.75;

		// startButton
		const startButton = this.add.image(400, 367, "start");

		// controlsButton
		const controlsButton = this.add.text(400, 422.5, "", {});
		controlsButton.setOrigin(0.5, 0.5);
		controlsButton.text = "Controls";
		controlsButton.setStyle({ "fontFamily": "Cursive", "fontSize": "24px" });

		this.startButton = startButton;
		this.controlsButton = controlsButton;

		this.events.emit("scene-awake");
	}

	private startButton!: Phaser.GameObjects.Image;
	private controlsButton!: Phaser.GameObjects.Text;
	

	/* START-USER-CODE */
	private scoreText!: scorePrefab;

	create() {

		this.editorCreate();

		// Reset the score to 0
		LevelUtils.resetScore(this, this.scoreText);

		// Reset gameOver variable to false
		this.registry.set('gameOver', false);

		// Reset starCollectionCount variable to 0
		this.registry.set('starCollectionCount', 0);

		// versionText
		const versionText = this.add.text(15, 554, '', { font: '16px Cursive'});
            versionText.setText([
                `Game Title: ${this.game.config.gameTitle}`,
                `Version: ${this.game.config.gameVersion}`
            ]);

		// start button
		this.startButton.setInteractive();
		this.startButton.on('pointerover', () => {
			this.startButton.setTint(0xFFE948);
			this.startButton.setScale(1.1);
			this.startButton.preFX!.addShadow(0, 0, 0.1, 1, 0, 6, 1);
		});
		this.startButton.on('pointerout', () => {
			this.startButton.clearTint();
			this.startButton.setScale(1);
			this.startButton.preFX!.clear();
		});
		this.startButton.on('pointerdown', () => {
			this.startButton.setScale(0.85);
			this.startButton.on('pointerup', () => {
				this.scene.stop('Start');
				this.scene.start('level1');
			})
		});

		// controls button
		this.controlsButton.setInteractive();
		this.controlsButton.on('pointerover', () => {
			this.controlsButton.setTint(0xFFE948);
			this.controlsButton.setScale(1.1);
			this.controlsButton.preFX!.addShadow(0, 0, 0.1, 1, 0, 6, 1);
		});
		this.controlsButton.on('pointerout', () => {
			this.controlsButton.clearTint();
			this.controlsButton.setScale(1);
			this.controlsButton.preFX!.clear();
		});
		this.controlsButton.on('pointerdown', () => {
			this.controlsButton.setScale(0.85);
			this.controlsButton.on('pointerup', () => {
				this.scene.stop('start');
				this.scene.start('controls');
			});
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

export class Controls extends Phaser.Scene {
	constructor() {
		super('controls');
	}

	create() {
		// background
		const background = this.add.rectangle(400, 300, 800, 475);
		background.isFilled = true;
		background.fillColor = 1481413;

		const controls = this.add.image(400, 300, 'controls');
		controls.tintFill = true;
		controls.preFX!.addShadow(0, 0, 0.1, 1, 0, 3, 1);

		this.add.text(270, 550, 'Click to return to the Main Menu', { font: '16px Cursive', color: '#fff'});
		this.input.on('pointerup', () => {
			this.scene.stop('controls');
			this.scene.start('Start');
		});
	}
}
