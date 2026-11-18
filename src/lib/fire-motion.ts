type Point = readonly [number, number];

type PathCommand = {
  command: string;
  points: Point[];
};

export type FlamePath = PathCommand[];

// The artwork uses absolute commands. Normalize its closing H/V commands too,
// so every animated frame retains one continuous, closed contour per colour.
export function parseFlamePath(path: string): FlamePath {
  let cursor: Point = [0, 0];
  return Array.from(path.matchAll(/([MLCHVZ])([^MLCHVZ]*)/g), ([, command, data]) => {
    const values = data.trim() ? data.trim().split(/[\s,]+/).map(Number) : [];
    const points: Point[] = [];

    if (command === 'H' || command === 'V') {
      cursor = command === 'H' ? [values[0], cursor[1]] : [cursor[0], values[0]];
      return { command: 'L', points: [cursor] };
    }

    for (let index = 0; index < values.length; index += 2) {
      cursor = [values[index], values[index + 1]];
      points.push(cursor);
    }
    return { command, points };
  });
}

export function moveFlamePoint(x: number, y: number, width: number, time: number): Point {
  // Keep the hearth fixed. Higher points have more freedom to stretch and curl.
  const height = Math.max(0, Math.min(1, (180 - y) / 180));
  if (height === 0) return [x, y];

  const tip = height ** 1.3;
  const edge = Math.min(1, Math.max(0, x / 36), Math.max(0, (width - x) / 36));

  // Different wavelengths/speeds avoid a single repeating, synchronized sway.
  // The height phase carries small bends upwards through each flame.
  const curl = Math.sin(x * 0.027 - time * 3.4 + height * 5.5) * 0.65
    + Math.sin(x * 0.061 + time * 1.7 - height * 4) * 0.35;
  const surge = Math.sin(x * 0.023 - time * 2.3) * 0.55
    + Math.sin(x * 0.053 + time * 3.7 + 1.6) * 0.3
    + Math.sin(x * 0.011 - time * 1.31) * 0.15;

  return [
    x + curl * (6 + 12 * height) * tip * edge,
    y - surge * (10 + 12 * height) * height ** 0.8,
  ];
}

export function animateFlamePath(path: FlamePath, width: number, time: number): string {
  return path.map(({ command, points }) => command + points.map(([x, y]) => {
    const [nextX, nextY] = moveFlamePoint(x, y, width, time);
    return `${nextX.toFixed(2)} ${nextY.toFixed(2)}`;
  }).join(' ')).join(' ');
}
