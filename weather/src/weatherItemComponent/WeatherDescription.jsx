import React from 'react';


export function WeatherDescription({ description }) {
  return (
    <img className="weather__description" src={description} alt="weather" />
  );
}
