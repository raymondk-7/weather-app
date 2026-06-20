import React, { useState, useEffect } from 'react'
import './reset.css'
import './Weather.css'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

import allIcons from './weatherIcons.js'
import clear_icon from '../assets/clear.png'

const Weather = ({ weatherData, setWeatherData }) => {

  
  const [city, setCity] = useState('');

  useEffect(() => {
    // We pass a direct string to search() or set standard state
    search("London"); 
  }, []);

  

  
  const search = async (cityName)=> {
    

    
    const query = cityName || city;
    if (!query.trim()) return; // prevents call if search bar is empty


    // 🛠️ TEMPORARY MOCK DATA TO AVOID ADDITIONAL API CALLS
    const mockData = {
      location: { name: "London" },
      current: { temp_c: 16, humidity: 85, wind_kph: 12, condition: { icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"} }
    };
    setWeatherData(mockData);
    return;
  

    /*
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${query}`;
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
    */
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
          <img src={allIcons[weatherData.current.condition.code] || clear_icon} alt='weather condition' className='weather-icon'/>
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
        <footer className='link-back'>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></footer>
    </div>
  ) // end of returned api data
} // end of const Weather

export default Weather;
