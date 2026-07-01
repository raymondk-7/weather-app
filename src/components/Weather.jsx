import React, { useState, useEffect } from 'react'
import './reset.css'
import './Weather.css'

import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

// Icons from SVGRepo 

import uv_index from '../assets/uvindex.svg'
import feels_like from '../assets/feelslike.svg'
import rain_fall from '../assets/rainfall.svg'

import allIcons from './WeatherIcons.js'
import clear_icon from '../assets/clear.png'
import Forecast from './Forecast.jsx';

const Weather = ({ weatherData, setWeatherData }) => {

  
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Stores autocomplete matches
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Sets data to first day in the forecast

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const url = `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Autocomplete error:", error);
      }
    };

    // Prevents excessive API calls!
    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [city]);
  

  // Setting the weekday...
  const getDayOfWeek = () => {
    if (!weatherData || !weatherData.location) return "";
    const dateOnly = weatherData.location.localtime.split(" ")[0];
    const date = new Date(dateOnly);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  

  
  const search = async (cityName)=> {
    

    
    const query = cityName || city;
    if (!query.trim()) return; // prevents call if search bar is empty


    /* TEMPORARY MOCK DATA TO AVOID ADDITIONAL API CALLS
    const mockData = {
      location: { name: "London", localtime: "2026-06-22 21:30"},
      current: { temp_c: 16, feelslike_c: 18, humidity: 85, wind_kph: 12, uv: 2, precip_mm: 0.4, condition: { text: "cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png", code: 1000} },
      
      forecast: {
        forecastday: [
          { date: "2026-06-22", day: { maxtemp_c: 18, mintemp_c: 12, condition: { code: 1000 } } }, // Mon
          { date: "2026-06-23", day: { maxtemp_c: 21, mintemp_c: 14, condition: { code: 1000 } } }, // Tue
          { date: "2026-06-24", day: { maxtemp_c: 19, mintemp_c: 11, condition: { code: 1003 } } }, // Wed
          { date: "2026-06-25", day: { maxtemp_c: 15, mintemp_c: 9,  condition: { code: 1006 } } }, // Thu
          { date: "2026-06-26", day: { maxtemp_c: 16, mintemp_c: 10, condition: { code: 1009 } } }, // Fri
          { date: "2026-06-27", day: { maxtemp_c: 22, mintemp_c: 15, condition: { code: 1000 } } }, // Sat
          { date: "2026-06-28", day: { maxtemp_c: 24, mintemp_c: 16, condition: { code: 1000 } } },  // Sun
          { date: "2026-06-29", day: { maxtemp_c: 16, mintemp_c: 10, condition: { code: 1009 } } }, // Mon
          { date: "2026-06-30", day: { maxtemp_c: 22, mintemp_c: 15, condition: { code: 1000 } } }, // Tue
          { date: "2026-07-01", day: { maxtemp_c: 24, mintemp_c: 16, condition: { code: 1000 } } }  // Weds
        ]
      }
    };

    
    setWeatherData(mockData);
    return;
    */
    
    
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APP_ID}&q=${query}&days=7`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('City not found.');
        }

        const data = await response.json();
        setWeatherData(data); 
        console.log(data);

      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message);
      }
    };
        
  

  

  return (
    
    <section className='weather'>
        <div className='search-container'>
          <div className='search-bar'>
              <input 
                type='text' 
                placeholder='Search areas...' 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()} // search on Enter key
              />
              <img src={search_icon} alt='search' onClick={search} style={{ cursor: 'pointer' }} />
          </div>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item) => (
                <li 
                  key={item.id} 
                  onClick={() => {
                    setCity(item.name);   // 1. Fills the search bar text with the city name
                    search(item.name);    // 2. Automatically launches the 7-day forecast search
                    setSuggestions([]);   // 3. Empties the array to instantly close the box
                  }}
                >
                  {item.name}, <span className="country-tint">{item.country}</span>
                </li>
              ))}
            </ul>
          )}

        </div>

        {weatherData ? (
        <>

          <div className='overview'>
            <p className='weekday'>{getDayOfWeek()}</p>
            <p className='location'>{weatherData.location.name}</p>
          </div>

          <div className='weather-main'>

            <div className='left-header'>
              <img src={allIcons[weatherData.current.condition.code] || clear_icon} 
                alt='weather condition' 
                className='weather-icon'
              />
              <div className='temp-condition'>
                <p className='temperature'>{Math.floor(weatherData.current.temp_c)}°C</p>
                <p className='condition-text'>{weatherData.current.condition.text}</p>
              </div>
            </div>

            <div className='right-header'>

              <img src={feels_like} 
                alt='Feels like'
                className='feelsLike-icon'
              />

              <div className="feelsLikeWrapper">
                <p className='feelsLike'>Feels like</p>
                <p className='feelsLike-temp'>{Math.floor(weatherData.current.feelslike_c)}°C</p>
              </div>
            </div>

          </div>

          <div className='weather-data'>

            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.current.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={uv_index} alt="" />
              <div>
                <p>{weatherData.current.uv}</p>
                <span>UV Index</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.current.wind_kph} KM/H</p>
                <span>Wind Speed</span>
              </div>
            </div>

            <div className="col">
              <img src={rain_fall} alt="" />
              <div>
                <p>{weatherData.current.precip_mm} mm</p>
                <span>Rainfall</span>
              </div>
            </div>  

          </div>

          {/* Forecast: Shows the weather forecast for the next 7 days. */}
            <Forecast 
                        weatherData={weatherData} 
                        allIcons={allIcons} 
                        clear_icon={clear_icon} 
            />

        </>
      ) : (
        /* This renders safely on initial load while weatherData is still null */
        <p className="search-prompt">Search for a city to see its weather dataaaaaaaaa!</p>
      )}

        

        {/* link-back has no css selector */}
        <footer className='link-back'>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></footer>
    </section>
    
  ) // end of returned api data
} // end of const Weather

export default Weather;
