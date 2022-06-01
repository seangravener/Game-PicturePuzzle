import { Application } from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";

export class App {
  run() {
    // Create canvas
    this.instance = new Application({ resizeTo: window });
    document.body.appendChild(this.instance.view);

    // Load sprites
    this.loader = new Loader(this.instance.loader);
    this.loader.preload().then(() => this.start());
  }

  start() {
    this.scene = new MainScene();
    this.instance.stage.addChild(this.scene.container);
    console.log("The game has started");
  }
}
