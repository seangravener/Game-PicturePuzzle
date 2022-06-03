import { Container, Sprite } from "pixi.js";
import { Globals } from "./config/config.globals";
import { PuzzleGrid } from "./PuzzleGrid";

export class MainScene {
  constructor() {
    this.container = new Container();
    this.createBackground();
    this.createPuzzleGrid();
  }

  createBackground() {
    this.bg = new Sprite(Globals.assets.bg.texture);
    this.bg.width = window.innerWidth;
    this.container.addChild(this.bg);
  }

  createPuzzleGrid() {
    this.container.addChild(new PuzzleGrid().container);
  }
}
