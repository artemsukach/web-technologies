import { MONTHS, DAYS } from '../config/config';

export const transformDate = (
  date,
  getMonthNum,
  getDateNum,
  getDayNum,
  getYearNum
) => {
  const monthNum = getMonthNum(date);
  const dateNum = getDateNum(date);
  const dayNum = getDayNum(date);
  const year = getYearNum(date);

  const month = MONTHS[monthNum];
  const day = DAYS[dayNum];

  return {
    day,
    dateNum,
    month,
    year,
  };
};

