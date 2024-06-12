
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class scorePrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 16, y ?? 16);

		// scoreText
		const scoreText = scene.add.text(16, 16, "", {});
		scoreText.text = "Score: 0";
		scoreText.setStyle({ "fontFamily": "Cursive", "fontSize": "32px" });
		this.add(scoreText);

		// highScoreText
		const highScoreText = scene.add.text(16, 64, "", {});
		highScoreText.text = "High Score: 0";
		highScoreText.setStyle({ "fontFamily": "Cursive", "fontSize": "32px" });
		this.add(highScoreText);

		this.scoreText = scoreText;
		this.highScoreText = highScoreText;

		/* START-USER-CTR-CODE */

		this.highScore = parseInt(localStorage.getItem("highScore") || "0", 10);
		this.setScrollFactor(0);

		/* END-USER-CTR-CODE */
	}

	private scoreText: Phaser.GameObjects.Text;
	private highScoreText: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	public score: number = 0;
	public highScore: number = 0;

	addScore(points: number) {

		this.score += points;
		if (this.score > this.highScore) {
			this.highScore = this.score;
			this.setScore(this.score, this.highScore);
		}

		this.scoreText.text = `Score: ${this.score}`;
		this.highScoreText.text = `High Score: ${this.highScore}`;
	}

	setScore(score: number, highScore: number) {
		this.score = score;
		this.highScore = highScore;

		localStorage.setItem("highScore", this.highScore.toString());

		this.scoreText.text = `Score: ${this.score}`;
		this.highScoreText.text = `High Score: ${this.highScore}`;
	}

	getScore(): { score: number; highScore: number } {
		return { score: this.score, highScore: this.highScore };
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
