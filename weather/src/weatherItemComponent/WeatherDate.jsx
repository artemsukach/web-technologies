import React from "react";
import PropTypes from 'prop-types';

export function WeatherDate({ dayNum }) {
  return <p className="weather__date">{dayNum}</p>;
}

WeatherDate.propTypes = {
  dayNum: PropTypes.number,
};