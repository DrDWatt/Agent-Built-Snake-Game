import { RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from './Button.jsx';
import { GameBoard } from './GameBoard.jsx';
import { BOARD_SIZE, INITIAL_DIRECTION, INITIAL_SNAKE, TICK_MS } from '../game/constants.js';
import { buildCells, getNextState } from '../game/engine.js';
import { directionFromKey, isOpposite } from '../game/input.js';

export function SnakeGame({ onGameOver }) {
  const [state, setState] = useState(() => getInitialState());
  const directionRef = useRef(INITIAL_DIRECTION);

  const cells = useMemo(() => buildCells(state.snake, state.food, BOARD_SIZE), [state.food, state.snake]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const nextDirection = directionFromKey(event.key);
      if (!nextDirection || isOpposite(directionRef.current, nextDirection)) {
        return;
      }
      event.preventDefault();
      directionRef.current = nextDirection;
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (state.status === 'lost') {
      onGameOver({ player_name: 'Player', score: state.score });
      return undefined;
    }

    const timer = window.setInterval(() => {
      setState((current) => getNextState(current, directionRef.current));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [onGameOver, state.score, state.status]);

  function resetGame() {
    directionRef.current = INITIAL_DIRECTION;
    setState(getInitialState());
  }

  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 shadow-2xl shadow-black/40">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Snake</h1>
          <p className="text-sm text-zinc-400">Use the arrow keys to move.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-black px-3 py-2 font-mono text-sm text-emerald-300">Score {state.score}</span>
          <Button onClick={resetGame}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restart
          </Button>
        </div>
      </div>
      <GameBoard cells={cells} foodColor={state.foodColor} />
      {state.status === 'lost' && (
        <div className="mt-4 rounded-md border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-100">
          Game over. Press Restart to play again.
        </div>
      )}
    </section>
  );
}

function getInitialState() {
  return {
    snake: INITIAL_SNAKE,
    food: { x: 12, y: 10 },
    foodColor: '#ef4444',
    score: 0,
    status: 'playing',
  };
}
