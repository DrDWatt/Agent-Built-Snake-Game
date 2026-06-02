const KEY_DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

export function directionFromKey(key) {
  return KEY_DIRECTIONS[key] || null;
}

export function isOpposite(currentDirection, nextDirection) {
  return currentDirection.x + nextDirection.x === 0 && currentDirection.y + nextDirection.y === 0;
}
