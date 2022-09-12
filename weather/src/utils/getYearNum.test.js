import { getYearNum } from './getYearNum';
import { WEATHER } from '../config/config';

describe('getYearNum', () => {
  const newDate = new Date(WEATHER[0].date);

  test('shoud return year number', () => {
    expect(getYearNum(newDate)).toBe(2022);
  });
});
