/**
 * @param price {Number}
 * @param mod {Number} percentage in float form i.e. 2% => 0.02 || -2% => -0.02
 */
export const modByPercent = (price: number, mod: number, digits = 10): number =>
  +(price * (1 + mod)).toFixed(digits);

export const rand = (min: number, max: number): number => Math.random() * (max - min) + min;

/**
 * @param start {Number}
 * @param end {Number}
 * @return float representation of a percent i.e. 2% => 0.02 || -2% => -0.02
 */
export const getPercentDiff = (start: number, end: number, digits = 10): number => {
  const _start = +start;
  const _end = +end;

  let diff;
  if (_end < _start) {
    diff = ((_start - _end) / _start) * -1;
  } else {
    diff = (_end - _start) / _start;
  }
  return +diff.toFixed(digits);
};

export const getDecimalPlaces = (num: number): number => {
  const parts = num.toString().split('.');
  if (parts.length > 1) {
    const afterDecimal = parts[1];
    const indexOfOne = afterDecimal.indexOf('1') + 1;
    return indexOfOne;
  }
  return 0; // whole number
};

export const isEqualPrice = (a: number | string, b: number | string): boolean => {
  if (Number.isNaN(+a) || Number.isNaN(+b)) {
    console.log(`isEqualPrice received NaN`);
    return false;
  }

  if (typeof a !== 'number' && typeof a !== 'string') {
    throw Error(`isEqualPrice expected number|string but received ${typeof a}`);
  }

  if (typeof b !== 'number' && typeof b !== 'string') {
    throw Error(`isEqualPrice expected number|string but received ${typeof b}`);
  }

  return parseFloat(`${a}`).toFixed(8) === parseFloat(`${b}`).toFixed(8);
};
