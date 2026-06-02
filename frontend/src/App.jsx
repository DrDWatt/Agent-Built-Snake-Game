import { Trophy } from 'lucide-react';

import { SnakeGame } from './components/SnakeGame.jsx';
import { Scoreboard } from './components/Scoreboard.jsx';
import { useScores } from './hooks/useScores.js';

export default function App() {
  const { scores, saveScore } = useScores();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <SnakeGame onGameOver={saveScore} />
        <aside className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/30">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-300" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Top Scores</h2>
          </div>
          <Scoreboard scores={scores} />
        </aside>
      </section>
    </main>
  );
}
