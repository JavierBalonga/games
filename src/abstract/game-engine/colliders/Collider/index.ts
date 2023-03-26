import GameElement from "../../GameElement";
import { GameContext } from "../../types";

/** The options for the Collider class. */
export interface ColliderOptions {
  showDebug?: boolean;
}

/**
 * Collider is an abstract class that represents a collider.
 * It is used to detect collisions between two colliders.
 */

// @ts-expect-error - extends GameElement and overrides a private method
// but it's ok to ignore this error.
export default class Collider extends GameElement {
  private readonly observers: { target: Collider; cb: Function }[] = [];
  showDebug: boolean;

  constructor({ showDebug = false }: ColliderOptions = {}) {
    super();
    this.showDebug = showDebug;
  }

  /**
   * Observe a collider, and call the callback function when the collider is
   * colliding with the target collider.
   */
  obsserve(target: Collider, cb: Function) {
    this.observers.push({ target, cb });
  }

  removeOvserver(target: Collider) {
    const observerIndex = this.observers.findIndex((observer) => {
      return observer.target === target;
    });
    this.observers.splice(observerIndex, 1);
  }

  private propagateUpdate(context: GameContext) {
    Object.values(this.observers).forEach((observer) => {
      if (this.propagateIsColliding(observer.target)) observer.cb();
    });
    // @ts-expect-error - This is a private method, so it's ok to call it.
    super.propagateUpdate(context);
  }

  private propagateIsColliding(other: Collider): boolean {
    if (this.isCollidingWith(other)) {
      return true;
    }
    return Object.values(other).some((property) => {
      if (property instanceof Collider) {
        return this.isCollidingWith(property);
      }
      return false;
    });
  }

  isCollidingWith(other: Collider): boolean {
    throw new Error("Not implemented.");
  }
}
