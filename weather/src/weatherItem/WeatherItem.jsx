import React from 'react';
import './WeatherItem.css';
import PropTypes from 'prop-types';
import { transformDate } from '../utils/transformDate';
import { getMonthNum } from '../utils/getMonthNum';
import { getDateNum } from '../utils/getDateNum';
import { getDayNum } from '../utils/getDayNum';
import { getYearNum } from '../utils/getYearNum';
import { WeatherDay } from '../weatherItemComponent/WeatherDay.jsx';
import { WeatherDate } from '../weatherItemComponent/WeatherDate.jsx';
import { WeatherMonth } from '../weatherItemComponent/WeatherMonth.jsx';
import { WeatherYear } from '../weatherItemComponent/WeatherYear.jsx';
import { WeatherDescription } from '../weatherItemComponent/WeatherDescription.jsx';
import { WeatherTemperature } from '../weatherItemComponent/WeatherTemperature.jsx';
import { WeatherPressure } from '../weatherItemComponent/WeatherPressure.jsx';
import { WeatherHumidity } from '../weatherItemComponent/WeatherHumidity.jsx';
import { WeatherWindSpeed } from '../weatherItemComponent/WeatherWindSpeed.jsx';
import { WeatherWindDirection } from '../weatherItemComponent/WeatherWindDirection.jsx';

function WeatherItem({
  date,
  minTemperature,
  maxTemperature,
  atmosphericPressure,
  relativeHumidity,
  windSpeed,
  windDirection,
  description,
}) {
  const newDate = new Date(date);
  const { day, dateNum, month, year } = transformDate(
    newDate,
    getMonthNum,
    getDateNum,
    getDayNum,
    getYearNum
  );

  return (
    <div className="weather__item">
      <WeatherDay day={day} />
      <WeatherDate dayNum={dateNum} />
      <WeatherMonth month={month} />
      <WeatherYear year={year} />
      <WeatherDescription description={description} />
      <WeatherTemperature
        minTemperature={minTemperature}
        maxTemperature={maxTemperature}
      />
      <WeatherPressure atmosphericPressure={atmosphericPressure} />
      <WeatherHumidity relativeHumidity={relativeHumidity} />
      <WeatherWindSpeed windSpeed={windSpeed} />
      <WeatherWindDirection windDirection={windDirection} />
    </div>
  );
}

WeatherItem.propTypes = {
  date: PropTypes.string,
  minTemperature: PropTypes.number,
  maxTemperature: PropTypes.number,
  atmosphericPressure: PropTypes.number,
  relativeHumidity: PropTypes.number,
  windSpeed: PropTypes.number,
  windDirection: PropTypes.string,
  description: PropTypes.string,
}

export default WeatherItem;
