import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    this.createPuzzlePieces();
  }

  createPuzzlePieces() {
    this.pieces = [];

    let ids = PuzzleGridConfig.map((field) => field.id);
    PuzzleGridConfig.forEach((field) => {
      const random = Math.floor(Math.random() * ids.length); // random between [0, 8] (equals 9 possibilities)
      const id = ids[random];

      ids = ids.filter((item) => item !== id);
      const piece = new PuzzlePiece(id, field);
      this.container.addChild(piece.sprite);
      this.pieces.push(piece);
    });
  }
}
