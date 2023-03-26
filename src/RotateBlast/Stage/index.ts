import {
  GameContext,
  GameElement,
  ViewportCollider,
} from "../../abstract/game-engine";
import CenterBall from "./CenterBall";
import OuterBall from "./OuterBall";
import PlayerBall from "./PlayerBall";
import UserInterface from "./UserInterface";

export interface StageState {
  status: "playing" | "gameover";
  score: number;
  target: number;
}

export default class Stage extends GameElement {
  state!: StageState;
  viewportCollider: ViewportCollider;
  userInterface: UserInterface;
  centerBall: CenterBall;
  outerBalls: OuterBall[];
  playerBall: PlayerBall;

  constructor() {
    super();
    this.viewportCollider = new ViewportCollider();
    this.userInterface = new UserInterface({ stage: this });
    this.centerBall = new CenterBall();
    this.playerBall = new PlayerBall({ stage: this });
    this.outerBalls = Array.from({ length: 6 }).map((_, index) => {
      return new OuterBall({ stage: this, id: index });
    });

    this.playerBall.collider.obsserve(
      this.viewportCollider,
      this.handleMiss.bind(this)
    );
    this.outerBalls.forEach((outerBall) => {
      this.playerBall.collider.obsserve(
        outerBall.collider,
        this.handleOuterBallHit.bind(this, outerBall)
      );
    });

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("click", this.handleShoot.bind(this));
    document.addEventListener("touchstart", this.handleShoot.bind(this));
  }

  setup(): void {
    this.state = {
      status: "playing",
      score: 0,
      target: Math.floor(Math.random() * 6),
    };
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === "Space") this.handleShoot();
  }

  shootTimeout: number | null = null;
  handleShoot(): void {
    if (this.shootTimeout) clearTimeout(this.shootTimeout);
    this.shootTimeout = setTimeout(() => {
      if (this.state.status === "gameover") {
        // @ts-ignore
        this.propagateSetup();
      } else {
        this.playerBall.shoot();
      }
      this.shootTimeout = null;
    }, 100);
  }

  handleMiss(): void {
    this.state.status = "gameover";
  }

  handleOuterBallHit(outerBall: OuterBall): void {
    if (this.playerBall.state !== "shooted") return;
    if (!outerBall.isTarget) {
      this.handleMiss();
      return;
    }
    this.playerBall.return();
    this.state.score++;
    this.outerBalls
      .find((outerBall) => outerBall.id === this.state.target)
      ?.hited();
    let newTarget: number;
    do {
      newTarget = Math.floor(Math.random() * 6);
    } while (newTarget === this.state.target);
    this.state.target = newTarget;
  }
}
