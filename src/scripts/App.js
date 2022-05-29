import * as PIXI from "pixi.js";
import { Loader } from "./Loader";

export class App {
  run() {
    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    //load sprites
    this.loader = new Loader(this.app.loader);
    this.loader.preload().then(() => this.start());
  }

  start() {
    console.log("resources loaded!");
  }
}
