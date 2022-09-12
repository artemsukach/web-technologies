import React from "react";
import PropTypes from 'prop-types';

export function WeatherYear({ year}) {
  return  <p className="weather__year">{year} year</p>;
}

WeatherYear.propTypes = {
  year: PropTypes.number,
};