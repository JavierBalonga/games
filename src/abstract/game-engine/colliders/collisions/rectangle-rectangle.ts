import RectangleCollider from "../RectangleCollider";

export default function isCollidingRectangleRectangle(
  rectangle1: RectangleCollider,
  rectangle2: RectangleCollider
): boolean {
  return (
    rectangle1.left < rectangle2.left + rectangle2.width &&
    rectangle1.left + rectangle1.width > rectangle2.left &&
    rectangle1.top < rectangle2.top + rectangle2.height &&
    rectangle1.top + rectangle1.height > rectangle2.top
  );
}
