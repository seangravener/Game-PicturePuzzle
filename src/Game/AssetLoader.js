import { Assets } from "./config/config.assets";
import { Globals } from "./config/config.globals";

export class AssetLoader {
  constructor(loader) {
    this.loader = loader;
    this.assets = Assets.fractal3;
  }

  preload() {
    return new Promise((resolve) => {
      for (let key in this.assets) {
        this.loader.add(key, this.assets[key]);
      }

      this.loader.load((loader, assets) => {
        Globals.assets = assets;
        console.log(Globals);
        resolve();
      });
    });
  }
}
