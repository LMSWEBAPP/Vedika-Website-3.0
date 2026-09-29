export interface StreamAnchors {
  width: number;
  height: number;
  leftOrbX: number;
  midX: number;
  rightOrbX: number;
  centerY: number;
  orbRadius: number;
}

export function getStreamAnchors(width: number, height: number): StreamAnchors {
  // Constrain width to modern ultra-wide and standard desktop bounds
  const containerWidth = Math.min(Math.max(width - 64, 320), 1360);
  const sideMargin = (width - containerWidth) / 2;
  const leftOrbX = sideMargin + 50;
  const rightOrbX = width - sideMargin - 50;
  const midX = width / 2;
  // Vertically aligned with Vedika's chest (raised to 58.8% of viewport)
  const centerY = height * 0.588;
  const orbRadius = 32; // 64px button / 2

  return { width, height, leftOrbX, midX, rightOrbX, centerY, orbRadius };
}
