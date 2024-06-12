import Phaser from "phaser";
import Level1 from "./scenes/Level1";
import preloadAssetPackUrl from "../static/assets/preload-asset-pack.json";
import Preload from "./scenes/Preload";
import Start from "./scenes/Start";
import { Controls } from "./scenes/Start";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";
import Pause from "./scenes/Pause";
import EndScene from "./scenes/endScene";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", preloadAssetPackUrl);
    }

    create() {

       this.scene.start("Preload");
    }
}

window.addEventListener('load', function () {
	
	const game = new Phaser.Game({
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {
					x: 0,
					y: 575
				},
				debug: false
			}
		},
		width: 800,
		height: 600,
		backgroundColor: "#2f2f2f",
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},
		scene: [Boot, Preload, Start, Controls, Pause, Level1, Level2, Level3, EndScene],
		title: 'Star Hunters',
		version: '0.3.0-a'
	});

	game.scene.start("Boot");
});