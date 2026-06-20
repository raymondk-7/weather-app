import React, { useState } from 'react'
import Weather from './components/Weather'
import allBackgrounds from './components/WeatherBackgrounds'
import clear_bg from './backgrounds/bg-clear.jpg'

/* need to import google fonts in the .css file */

const App = () => {

  // State created at root
  const [weatherData, setWeatherData] = useState(null);


  // REMOVE THE IMAGE !!!
  // 2. Look up the background image based on the top-level state
  const currentBgImage = weatherData ? (allBackgrounds[weatherData.current.condition.code] || 'linear-gradient(to bottom, #4ea8de, #56cfe1)') : 'linear-gradient(to bottom, #4ea8de, #56cfe1)';

  return (
    <div className='app'
    style={{ 
        background: currentBgImage,
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

