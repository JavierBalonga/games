import CircleCollider from "../CircleCollider";
import RectangleCollider from "../RectangleCollider";

export default function isCollidingCircleRectangle(
  circle: CircleCollider,
  rectangle: RectangleCollider
): boolean {
  const circleDistanceX = Math.abs(
    circle.centerX - rectangle.left - rectangle.width / 2
  );
  const circleDistanceY = Math.abs(
    circle.centerY - rectangle.top - rectangle.height / 2
  );

  if (circleDistanceX > rectangle.width / 2 + circle.radius) return false;
  if (circleDistanceY > rectangle.height / 2 + circle.radius) return false;

  if (circleDistanceX <= rectangle.width / 2) return true;
  if (circleDistanceY <= rectangle.height / 2) return true;

  const cornerDistanceSq =
    (circleDistanceX - rectangle.width / 2) ** 2 +
    (circleDistanceY - rectangle.height / 2) ** 2;
  return cornerDistanceSq <= circle.radius ** 2;
}
