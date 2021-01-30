import format from 'date-fns/format';

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DATETIME_FILENAME = 'yyyy-MM-dd';

export const datetimeForFilename = (): string => format(Date.now(), DATETIME_FILENAME);
export const datetime = (): string => format(Date.now(), DATETIME_FORMAT);
export const msToDatetime = (ms: number): string => format(ms, DATETIME_FORMAT);

export const roundTimestamp = (ms: number, unit = 'seconds', amount = 10): number => {
  const date = new Date(ms);
  switch (unit.toLowerCase()) {
    case 'seconds':
      return date.setSeconds(Math.round(date.getSeconds() / amount) * amount);
    case 'minutes':
      date.setSeconds(0);
      return date.setMinutes(Math.round(date.getMinutes() / amount) * amount);
    case 'hours':
      date.setSeconds(0);
      date.setMinutes(0);
      return date.setHours(Math.round(date.getHours() / amount) * amount);
    default:
      return ms;
  }
};

export const roundDatetime = (datetime: string, unit = 'seconds', amount = 10): string => {
  const timestamp = new Date(datetime).getTime();
  return msToDatetime(roundTimestamp(timestamp, unit, amount));
};
