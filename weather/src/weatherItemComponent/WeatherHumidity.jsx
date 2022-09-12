import React from "react";

export function WeatherHumidity({ relativeHumidity }) {
  return <p className="weather__humidity">Reletive humidity: {relativeHumidity}</p>;
}