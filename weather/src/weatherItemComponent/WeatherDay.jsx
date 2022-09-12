import React from 'react';
import PropTypes from 'prop-types';

export function WeatherDay({ day }) {
  return <p className="weather__day">{day}</p>;
}

WeatherDay.propTypes = {
  day: PropTypes.string,
};
