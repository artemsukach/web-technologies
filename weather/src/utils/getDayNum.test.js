import { getDayNum } from './getDayNum';
import { WEATHER } from '../config/config';

describe('getDayNum', () => {
  const newDate = new Date(WEATHER[0].date);

  test('shoud return day number', () => {
    expect(getDayNum(newDate)).toBe(1);
  });
});
