import { msToDatetime } from '../date';

describe('msToDatime', () => {
  it('formats ms to datetime', () => {
    const expected = '2021-01-12 12:12:42';
    const date = new Date(expected);
    expect(msToDatetime(date.getTime())).toBe(expected);
  });
});
