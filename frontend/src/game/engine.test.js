import { getNextState } from './engine.js';

test('moves the snake in the selected direction', () => {
  const state = {
    snake: [{ x: 2, y: 2 }, { x: 1, y: 2 }],
    food: { x: 10, y: 10 },
    foodColor: '#ef4444',
    score: 0,
    status: 'playing',
  };

  const nextState = getNextState(state, { x: 1, y: 0 });

  expect(nextState.snake[0]).toEqual({ x: 3, y: 2 });
  expect(nextState.score).toBe(0);
});

test('increments score and changes food color when food is eaten', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
  const state = {
    snake: [{ x: 2, y: 2 }, { x: 1, y: 2 }],
    food: { x: 3, y: 2 },
    foodColor: '#ef4444',
    score: 0,
    status: 'playing',
  };

  const nextState = getNextState(state, { x: 1, y: 0 });

  expect(nextState.score).toBe(1);
  expect(nextState.foodColor).not.toBe('#ef4444');
  Math.random.mockRestore();
});
