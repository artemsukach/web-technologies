import snow from '../img/snow.png';
import wind from '../img/wind.png';
import sun from '../img/sun.png';
import rain from '../img/rain.png';

export const WEATHER = [
  {
    date: '02/28/2022',
    minTemperature: -3,
    maxTemperature: +4,
    atmosphericPressure: 720,
    relativeHumidity: 80,
    windSpeed: 8,
    windDirection: 'South',
    description: snow,
  },
  {
    date: '03/01/2022',
    minTemperature: -2,
    maxTemperature: +6,
    atmosphericPressure: 735,
    relativeHumidity: 77,
    windSpeed: 3.9,
    windDirection: 'South-East',
    description: snow,
  },
  {
    date: '03/02/2022',
    minTemperature: -2,
    maxTemperature: +5,
    atmosphericPressure: 740,
    relativeHumidity: 63,
    windSpeed: 4.3,
    windDirection: 'North',
    description: wind,
  },
  {
    date: '03/03/2022',
    minTemperature: -1,
    maxTemperature: +3,
    atmosphericPressure: 730,
    relativeHumidity: 73,
    windSpeed: 3.4,
    windDirection: 'North-West',
    description: rain,
  },
  {
    date: '03/04/2022',
    minTemperature: 0,
    maxTemperature: +6,
    atmosphericPressure: 729,
    relativeHumidity: 87,
    windSpeed: 3.0,
    windDirection: 'East',
    description: wind,
  },
  {
    date: '03/05/2022',
    minTemperature: 1,
    maxTemperature: 8,
    atmosphericPressure: 738,
    relativeHumidity: 63,
    windSpeed: 3.3,
    windDirection: 'West',
    description: sun,
  },
  {
    date: '03/06/2022',
    minTemperature: 2,
    maxTemperature: 9,
    atmosphericPressure: 742,
    relativeHumidity: 78,
    windSpeed: 3.4,
    windDirection: 'South-West',
    description: sun,
  },
];

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
