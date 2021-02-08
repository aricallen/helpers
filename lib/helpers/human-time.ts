import ms from "ms";

enum UnitKey {
  MS = "ms",
  S = "s",
  M = "m",
  H = "h",
  D = "d",
  W = "w",
}

type TimeUnit = {
  // amount of specific unit
  value: number;
  unitKey: UnitKey;
};

type TimeUnitMap = {
  [key in UnitKey]: TimeUnit;
};

const UNIT_CONFIGS = [
  {
    unitKey: UnitKey.MS,
    longForm: "millisecond",
    baseMultiplier: 1,
  },
  {
    unitKey: UnitKey.S,
    longForm: "second",
    baseMultiplier: ms("1 second"),
  },
  {
    unitKey: UnitKey.M,
    longForm: "minute",
    baseMultiplier: ms("1 minute"),
  },
  {
    unitKey: UnitKey.H,
    longForm: "hour",
    baseMultiplier: ms("1 hour"),
  },
  {
    unitKey: UnitKey.D,
    longForm: "day",
    baseMultiplier: ms("1 day"),
  },
  {
    unitKey: UnitKey.W,
    longForm: "week",
    baseMultiplier: ms("7 days"),
  },
];

export const formatTimeUnits = (
  timeUnitMap: TimeUnitMap,
  minimal = true
): string => {
  const tokens = Object.values(UnitKey)
    .reverse()
    .filter((unitKey) => timeUnitMap[unitKey].value > 0)
    .map((unitKey) => {
      const unit = timeUnitMap[unitKey];
      if (minimal) {
        return `${unit.value}${unitKey}`;
      }
      const config = UNIT_CONFIGS.find((u) => u.unitKey === unitKey);
      return `${unit.value} ${config && config.longForm}${
        unit.value > 1 ? "s" : ""
      }`;
    });
  return tokens.join(", ");
};

export const parseTimeUnits = (milliseconds = 0): TimeUnitMap => {
  const output = [...UNIT_CONFIGS].reverse().reduce(
    ({ remaining, timeUnitMap }, timeUnit) => {
      const value = Math.floor(remaining / timeUnit.baseMultiplier);
      const { unitKey } = timeUnit;
      timeUnitMap[unitKey] = { unitKey, value: 0 };
      timeUnitMap[unitKey].value = value;
      return {
        timeUnitMap,
        remaining: remaining - value * timeUnit.baseMultiplier,
      };
    },
    { remaining: milliseconds, timeUnitMap: {} as TimeUnitMap }
  );
  return output.timeUnitMap;
};
