import { utils, Sprite } from "pixi.js";
import { Globals } from "./config/config.globals";

export class PuzzlePiece extends utils.EventEmitter {
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
    this.field = field;

    this.sprite = new Sprite(Globals.assets[id].texture);
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
    this.touchPosition = { x: e.data.global.x, y: e.data.global.y };
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

    this.setCoords(e);
  }

  setCoords(e) {
    const currentPosition = { x: e.data.global.x, y: e.data.global.y };
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;

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
