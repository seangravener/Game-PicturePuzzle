import { AssetsConfig } from "./LoaderConfig";
import { Globals } from "./Globals";

export class Loader {
  constructor(loader) {
    this.loader = loader;
    this.assets = AssetsConfig;
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
