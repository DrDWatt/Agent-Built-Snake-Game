const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function fetchScores() {
  const response = await fetch(`${API_BASE_URL}/api/scores`);
  if (!response.ok) {
    throw new Error('Unable to load scores');
  }
  return response.json();
}

export async function createScore(score) {
  const response = await fetch(`${API_BASE_URL}/api/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(score),
  });
  if (!response.ok) {
    throw new Error('Unable to save score');
  }
  return response.json();
}
