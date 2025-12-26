export type BreakpointKey = "xl" | "lg" | "md" | "sm" | "xs";

export function getBreakpointKey(sceneW: number): BreakpointKey {
  return sceneW >= 1440 ? "xl" : sceneW >= 1024 ? "lg" : sceneW >= 768 ? "md" : sceneW >= 425 ? "sm" : "xs";
}

// Coin sizing by breakpoint
export function getCoinSize(sceneW: number) {
  if (sceneW >= 1440) return 170;
  if (sceneW >= 1024) return 125;
  if (sceneW >= 768) return 100;
  if (sceneW >= 425) return 90;
  return 75;
}

// Strip height by breakpoint (CSS value)
export function getStripHeight(sceneW: number) {
  if (sceneW >= 1440) return "14rem";
  if (sceneW >= 1024) return "7.5rem";
  if (sceneW >= 768) return "6.25rem";
  if (sceneW >= 425) return "5.25rem";
  return "4.5rem";
}

// Path presets (percent-based)
export const pathPresets: Record<
  BreakpointKey,
  { start: { xPct: number; yPct: number }; end: { xPct: number; yPct: number } }
> = {
  xl: { start: { xPct: 0.06, yPct: 0.25 }, end: { xPct: 0.94, yPct: 0.89 } },
  lg: { start: { xPct: 0.03, yPct: 0.22 }, end: { xPct: 0.94, yPct: 0.87 } },
  md: { start: { xPct: 0.03, yPct: 0.24 }, end: { xPct: 0.97, yPct: 0.93 } },
  sm: { start: { xPct: 0.04, yPct: 0.27 }, end: { xPct: 0.96, yPct: 0.93 } },
  xs: { start: { xPct: 0.07, yPct: 0.38 }, end: { xPct: 0.93, yPct: 0.98 } },
};
