import './WeatherItems.css';
import React from 'react';
import WeatherItem from '../weatherItem/WeatherItem.jsx';
import PropTypes from 'prop-types';

function WeatherItems({ weather }) {
  return (
    <div className="weather">
      <h1 className="weather__title">Weather</h1>
      <div className="weather__items">
        {weather.map((item) => (
          <WeatherItem key={item.date} {...item} />
        ))}
      </div>
    </div>
  );
}

WeatherItems.propTypes = {
  weather: PropTypes.array.isRequired
}

WeatherItems.defaultProps = {
  weather: []
}

export default WeatherItems;
