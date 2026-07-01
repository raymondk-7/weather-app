import React, { useState } from 'react'
import './App.css';

import Weather from './components/Weather'
import Forecast from './components/Forecast'

import allBackgrounds from './components/WeatherBackgrounds'
import allIcons from './components/WeatherIcons'
import clear_icon from './assets/clear.png'
import clear_bg from './backgrounds/bg-clear.jpg'

/* need to import google fonts in the .css file */

const App = () => {

  // State created at root
  const [weatherData, setWeatherData] = useState(null);


  // Looks up the background image based on the top-level state
  const currentBgImage = weatherData ? (allBackgrounds[weatherData.current.condition.code] || 'linear-gradient(to bottom, #4ea8de, #56cfe1)') : 'linear-gradient(to bottom, #4ea8de, #56cfe1)';

  // ul elements hidden until weather data is returned
  return (
    <main className='app'
    style={{ 
        background: currentBgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        transition: 'background-image 0.5s ease-in-out' // Makes background swaps smooth
      }}>

      <nav className='navcontainer'>
        <header><a href='#'>Weather and Forecast</a></header>
        {weatherData && (
          <ul>
            <li><a href='#'>Weather</a></li>
            <li><a href='#weather-forecast'>Forecast</a></li>
          </ul>
      )}
      </nav>

      {/* Weather: Shows the weather data from the selected day. (Contains Forecast)*/}
      <Weather 
        weatherData={weatherData} 
        setWeatherData={setWeatherData}
      />

      <footer className='appfooter'>© Raymond Kabutey 2026. All rights reserved.</footer>

    </main>
  )
}

export default App;

