import { getBreakpointKey, pathPresets } from "./config";

export function computePath(sceneW: number, sceneH: number) {
  if (!sceneW || !sceneH) return { x1: 0, y1: 0, x2: 0, y2: 0, pathLen: 0 };

  const bp = getBreakpointKey(sceneW);
  const cfg = pathPresets[bp];

  const start = { x: sceneW * cfg.start.xPct, y: sceneH * cfg.start.yPct };
  const end = { x: sceneW * cfg.end.xPct, y: sceneH * cfg.end.yPct };

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy);

  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y, pathLen: len };
}
