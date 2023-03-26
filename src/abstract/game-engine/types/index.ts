/** The game context. */
export interface GameContext {
  /** The canvas rendering context. */
  renderer: CanvasRenderingContext2D;
  /** The time since the game started in milliseconds. */
  time: number;
  /** The time since the last frame in milliseconds. */
  deltaTime: number;
  /** The game width. */
  width: number;
  /** The game height. */
  height: number;
}
