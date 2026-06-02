import { useCallback, useEffect, useState } from 'react';

import { createScore, fetchScores } from '../api/scores.js';

export function useScores() {
  const [scores, setScores] = useState([]);

  const loadScores = useCallback(async () => {
    try {
      setScores(await fetchScores());
    } catch {
      setScores([]);
    }
  }, []);

  const saveScore = useCallback(
    async (score) => {
      try {
        await createScore(score);
        await loadScores();
      } catch {
        // The game remains playable even when the API is unavailable.
      }
    },
    [loadScores],
  );

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  return { scores, saveScore };
}
