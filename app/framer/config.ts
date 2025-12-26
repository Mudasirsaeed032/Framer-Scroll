export type BreakpointKey = "xl" | "lg" | "md" | "sm" | "xs";

export function getBreakpointKey(sceneW: number): BreakpointKey {
  return sceneW >= 1440 ? "xl" : sceneW >= 1024 ? "lg" : sceneW >= 768 ? "md" : sceneW >= 425 ? "sm" : "xs";
}

// Utility functions for smooth interpolation
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
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
  if (sceneW >= 1440) return "13rem";
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
  xl: { start: { xPct: 0.06, yPct: 0.28 }, end: { xPct: 0.94, yPct: 0.89 } },
  lg: { start: { xPct: 0.03, yPct: 0.22 }, end: { xPct: 0.94, yPct: 0.87 } },
  md: { start: { xPct: 0.03, yPct: 0.24 }, end: { xPct: 0.97, yPct: 0.93 } },
  sm: { start: { xPct: 0.04, yPct: 0.27 }, end: { xPct: 0.96, yPct: 0.93 } },
  xs: { start: { xPct: 0.07, yPct: 0.38 }, end: { xPct: 0.93, yPct: 0.98 } },
};

// Continuous interpolation between presets
export function getBlendedPreset(sceneW: number) {
  // Define ranges for interpolation
  const ranges = [
    { min: 0, max: 425, a: "xs" as const, b: "sm" as const },
    { min: 425, max: 768, a: "sm" as const, b: "md" as const },
    { min: 768, max: 1024, a: "md" as const, b: "lg" as const },
    { min: 1024, max: 1440, a: "lg" as const, b: "xl" as const },
  ];

  // Find the appropriate range or use the last one
  let activeRange = ranges[ranges.length - 1];
  for (const r of ranges) {
    if (sceneW >= r.min && sceneW <= r.max) {
      activeRange = r;
      break;
    }
  }

  // Calculate interpolation factor
  const t = clamp01((sceneW - activeRange.min) / (activeRange.max - activeRange.min));

  const A = pathPresets[activeRange.a];
  const B = pathPresets[activeRange.b];

  return {
    start: {
      xPct: lerp(A.start.xPct, B.start.xPct, t),
      yPct: lerp(A.start.yPct, B.start.yPct, t),
    },
    end: {
      xPct: lerp(A.end.xPct, B.end.xPct, t),
      yPct: lerp(A.end.yPct, B.end.yPct, t),
    },
  };
}
