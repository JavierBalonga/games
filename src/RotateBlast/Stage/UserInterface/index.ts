import Stage from "..";
import { GameElement } from "../../../abstract/game-engine";
import ScoreNumber from "./ScoreNumber";

export interface UserInterfaceOptions {
  stage: Stage;
}

export default class UserInterface extends GameElement {
  stage: Stage;
  scoreNumber: ScoreNumber;
  constructor({ stage }: UserInterfaceOptions) {
    super();
    this.stage = stage;
    this.scoreNumber = new ScoreNumber({ stage });
  }
}
