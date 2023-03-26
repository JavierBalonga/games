import { GameContext } from "../../types";
import Collider from "../Collider";
import isCollidingCircleCircle from "../collisions/circle-circle";
import isCollidingCircleRectangle from "../collisions/circle-rectangle";
import RectangleCollider from "../RectangleCollider";

/** The options for the CircleCollider class. */
export interface CircleColliderOptions {
  radius: number;
  centerX?: number;
  centerY?: number;
  showDebug?: boolean;
}

/**
 * CircleCollider is a class that represents a circle collider.
 * It is used to detect collisions between a circle collider and another collider.
 */
export default class CircleCollider extends Collider {
  radius: number;
  centerX: number;
  centerY: number;
  constructor({
    radius,
    centerX = 0,
    centerY = 0,
    showDebug,
  }: CircleColliderOptions) {
    super({ showDebug });
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  /** Detects if the circle collider is colliding with another collider. */
  isCollidingWith(other: Collider): boolean {
    if (other instanceof CircleCollider) {
      return isCollidingCircleCircle(this, other);
    }
    if (other instanceof RectangleCollider) {
      return isCollidingCircleRectangle(this, other);
    }
    return false;
  }

  update({ renderer }: GameContext): void {
    if (!this.showDebug) return;

    renderer.beginPath();
    renderer.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    renderer.strokeStyle = "red";
    renderer.stroke();

    renderer.beginPath();
    renderer.moveTo(this.centerX, this.centerY - this.radius);
    renderer.lineTo(this.centerX, this.centerY + this.radius);
    renderer.strokeStyle = "red";
    renderer.stroke();

    renderer.beginPath();
    renderer.moveTo(this.centerX - this.radius, this.centerY);
    renderer.lineTo(this.centerX + this.radius, this.centerY);
    renderer.strokeStyle = "red";
    renderer.stroke();
  }
}
