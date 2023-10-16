export const colorScoreMap = (score: number, highestScore: number = 100) => {
  const scorePercentage = (score / highestScore) * 100;
  if (scorePercentage < 25) {
    return 'bg-rose-200';
  }
  if (scorePercentage < 50) {
    return 'bg-orange-200';
  }
  if (scorePercentage < 75) {
    return 'bg-yellow-200';
  }
  if (scorePercentage < 95) {
    return 'bg-green-200';
  }
  return 'bg-green-300';
}