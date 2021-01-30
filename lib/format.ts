export const capitalize = (input: string): string => {
  const [first, ...rest] = input.split('');
  return `${first.toUpperCase()}${rest.join('')}`;
};

export const nicePercent = (percent: number, digits = 2): string =>
  `${(percent * 100).toFixed(digits)}%`;

export const castSatoshi = (number: number): number => +number.toFixed(8);

export const toSatoshi = (number: number): number => +(+number * 0.00000001).toFixed(8);
