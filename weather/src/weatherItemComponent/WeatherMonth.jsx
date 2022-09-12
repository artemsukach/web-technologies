import React from "react";
import PropTypes from 'prop-types';

export function WeatherMonth({ month }) {
  return <p className="weather__month">{month}</p>;
}

WeatherMonth.propTypes = {
  month: PropTypes.string,
};
