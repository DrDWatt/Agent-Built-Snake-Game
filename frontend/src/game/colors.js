const FOOD_COLORS = ['#ef4444', '#f97316', '#facc15', '#38bdf8', '#a78bfa', '#f472b6'];

export function randomFoodColor(previousColor) {
  const colors = FOOD_COLORS.filter((color) => color !== previousColor);
  return colors[Math.floor(Math.random() * colors.length)];
}
