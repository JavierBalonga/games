import GameElement from "../GameElement";
import { GameContext } from "../types";

/** The options for the Game class. */
interface GameOptions {
  /** The canvas element to render the game on. */
  canvas: HTMLCanvasElement;
}

/**
 * Game is the main class of the game engine.
 * It is responsible for managing the game loop,
 * the game elements and the game time.
 */
export default class Game extends GameElement {
  private canvas: HTMLCanvasElement;
  private renderer: CanvasRenderingContext2D;
  private animationId?: number;
  private startTime: number;
  private lastTime: number;
  private width: number;
  private height: number;

  constructor({ canvas }: GameOptions) {
    super();
    // renderer setup
    this.canvas = canvas;
    const renderer = canvas.getContext("2d");
    if (!renderer) {
      throw new Error("No canvas context found");
    }
    this.renderer = renderer;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // time setup
    this.startTime = this.lastTime = Date.now().valueOf();
  }

  /** Starts the game loop. */
  start(): void {
    this.startTime = Date.now().valueOf();
    const deltaTime = this.startTime - this.lastTime;
    this.lastTime = this.startTime;
    // @ts-expect-error propagateSetup exception
    this.propagateSetup({
      renderer: this.renderer,
      time: this.lastTime - this.startTime,
      deltaTime: deltaTime,
      width: this.width,
      height: this.height,
    });
    this.loop();
  }

  /** Stops the game loop. */
  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private loop(): void {
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;
    this.renderer!.clearRect(0, 0, this.width, this.height);
    const actualTime = Date.now().valueOf();
    const deltaTime = actualTime - this.lastTime;
    this.lastTime = actualTime;
    // @ts-expect-error propagateUpdate exception
    this.propagateUpdate({
      renderer: this.renderer,
      time: this.lastTime - this.startTime,
      deltaTime: deltaTime,
      width: this.width,
      height: this.height,
    });
    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }

  update(context: GameContext) {}
}
