import React from 'react';
import './WeatherTemperature.css';

export function WeatherTemperature({ minTemperature, maxTemperature }) {
  return (
    <div className="weather__temperature-wrapper">
      <div className="weather__min-temperature">
        <p className="weather__min-description">min</p>
        <p className="weather__min-value">
          {minTemperature}
          <span>&#176;</span>
        </p>
      </div>
      <div className="weather__max-temperature">
        <p className="weather__max-description">max</p>
        <p className="weather__max-value">
          {maxTemperature}
          <span>&#176;</span>
        </p>
      </div>
    </div>
  );
}
