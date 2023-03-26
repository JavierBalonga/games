import Stage from "..";
import {
  CircleCollider,
  CircleShape,
  GameContext,
  GameElement,
} from "../../../abstract/game-engine";
import ParticleEmitter from "../ParticleEmitter";

const CIRCLE_RADIUS = 16;
const ORBIT_RADIUS = 128;
const TARGET_COLOR = "#f2d402";
const NORMAL_COLOR = "#ffffff";

export interface OuterBallOptions {
  stage: Stage;
  id: number;
}

export default class OuterBall extends GameElement {
  readonly stage: Stage;
  readonly shape: CircleShape;
  readonly collider: CircleCollider;
  readonly particleEmitter: ParticleEmitter;
  id!: number;
  degree!: number;
  radiusSpeed!: number;

  constructor({ stage, id }: OuterBallOptions) {
    super();
    this.stage = stage;
    this.shape = new CircleShape({
      color: NORMAL_COLOR,
      radius: CIRCLE_RADIUS,
    });
    this.collider = new CircleCollider({ radius: CIRCLE_RADIUS });
    this.particleEmitter = new ParticleEmitter();
    this.id = id;
  }

  setup(): void {
    this.degree = this.id * (Math.PI / 3);
    this.radiusSpeed = 0;
  }

  update(context: GameContext): void {
    if (this.stage.state.status === "gameover") return;
    const levelFactor = Math.floor(
      Math.log(this.stage.state.score || 1) / Math.log(2)
    );
    const spin = (Math.PI * context.deltaTime) / 8000;
    const oscillation = Math.sin((Math.PI * context.time) / 5000);
    this.degree += levelFactor * spin * oscillation;
    const gameCenterX = context.width / 2;
    const gameCenterY = context.height / 2;
    const newCenterX = gameCenterX + Math.cos(this.degree) * ORBIT_RADIUS;
    const newCenterY = gameCenterY + Math.sin(this.degree) * ORBIT_RADIUS;
    this.shape.centerX = newCenterX;
    this.shape.centerY = newCenterY;
    this.collider.centerX = newCenterX;
    this.collider.centerY = newCenterY;
    this.shape.color = this.isTarget ? TARGET_COLOR : NORMAL_COLOR;
    this.shape.radius += this.radiusSpeed;
    if (this.shape.radius <= 0) {
      this.radiusSpeed = 2;
    }
    if (this.shape.radius > CIRCLE_RADIUS) {
      this.shape.radius = CIRCLE_RADIUS;
      this.radiusSpeed = 0;
    }
  }

  get isTarget(): boolean {
    return this.id === this.stage.state.target;
  }

  hited() {
    this.radiusSpeed = -2;
    this.particleEmitter.emit(
      Array.from({ length: 64 }).map(() => {
        const speed = Math.random() * 4 + 1;
        const direction =
          this.degree + (Math.random() * Math.PI) / 2 - Math.PI / 4;
        return {
          x: this.shape.centerX,
          y: this.shape.centerY,
          radius: 1.5,
          color: TARGET_COLOR,
          update: (particle) => {
            particle.x += Math.cos(direction) * speed;
            particle.y += Math.sin(direction) * speed;
          },
        };
      })
    );
  }
}
