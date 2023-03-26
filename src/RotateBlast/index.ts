import { Game } from "../abstract/game-engine";
import Stage from "./Stage";

export default class RotateBlast extends Game {
  stage: Stage;
  constructor(canvas: HTMLCanvasElement) {
    super({ canvas });
    this.stage = new Stage();
  }
}
