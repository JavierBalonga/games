import { GameContext } from "../../types";
import Collider from "../Collider";
import RectangleCollider from "../RectangleCollider";

/** The options for the ViewportCollider class. */
export interface ViewportColliderOptions {
  showDebug?: boolean;
}

/**
 * ViewportCollider is a class that represents a viewport collider.
 * It is used to detect collisions between a viewports borders and another collider.
 */
export default class ViewportCollider extends Collider {
  top: RectangleCollider;
  bottom: RectangleCollider;
  left: RectangleCollider;
  right: RectangleCollider;
  constructor({ showDebug }: ViewportColliderOptions = {}) {
    super({ showDebug });
    this.top = new RectangleCollider({ showDebug });
    this.bottom = new RectangleCollider({ showDebug });
    this.left = new RectangleCollider({ showDebug });
    this.right = new RectangleCollider({ showDebug });
  }

  /** Updates the viewport border colliders positions. */
  update(context: GameContext): void {
    this.top.top = -context.height;
    this.top.left = -context.width;
    this.top.width = context.width * 3;
    this.top.height = context.height;

    this.bottom.top = context.height;
    this.bottom.left = -context.width;
    this.bottom.width = context.width * 3;
    this.bottom.height = context.height;

    this.left.top = 0;
    this.left.left = -context.width;
    this.left.width = context.width;
    this.left.height = context.height;

    this.right.top = 0;
    this.right.left = context.width;
    this.right.width = context.width;
    this.right.height = context.height;

    this.top.showDebug = this.showDebug;
    this.bottom.showDebug = this.showDebug;
    this.left.showDebug = this.showDebug;
    this.right.showDebug = this.showDebug;

    super.update(context);
  }

  /** Detects if the viewport borders is colliding with another collider. */
  isCollidingWith(other: Collider): boolean {
    return (
      this.top.isCollidingWith(other) ||
      this.bottom.isCollidingWith(other) ||
      this.left.isCollidingWith(other) ||
      this.right.isCollidingWith(other)
    );
  }
}
