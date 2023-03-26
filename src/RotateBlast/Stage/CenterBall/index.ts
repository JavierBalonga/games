import {
  CircleShape,
  GameContext,
  GameElement,
} from "../../../abstract/game-engine";

export default class CenterBall extends GameElement {
  readonly shape: CircleShape;
  constructor() {
    super();
    this.shape = new CircleShape({ color: "#fff", radius: 32 });
  }

  update(context: GameContext): void {
    this.shape.centerX = context.width / 2;
    this.shape.centerY = context.height / 2;
  }
}
