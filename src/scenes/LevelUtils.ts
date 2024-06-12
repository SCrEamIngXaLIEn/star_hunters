import Phaser from "phaser";
import scorePrefab from "./scorePrefab";
import playerPrefab from "./playerPrefab";

export default class LevelUtils {
    static createBackgrounds(tint: number, scene: Phaser.Scene, mountains: Phaser.GameObjects.Image, hills: Phaser.GameObjects.Image, clouds: Phaser.GameObjects.Image) {
        const bg1_width = mountains.getBounds().width;
        const bg2_width = hills.getBounds().width;
        const bg3_width = clouds.getBounds().width;
    
        mountains.setScrollFactor((bg1_width - 800) / 800)
            .setTint(tint)
            .setPipeline('Light2D');
        hills.setScrollFactor((bg2_width - 800) / 800)
            .setTint(tint)
            .setPipeline('Light2D');
        clouds.setScrollFactor((bg3_width - 800) / 800)
            .setTint(tint)
            .setPipeline('Light2D');
    }
    
    static createCameras(scene: Phaser.Scene, player: Phaser.GameObjects.GameObject) {
        scene.cameras.main.setBounds(0, 0, 1600, 1200);
        scene.physics.world.setBounds(0, 0, 1600, 1200);
        scene.cameras.main.startFollow(player, true, 0.5, 0.5);
    }
    
    static retrieveScore(scene: Phaser.Scene, scoreText: scorePrefab) {
        // Retrieve Score and High Score data
        const previousScoreData = scene.registry.get('scoreData');
        if (previousScoreData) {
            const { score, highScore } = previousScoreData;
            // Set score obtained from previous level
            scoreText.setScore(score, highScore);
        } else {
            // If no previous score data, set to default values
            const previousScore = scene.registry.get('score') || 0;
            const previousHighScore = parseInt(localStorage.getItem("highScore") || "0", 10);
            scoreText.setScore(previousScore, previousHighScore);
        }
    }
    
    static setScore(scene: Phaser.Scene, scoreText: scorePrefab) {
        scene.registry.set('score', scoreText.getScore().score);
        scene.registry.set('highScore', scoreText.getScore().highScore);
    }
    
    static togglePause(scene: Phaser.Scene, isPaused: boolean, player: any, physics: Phaser.Physics.Arcade.ArcadePhysics) {
		scene.input.keyboard?.on("keydown-ESC", () => {
			if (!isPaused) {
				isPaused = true;
				player.play("idle");
				physics.pause();
				scene.scene.launch('Pause');
                scene.scene.bringToTop('Pause');
			} else {
				isPaused = false;
				physics.resume();
				scene.scene.stop('Pause');
			}
		});
	}

    static gameOver(scene: Phaser.Scene, gameOver: boolean, scoreText: scorePrefab) {
        const currentScoreData = scoreText.getScore();
        if (gameOver) {
			scene.registry.set('gameOver', gameOver);
            scene.registry.set('scoreData', currentScoreData);
			scene.scene.stop('level1');
			scene.scene.start('endScene');
			return;
		}
    }

    static resetScore(scene: Phaser.Scene, scoreText: scorePrefab) {
        scoreText = scene.registry.get('scoreData');
		if (scoreText) {
			scoreText.score = 0;
			scene.registry.set('scoreData', scoreText);
		}
    }
}
