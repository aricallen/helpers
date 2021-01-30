import ms from 'ms';
import { msToHumanTime } from '../format';

describe('msToHumanTime', () => {
  const weeks = ms('1 week');
  const days = ms('3 days');
  const hours = ms('4 hours');
  const minutes = ms('5 minutes');
  const seconds = ms('15 seconds');
  const milli = 453;
  const total = weeks + days + hours + minutes + seconds + milli;
  it('parses milliseconds to human form', () => {
    expect(msToHumanTime(total)).toBe('1w, 3d, 4h, 5m, 15s, 453ms');
  });

  it('parses to long form if passed min = false', () => {
    expect(msToHumanTime(total, false)).toBe(
      '1 week, 3 days, 4 hours, 5 minutes, 15 seconds, 453 milliseconds'
    );
  });
});
