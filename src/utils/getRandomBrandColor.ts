export const getRandomBrandColor = (): string => {
  const colors = ['#cc66ff', '#2563eb', '#7ed9f8', '#734eab'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  if (!randomColor) throw new Error('No random color found');
  return randomColor;
};
