import { GameContext } from "../types";

/**
 * GameElement is the base class for all game elements.
 * It is responsible for propagating the setup and update methods to its sub elements.
 */
export default class GameElement {
  private propagateSetup(
    context: GameContext,
    pastElements: GameElement[] = []
  ) {
    if (pastElements.some((element) => element === this)) return;
    this.setup(context);
    pastElements.push(this);
    Object.values(this).forEach((property) => {
      if (property instanceof GameElement) {
        property.propagateSetup(context, pastElements);
      }
      if (Array.isArray(property)) {
        property.forEach((propertyElement) => {
          if (propertyElement instanceof GameElement) {
            propertyElement.propagateSetup(context, pastElements);
          }
        });
      }
    });
  }

  private propagateUpdate(
    context: GameContext,
    pastElements: GameElement[] = []
  ) {
    if (pastElements.some((element) => element === this)) return;
    this.update(context);
    pastElements.push(this);
    Object.values(this).forEach((property) => {
      if (property instanceof GameElement) {
        property.propagateUpdate(context, pastElements);
      }
      if (Array.isArray(property)) {
        property.forEach((propertyElement) => {
          if (propertyElement instanceof GameElement) {
            propertyElement.propagateUpdate(context, pastElements);
          }
        });
      }
    });
  }

  setup(context: GameContext) {}
  update(context: GameContext) {}
}
