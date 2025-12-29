// math.ts
export function computeCenterlineFromStrip(
  stripCenterX: number,
  stripCenterY: number,
  stripWidthPx: number,
  stripAngleDeg: number
) {
  const theta = (stripAngleDeg * Math.PI) / 180;
  const dirX = Math.cos(theta);
  const dirY = Math.sin(theta);

  const half = stripWidthPx / 2;

  // +dir points to the right for small angles (cos>0), so:
  const leftEnd = { x: stripCenterX - dirX * half, y: stripCenterY - dirY * half };
  const rightEnd = { x: stripCenterX + dirX * half, y: stripCenterY + dirY * half };

  return { leftEnd, rightEnd, pathLen: stripWidthPx };
}
