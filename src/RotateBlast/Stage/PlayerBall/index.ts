import Stage from "..";
import {
  CircleCollider,
  CircleShape,
  GameContext,
  GameElement,
} from "../../../abstract/game-engine";

const CIRCLE_RADIUS = 8;
const ORBIT_RADIUS = 48;
const INITIAL_DEGREE_SPEED = 0.1;
const SHOOT_RADIUS_SPEED = 0.5;
const RETURN_RADIUS_SPEED = -1;

export interface PlayerBallOptions {
  stage: Stage;
}

export default class PlayerBall extends GameElement {
  stage: Stage;
  shape: CircleShape;
  collider: CircleCollider;
  degree!: number;
  orbitRadius!: number;
  degreeSpeed!: number;
  radiusSpeed!: number;
  state!: "ready" | "shooted" | "returning";
  direction!: 1 | -1;
  constructor({ stage }: PlayerBallOptions) {
    super();
    this.stage = stage;
    this.shape = new CircleShape({ color: "#fff", radius: CIRCLE_RADIUS });
    this.collider = new CircleCollider({ radius: CIRCLE_RADIUS });
  }

  setup(): void {
    this.state = "ready";
    this.degree = -90;
    this.orbitRadius = ORBIT_RADIUS;
    this.degreeSpeed = INITIAL_DEGREE_SPEED;
    this.radiusSpeed = 0;
    this.direction = 1;
  }

  shoot(): void {
    if (this.state !== "ready") return;
    this.state = "shooted";
    this.radiusSpeed = SHOOT_RADIUS_SPEED;
    this.degreeSpeed = 0;
  }

  return() {
    this.state = "returning";
    this.radiusSpeed = RETURN_RADIUS_SPEED;
    this.direction = this.direction === 1 ? -1 : 1;
  }

  update(context: GameContext) {
    if (this.stage.state.status === "gameover") return;
    this.orbitRadius += context.deltaTime * this.radiusSpeed;
    this.degree =
      this.degree + this.direction * context.deltaTime * this.degreeSpeed;
    while (this.degree < 0) {
      this.degree += 360;
    }
    while (this.degree > 360) {
      this.degree -= 360;
    }

    if (this.state === "returning" && this.orbitRadius <= ORBIT_RADIUS) {
      this.state = "ready";
      this.orbitRadius = ORBIT_RADIUS;
      this.radiusSpeed = 0;
      this.degreeSpeed = INITIAL_DEGREE_SPEED;
    }

    const degreeInRadians = this.degree * (Math.PI / 180);
    const gameCenterX = context.width / 2;
    const gameCenterY = context.height / 2;
    const newCenterX =
      gameCenterX + Math.cos(degreeInRadians) * this.orbitRadius;
    const newCenterY =
      gameCenterY + Math.sin(degreeInRadians) * this.orbitRadius;
    this.collider.centerX = this.shape.centerX = newCenterX;
    this.collider.centerY = this.shape.centerY = newCenterY;
  }
}
