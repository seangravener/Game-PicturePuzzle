import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { PuzzleGrid } from "./PuzzleGride";

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
    this.createPuzzleGrid();
  }

  createBackground() {
    console.log(Globals);
    this.bg = new PIXI.Sprite(Globals.resources.bg.texture);
    this.container.addChild(this.bg);
    this.bg.width = window.innerWidth;
    // this.bg.height = window.innerHeight;

    // use `anchor.set()` to change x and y
    // this.bg.anchor.set(0.5, 0.5);
    // console.log(this.bg.x, this.bg.y);

    // Show mirror version
    console.log(this.bg);
    // this.bg.scale.set(-1, 1);
    // this.bg.x = window.innerWidth;

    // Show flipped version
    // this.bg.scale.set(1, -1);
    // this.bg.y = window.innerHeight;

    // this.bg.alpha = 0.6
    // this.bg.visible = false
    // this.bg.tint = 0xff0000; // colorize
  }

  createPuzzleGrid() {
    const grid = new PuzzleGrid();
    this.container.addChild(grid.container);
  }
}
