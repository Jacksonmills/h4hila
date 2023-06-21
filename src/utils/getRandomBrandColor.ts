export const getRandomBrandColor = (): string => {
  const colors = ['#cf6cfa', '#b136cc', '#2563eb', '#7cdaf4', '#694293', '#4e2a7a'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  if (!randomColor) throw new Error('No random color found');
  return randomColor;
};
