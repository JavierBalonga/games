import CircleCollider from "../CircleCollider";

export default function isCollidingCircleCircle(
  circle1: CircleCollider,
  circle2: CircleCollider
): boolean {
  const dx = circle1.centerX - circle2.centerX;
  const dy = circle1.centerY - circle2.centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}
