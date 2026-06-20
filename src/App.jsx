import React, { useState } from 'react'
import Weather from './components/Weather'
import allBackgrounds from './components/WeatherBackgrounds'
import clear_bg from './backgrounds/bg-clear.jpg'

/* need to import google fonts in the .css file */

const App = () => {

  // State created at root
  const [weatherData, setWeatherData] = useState(null);

  // 2. Look up the background image based on the top-level state
  const currentBgImage = weatherData ? (allBackgrounds[weatherData.current.condition.code] || clear_bg) : clear_bg;

  return (
    <div className='app'
    style={{ 
        backgroundImage: `url(${currentBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        transition: 'background-image 0.5s ease-in-out' // Makes background swaps smooth!
      }}>
      <Weather weatherData={weatherData} setWeatherData={setWeatherData}/>
    </div>
  )
}

export default App;

