export function Scoreboard({ scores }) {
  if (!scores.length) {
    return <p className="text-sm text-zinc-400">No saved scores yet.</p>;
  }

  return (
    <ol className="space-y-3">
      {scores.map((score, index) => (
        <li key={score.id} className="flex items-center justify-between rounded-md bg-zinc-950 px-3 py-2">
          <span className="text-sm text-zinc-300">
            {index + 1}. {score.player_name}
          </span>
          <span className="font-mono text-sm text-emerald-300">{score.score}</span>
        </li>
      ))}
    </ol>
  );
}
