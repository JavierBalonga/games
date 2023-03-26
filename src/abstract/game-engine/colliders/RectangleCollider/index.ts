import { GameContext } from "../../types";
import CircleCollider from "../CircleCollider";
import Collider from "../Collider";
import isCollidingCircleRectangle from "../collisions/circle-rectangle";
import isCollidingRectangleRectangle from "../collisions/rectangle-rectangle";

/** The options for the RectangleCollider class. */
export interface CircleRectangleOptions {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  showDebug?: boolean;
}

/**
 * RectangleCollider is a class that represents a rectangle collider.
 * It is used to detect collisions between a rectangle collider and another collider.
 */
export default class RectangleCollider extends Collider {
  top: number;
  left: number;
  width: number;
  height: number;
  constructor({
    top = 0,
    left = 0,
    width = 0,
    height = 0,
    showDebug,
  }: CircleRectangleOptions = {}) {
    super({ showDebug });
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  /** Detects if the rectangle collider is colliding with another collider. */
  isCollidingWith(other: Collider): boolean {
    if (other instanceof RectangleCollider) {
      return isCollidingRectangleRectangle(this, other);
    }
    if (other instanceof CircleCollider) {
      return isCollidingCircleRectangle(other, this);
    }
    return false;
  }

  update({ renderer }: GameContext): void {
    if (!this.showDebug) return;
    renderer.beginPath();
    renderer.rect(this.left, this.top, this.width, this.height);
    renderer.strokeStyle = "red";
    renderer.stroke();

    const centerX = this.left + this.width / 2;
    const centerY = this.top + this.height / 2;

    renderer.beginPath();
    renderer.moveTo(centerX, this.top);
    renderer.lineTo(centerX, this.top + this.height);
    renderer.strokeStyle = "red";
    renderer.stroke();

    renderer.beginPath();
    renderer.moveTo(this.left, centerY);
    renderer.lineTo(this.left + this.width, centerY);
    renderer.strokeStyle = "red";
    renderer.stroke();
  }
}
