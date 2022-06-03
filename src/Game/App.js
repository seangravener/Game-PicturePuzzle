import { Application } from "pixi.js";
import { AssetLoader } from "./AssetLoader";
import { MainScene } from "./MainScene";

export class Game {
  run() {
    // Create canvas
    this.app = new Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    // Load sprites
    this.loader = new AssetLoader(this.app.loader);
    this.loader.preload().then(() => this.start());
  }

  start() {
    this.scene = new MainScene();
    this.app.stage.addChild(this.scene.container);
  }
}
