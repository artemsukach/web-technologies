import { transformDate } from './transformDate';
import { getDateNum } from './getDateNum';
import { getDayNum } from './getDayNum';
import { getMonthNum } from './getMonthNum';
import { getYearNum } from './getYearNum';
import { WEATHER } from '../config/config';

describe('transformDate', () => {
  const newDate = new Date(WEATHER[0].date);
  const mockGetMonthNum = jest.fn(getMonthNum);
  const mockGetDateNum = jest.fn(getDateNum);
  const mockGetDayNum = jest.fn(getDayNum);
  const mockGetYearNum = jest.fn(getYearNum);
  let result;

  beforeEach(() => {
    transformDate(
      newDate,
      mockGetMonthNum,
      mockGetDateNum,
      mockGetDayNum,
      mockGetYearNum
    );
    result = transformDate(
      newDate,
      getMonthNum,
      getDateNum,
      getDayNum,
      getYearNum
    );
  });

  test('shoud return valid object', () => {
    expect(result).toEqual({
      day: 'Monday',
      dateNum: 28,
      month: 'February',
      year: 2022,
    });
  });

  test('shoud call get functions', () => {
    expect(mockGetMonthNum).toBeCalledTimes(1);
    expect(mockGetDateNum).toBeCalledTimes(1);
    expect(mockGetDayNum).toBeCalledTimes(1);
    expect(mockGetYearNum).toBeCalledTimes(1);
  });
});
