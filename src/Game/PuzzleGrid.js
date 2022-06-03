import { Container } from "pixi.js";
import { puzzleTiles } from "./config/config.tiles";
import { genRandomInt } from "./utils/helpers";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
  constructor() {
    this.pieces = [];
    this.container = new Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    this.container.sortableChildren = true;
    this.createPuzzlePieces();
  }

  createPuzzlePieces() {
    let gridIds = puzzleTiles.map((item) => item.id);

    puzzleTiles.forEach((field) => {
      const random = genRandomInt(gridIds.length);
      const id = gridIds[random];
      gridIds = gridIds.filter((item) => item !== id);

      const piece = new PuzzlePiece(id, field);
      piece.on("drag:end", () => this.onPieceDragEnd(piece));
      this.container.addChild(piece.sprite);
      this.pieces.push(piece);
    });
  }

  onPieceDragEnd(piece) {
    const pieceToReplace = this.pieces.find(
      (item) =>
        item !== piece &&
        // piece.center to the right of the left side
        piece.sprite.x >= item.left &&
        // piece.center to the left of the right side
        piece.sprite.x <= item.right &&
        // piece.center below the top side
        piece.sprite.y <= item.bottom &&
        // piece.center above the bottom side
        piece.sprite.y >= item.top
    );

    if (pieceToReplace) {
      const replaceField = pieceToReplace.field;
      pieceToReplace.setField(piece.field);
      piece.setField(replaceField);
    } else {
      piece.reset();
    }
  }
}
