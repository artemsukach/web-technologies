import { getDateNum } from './getDateNum';
import { WEATHER } from '../config/config';

describe('getYearNum', () => {
  const newDate = new Date(WEATHER[0].date);

  test('shoud return date number', () => {
    expect(getDateNum(newDate)).toBe(28);
  });
});
