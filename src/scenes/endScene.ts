import Phaser from "phaser";
import scorePrefab from "./scorePrefab";
import LevelUtils from "./LevelUtils";

export default class endScene extends Phaser.Scene {

    constructor() {        
        super('endScene');
    }

    private gameOver: boolean = false;

    create(): void {

        // background
		const background = this.add.rectangle(400, 300, 800, 475);
		background.isFilled = true;
		background.fillColor = 1481413;

        this.gameOver = this.registry.get('gameOver');

        // game over/win
        if (this.gameOver) {
            this.add.image(400, 200, 'gameover');
        } else {
            this.add.image(400, 200, 'youwin');
        }

        // retirieve score data
        const scoreData = this.registry.get('scoreData') || { score: 0, highScore: 0 };
        
        // final score
        this.add.text(270, 330, `Final Score: ${scoreData.score}`, { fontSize: '32px', color: '#fff', fontFamily: 'cursive' });

        // high score
        this.add.text(270, 380, `High Score: ${scoreData.highScore}`, { fontSize: '32px', color: '#fff', fontFamily: 'cursive' });

        // start new game
        this.add.text(270, 550, '           Click to Play Again\nor press ESC for the Main Menu', { font: '16px Cursive', color: '#fff'});
            this.input.on('pointerup', () => {
                this.registry.set('gameOver', false);
                LevelUtils.resetScore(this, scoreData);
                this.scene.stop('endScene');
                this.scene.start('level1');
            }); 

            // Return to start screen
            this.input.keyboard!.on('keydown-ESC', () => {
                this.scene.stop('endScene');
                this.scene.start('Start');
            });
    }
}