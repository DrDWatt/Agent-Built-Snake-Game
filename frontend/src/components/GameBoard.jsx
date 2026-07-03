export function GameBoard({ cells, foodColor }) {
  return (
    <div
      className="grid aspect-square w-full rounded-md border border-zinc-700 bg-black p-2 shadow-inner shadow-emerald-950"
      style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
      role="grid"
      aria-label="Snake game board"
    >
      {cells.flatMap((row, y) =>
        row.map((cell, x) => (
          <div key={`${x}-${y}`} className="aspect-square p-[1px]" role="gridcell">
            <div
              className="h-full w-full rounded-[2px]"
              style={{ backgroundColor: cell === 'food' ? foodColor : cell === 'snake' ? '#2563eb' : 'transparent' }}
            />
          </div>
        )),
      )}
    </div>
  );
}
