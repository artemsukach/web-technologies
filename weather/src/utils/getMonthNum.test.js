import { getMonthNum } from './getMonthNum';
import { WEATHER } from '../config/config';

describe('getMonthNum', () => {
  const newDate = new Date(WEATHER[0].date);

  test('shoud return month number', () => {
    expect(getMonthNum(newDate)).toBe(1);
  });
});
