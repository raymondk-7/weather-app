import React, { useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  
  const search = async ()=> {
    
    if (!city.trim()) return; // prevents call if search bar is empty

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('City not found.');
      }

      const data = await response.json();
      setWeatherData(data); // Store the data in state
      console.log(data);

    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(error.message);
    }
  }
  


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input 
              type='text' 
              placeholder='Search...' 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search()} // search on Enter key
            />
            <img src={search_icon} alt='search' onClick={search} style={{ cursor: 'pointer' }} />
        </div>

        {weatherData ? (
        <>
          <img src={weatherData.current.condition.icon} alt='weather condition' className='weather-icon'/>
          <p className='temperature'>{Math.floor(weatherData.current.temp_c)}°C</p>
          <p className='location'>{weatherData.location.name}</p>

          <div className='weather-data'>
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.current.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.current.wind_kph} KM/H</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* This renders safely on initial load while weatherData is still null */
        <p className="search-prompt">Search for a city to see the weather!</p>
      )}

            {/* link-back has no css selector */}
            <p className='link-back'>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
        </div>
  ) // end of returned api data
} // end of const Weather

export default Weather;
