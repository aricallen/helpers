import ms from 'ms';

type HumanTimeModel = {
  [key: string]: {
    value: number;
    text: string;
  };
};

type HumanTime = HumanTimeModel & {
  toString: () => string;
};

export const HumanTime = (milliseconds = 0, minimal = false): HumanTime => {
  const buildText = (key: string, value: number) => {
    if (minimal) {
      return `${value}${key}`;
    }
    if (value > 1) {
      return `${value} ${key}s`;
    }
    return `${value} ${key}`;
  };

  const units = [
    {
      key: minimal ? 'ms' : 'milliseconds',
      baseMultiplier: 1,
    },
    {
      key: minimal ? 's' : 'seconds',
      baseMultiplier: ms('1 second'),
    },
    {
      key: minimal ? 'm' : 'minutes',
      baseMultiplier: ms('1 minute'),
    },
    {
      key: minimal ? 'h' : 'hours',
      baseMultiplier: ms('1 hour'),
    },
    {
      key: minimal ? 'd' : 'days',
      baseMultiplier: ms('1 day'),
    },
    {
      key: minimal ? 'w' : 'weeks',
      baseMultiplier: ms('7 days'),
    },
  ];

  let remainingMilliseconds = milliseconds;
  const humanTime = {} as HumanTimeModel;
  for (let i = units.length - 1; i >= 0; i -= 1) {
    const unit = units[i];
    const value = Math.floor(remainingMilliseconds / unit.baseMultiplier);
    if (remainingMilliseconds > 0) {
      remainingMilliseconds -= value * unit.baseMultiplier;
    }
    humanTime[unit.key] = {
      value,
      text: buildText(unit.key, value),
    };
  }

  const toString = () => {
    const keys = Object.keys(humanTime);
    let str = '';
    for (let i = 0; i < keys.length; i += 1) {
      const unit = humanTime[keys[i]];
      if (unit.value > 0) {
        str += `${unit.text}, `;
      }
    }
    return str.replace(/,\s$/, ''); // remove last comma/space
  };

  return Object.assign({}, humanTime, toString);
};

export default HumanTime;
