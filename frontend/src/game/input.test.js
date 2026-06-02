import { directionFromKey, isOpposite } from './input.js';

test('maps arrow keys to directions', () => {
  expect(directionFromKey('ArrowUp')).toEqual({ x: 0, y: -1 });
  expect(directionFromKey('ArrowRight')).toEqual({ x: 1, y: 0 });
});

test('detects opposite directions', () => {
  expect(isOpposite({ x: 1, y: 0 }, { x: -1, y: 0 })).toBe(true);
  expect(isOpposite({ x: 1, y: 0 }, { x: 0, y: -1 })).toBe(false);
});
