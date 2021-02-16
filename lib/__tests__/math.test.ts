import { getDecimalPlaces } from '../math';

describe('getDecimalPlaces', () => {
  it('finds decimal places of fractional number', () => {
    expect(getDecimalPlaces(0.0004)).toEqual(4);
    expect(getDecimalPlaces(0.000001)).toEqual(6);
  });

  it('finds decimal places for scientific notation', () => {
    expect(getDecimalPlaces(1e-8)).toEqual(8);
  });
});
