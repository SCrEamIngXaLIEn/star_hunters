
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import starPrefab from "./starPrefab";
import playerPrefab from "./playerPrefab";
import platformPrefab from "./platformPrefab";
import scorePrefab from "./scorePrefab";
/* START-USER-IMPORTS */
import bombPrefab from "./bombPrefab";
import LevelUtils from "./LevelUtils";
/* END-USER-IMPORTS */

export default class Level2 extends Phaser.Scene {

	constructor() {
		super("level2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// bgColor
		const bgColor = this.add.rectangle(0, 0, 1600, 1200);
		bgColor.setOrigin(0, 0);
		bgColor.isFilled = true;
		bgColor.fillColor = 356863;

		// mountains
		const mountains = this.add.image(0, 0, "mountains");
		mountains.setOrigin(0, 0);
		mountains.tintTopLeft = 16777215;
		mountains.tintTopRight = 16777215;
		mountains.tintBottomLeft = 16777215;
		mountains.tintBottomRight = 16777215;

		// hills
		const hills = this.add.image(-1, 0, "hills");
		hills.setOrigin(0, 0);
		hills.tintTopLeft = 16777215;
		hills.tintTopRight = 16777215;
		hills.tintBottomLeft = 16777215;
		hills.tintBottomRight = 16777215;

		// starsLayer
		const starsLayer = this.add.layer();

		// star
		const star = new starPrefab(this, 44, 655);
		starsLayer.add(star);

		// star_1
		const star_1 = new starPrefab(this, 155, 655);
		starsLayer.add(star_1);

		// star_2
		const star_2 = new starPrefab(this, 277, 795);
		starsLayer.add(star_2);

		// star_3
		const star_3 = new starPrefab(this, 388, 795);
		starsLayer.add(star_3);

		// star_4
		const star_4 = new starPrefab(this, 510, 655);
		starsLayer.add(star_4);

		// star_5
		const star_5 = new starPrefab(this, 621, 655);
		starsLayer.add(star_5);

		// star_6
		const star_6 = new starPrefab(this, 747, 935);
		starsLayer.add(star_6);

		// star_7
		const star_7 = new starPrefab(this, 857, 935);
		starsLayer.add(star_7);

		// star_8
		const star_8 = new starPrefab(this, 981, 655);
		starsLayer.add(star_8);

		// star_9
		const star_9 = new starPrefab(this, 1090, 655);
		starsLayer.add(star_9);

		// star_10
		const star_10 = new starPrefab(this, 1215, 795);
		starsLayer.add(star_10);

		// star_11
		const star_11 = new starPrefab(this, 1323, 795);
		starsLayer.add(star_11);

		// star_12
		const star_12 = new starPrefab(this, 1553, 655);
		starsLayer.add(star_12);

		// star_13
		const star_13 = new starPrefab(this, 1445, 655);
		starsLayer.add(star_13);

		// player
		const player = new playerPrefab(this, 28, 1123);
		this.add.existing(player);
		player.scaleX = 1.2;
		player.scaleY = 1.2;

		// platformsLayer
		const platformsLayer = this.add.layer();

		// ground
		const ground = new platformPrefab(this, 800, 1216);
		ground.scaleX = 4;
		ground.scaleY = 4;
		ground.setOrigin(0.5, 0.5);
		platformsLayer.add(ground);

		// platform
		const platform = new platformPrefab(this, 3, 700);
		platform.scaleX = 0.5;
		platform.scaleY = 0.5;
		platform.setOrigin(0, 0);
		platformsLayer.add(platform);

		// platform_1
		const platform_1 = new platformPrefab(this, 233, 840);
		platform_1.scaleX = 0.5;
		platform_1.scaleY = 0.5;
		platform_1.setOrigin(0, 0);
		platformsLayer.add(platform_1);

		// platform_2
		const platform_2 = new platformPrefab(this, 466.5, 700);
		platform_2.scaleX = 0.5;
		platform_2.scaleY = 0.5;
		platform_2.setOrigin(0, 0);
		platformsLayer.add(platform_2);

		// platform_3
		const platform_3 = new platformPrefab(this, 701.5, 980);
		platform_3.scaleX = 0.5;
		platform_3.scaleY = 0.5;
		platform_3.setOrigin(0, 0);
		platformsLayer.add(platform_3);

		// platform_4
		const platform_4 = new platformPrefab(this, 933, 700);
		platform_4.scaleX = 0.5;
		platform_4.scaleY = 0.5;
		platform_4.setOrigin(0, 0);
		platformsLayer.add(platform_4);

		// platform_5
		const platform_5 = new platformPrefab(this, 1167, 840);
		platform_5.scaleX = 0.5;
		platform_5.scaleY = 0.5;
		platform_5.setOrigin(0, 0);
		platformsLayer.add(platform_5);

		// platform_6
		const platform_6 = new platformPrefab(this, 1398, 700);
		platform_6.scaleX = 0.5;
		platform_6.scaleY = 0.5;
		platform_6.setOrigin(0, 0);
		platformsLayer.add(platform_6);

		// bombsLayer
		const bombsLayer = this.add.layer();

		// clouds
		const clouds = this.add.image(0, 0, "clouds");
		clouds.scaleX = 1.07;
		clouds.setOrigin(0, 0);
		clouds.tintTopLeft = 16777215;
		clouds.tintTopRight = 16777215;
		clouds.tintBottomLeft = 16777215;
		clouds.tintBottomRight = 16777215;

		// scoreText
		const scoreText = new scorePrefab(this, 0, 0);
		this.add.existing(scoreText);

		// player_platform_collider
		this.physics.add.collider(player, platformsLayer.list);

		// star_platform_collider
		this.physics.add.collider(starsLayer.list, platformsLayer.list);

		// player_star_collider
		this.physics.add.overlap(player, starsLayer.list, this.collectStar as any, undefined, this);

		// bomb_platform_collider
		this.physics.add.collider(bombsLayer.list, platformsLayer.list);

		// player_bomb_collider
		const player_bomb_collider = this.physics.add.collider(player, bombsLayer.list, this.hitBomb as any, undefined, this);

		this.mountains = mountains;
		this.hills = hills;
		this.starsLayer = starsLayer;
		this.player = player;
		this.bombsLayer = bombsLayer;
		this.clouds = clouds;
		this.scoreText = scoreText;

		this.events.emit("scene-awake");
	}

	private mountains!: Phaser.GameObjects.Image;
	private hills!: Phaser.GameObjects.Image;
	private starsLayer!: Phaser.GameObjects.Layer;
	private player!: playerPrefab;
	private bombsLayer!: Phaser.GameObjects.Layer;
	private clouds!: Phaser.GameObjects.Image;
	private scoreText!: scorePrefab;

	/* START-USER-CODE */
	private gameOver: boolean = false;
	private isPaused: boolean = false;
	private starCollectionCount: number = 0;

	create() {

		this.editorCreate();

		// Retrieve gameOver variable from registry
		this.gameOver = this.registry.get('gameOver');

		// Retrieve starCollectionCount variable from registry
		this.starCollectionCount = this.registry.get('starCollectionCount');

		LevelUtils.createBackgrounds(0xffffff, this, this.mountains, this.hills, this.clouds);

		LevelUtils.createCameras(this, this.player);

        LevelUtils.retrieveScore(this, this.scoreText);

		LevelUtils.togglePause(this, this.isPaused, this.player, this.physics);

		LevelUtils.setScore(this, this.scoreText);

		this.lights.addLight(0, 0, 100, 0xfff5be, 0);
		this.lights.enable();
		this.lights.setAmbientColor(0xffffff);
	}

	private collectStar(player: playerPrefab, star: starPrefab) {

		star.collected();

		this.scoreText.addScore(10);

		if (starPrefab.noStarActive(this.starsLayer)) {

			// Increment star collected count
			this.starCollectionCount++;

			if (this.starCollectionCount === 5) {
				const currentScoreData = this.scoreText.getScore();
            	this.cameras.main.fade(800, 0, 0, 0, false, (camera: any, progress: number) => {
					this.physics.pause();
					if (progress > .9) {
						this.registry.set('scoreData', currentScoreData);
						this.scene.stop('level2');
						this.scene.start('level3');
					}
				});
			}
			else {
				// Respawn stars
				for(const obj of this.starsLayer.list) {

				const star = obj as starPrefab;
				star.resetStar();

			}

				// Spawn new bomb
				const bombX = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
				const bomb = new bombPrefab(this, bombX, 0);
				this.bombsLayer.add(bomb);
			}
		}
	}

	private hitBomb(player: playerPrefab, bomb: bombPrefab) {

		this.physics.pause();
		player.die();
		this.gameOver = true;

	}

	update() {

		LevelUtils.gameOver(this, this.gameOver, this.scoreText);

		this.player.controls();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
