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


  // REMOVE THE IMAGE !!!
  // 2. Look up the background image based on the top-level state
  const currentBgImage = weatherData ? (allBackgrounds[weatherData.current.condition.code] || 'linear-gradient(to bottom, #4ea8de, #56cfe1)') : 'linear-gradient(to bottom, #4ea8de, #56cfe1)';

  return (
    <main className='app'
    style={{ 
        background: currentBgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        transition: 'background-image 0.5s ease-in-out' // Makes background swaps smooth!
      }}>

      {/* Weather: Shows the weather data from the selected day. */}
      <Weather 
        weatherData={weatherData} 
        setWeatherData={setWeatherData}
      />
      {/* Forecast: Shows the weather forecast for the next 7 days. */}
      <Forecast 
                  weatherData={weatherData} 
                  allIcons={allIcons} 
                  clear_icon={clear_icon} 
      />

      <footer className='appfooter'>© Raymond Kabutey 2026. All rights reserved.</footer>

    </main>
  )
}

export default App;

