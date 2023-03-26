import Stage from "../..";
import { GameContext, GameElement } from "../../../../abstract/game-engine";

export interface ScoreNumberOptions {
  stage: Stage;
}

export default class ScoreNumber extends GameElement {
  stage: Stage;
  constructor({ stage }: ScoreNumberOptions) {
    super();
    this.stage = stage;
  }

  update({ renderer, width, height }: GameContext): void {
    renderer.font = "32px Orbitron";
    renderer.textAlign = "center";
    renderer.fillStyle = "#fff";
    renderer.fillText(
      this.stage.state.score.toString(),
      width / 2,
      height / 2 - 180
    );
  }
}
