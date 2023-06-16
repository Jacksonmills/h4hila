export const colorContrast = (hexcode: string) => {
  const r = parseInt(hexcode.substr(1, 2), 16);
  const g = parseInt(hexcode.substr(3, 2), 16);
  const b = parseInt(hexcode.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
};