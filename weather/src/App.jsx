import './App.css';
import React from 'react';
import WeatherItems from './weatherItems/WeatherItems.jsx';
import { WEATHER } from './config/config';

function App() {
  return (
    <div className="App">
      <WeatherItems weather={WEATHER} />
    </div>
  );
}

export default App;
