import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";

export class App {
  run() {
    // create canvas
    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    //load sprites
    this.loader = new Loader(this.app.loader);
    this.loader.preload().then(() => this.start());
  }

  start() {
    this.scene = new MainScene();
    
    // The stage auto-renders
    this.app.stage.addChild(this.scene.container);
    console.log("the game started!");
  }
}
