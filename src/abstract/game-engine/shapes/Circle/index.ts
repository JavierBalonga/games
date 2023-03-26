import GameElement from "../../GameElement";
import { GameContext } from "../../types";

/** The options for the CircleShape class. */
export interface CircleShapeOptions {
  /** The initial radius of the circle. */
  radius?: number;
  /** The initial color of the circle. */
  color?: string;
  /** The initial center x coordinate of the circle. */
  centerX?: number;
  /** The initial center y coordinate of the circle. */
  centerY?: number;
}

/**
 * CircleShape is a game element that represents a circle.
 */
export default class CircleShape extends GameElement {
  /** The radius of the circle. */
  radius: number;
  /** The color of the circle. */
  color: string;
  /** The center x coordinate of the circle. */
  centerX: number;
  /** The center y coordinate of the circle. */
  centerY: number;

  constructor({
    radius = 0,
    color = "#fff",
    centerX = 0,
    centerY = 0,
  }: CircleShapeOptions = {}) {
    super();
    this.radius = radius;
    this.color = color;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  update({ renderer }: GameContext): void {
    renderer.beginPath();
    renderer.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    renderer.fillStyle = this.color;
    renderer.fill();
  }
}
