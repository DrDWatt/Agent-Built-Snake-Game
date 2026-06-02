import { BOARD_SIZE } from './constants.js';
import { randomFoodColor } from './colors.js';

export function buildCells(snake, food, boardSize = BOARD_SIZE) {
  const cells = Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => 'empty'));
  snake.forEach((segment) => {
    cells[segment.y][segment.x] = 'snake';
  });
  cells[food.y][food.x] = 'food';
  return cells;
}

export function getNextState(state, direction) {
  if (state.status === 'lost') {
    return state;
  }

  const head = state.snake[0];
  const nextHead = { x: head.x + direction.x, y: head.y + direction.y };
  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const nextSnake = ateFood ? [nextHead, ...state.snake] : [nextHead, ...state.snake.slice(0, -1)];

  if (isCollision(nextHead, state.snake, ateFood)) {
    return { ...state, status: 'lost' };
  }

  return {
    ...state,
    snake: nextSnake,
    food: ateFood ? randomFood(nextSnake) : state.food,
    foodColor: ateFood ? randomFoodColor(state.foodColor) : state.foodColor,
    score: ateFood ? state.score + 1 : state.score,
  };
}

function isCollision(head, snake, grew) {
  const body = grew ? snake : snake.slice(0, -1);
  const hitWall = head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE;
  const hitBody = body.some((segment) => segment.x === head.x && segment.y === head.y);
  return hitWall || hitBody;
}

function randomFood(snake) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const openCells = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!occupied.has(`${x},${y}`)) {
        openCells.push({ x, y });
      }
    }
  }

  return openCells[Math.floor(Math.random() * openCells.length)];
}
