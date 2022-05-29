import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
  }

  createBackground() {
    console.log(Globals);
    this.bg = new PIXI.Sprite(Globals.resources.bg.texture);
    this.container.addChild(this.bg);
    this.bg.width = window.innerWidth;
    // this.bg.height = window.innerHeight;
  }
}
