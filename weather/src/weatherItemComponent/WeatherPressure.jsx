import React from "react";

export function WeatherPressure({ atmosphericPressure }) {
  return <p className="weather__atmospheric-pressure">
  Atmospheric pressure: {atmosphericPressure}
</p>;
}