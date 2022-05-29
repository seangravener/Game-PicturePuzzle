import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PuzzlePiece extends PIXI.utils.EventEmitter {
  get left() {
    return this.sprite.x - this.sprite.width / 2;
  }
  get right() {
    return this.sprite.x + this.sprite.width / 2;
  }
  get top() {
    return this.sprite.y - this.sprite.height / 2;
  }
  get bottom() {
    return this.sprite.y + this.sprite.height / 2;
  }

  constructor(id, field) {
    super();

    this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
    this.field = field;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);
    this.setInteractive();
    this.reset();
  }

  setInteractive() {
    this.sprite.interactive = true;
    this.sprite.on("pointerdown", this.onTouchStart, this);
    this.sprite.on("pointermove", this.onTouchMove, this);
    this.sprite.on("pointerup", this.onTouchEnd, this);
  }

  onTouchStart(e) {
    // 1. Remember the posisiton of the cursor
    this.touchPosition = { x: e.data.global.x, y: e.data.global.y };

    // 2. Set the dragging state for this sprite
    this.dragging = true;
    this.sprite.zIndex = 1;
  }

  onTouchEnd(e) {
    this.dragging = false;
    this.sprite.zIndex = 0;
    this.emit("drag:end");
  }

  onTouchMove(e) {
    if (!this.dragging) {
      return;
    }

    // 1. get the coordinates of cursor
    const currentPosition = { x: e.data.global.x, y: e.data.global.y };

    // 2. calcuate the offset (subtract touch from current)
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;

    // 3. apply the resulting offset
    this.sprite.x = this.field.x + offsetX;
    this.sprite.y = this.field.y + offsetY;
  }

  setField(field) {
    this.field = field;
    this.reset();
  }

  reset() {
    this.sprite.x = this.field.x;
    this.sprite.y = this.field.y;
  }
}
