import React, {useRef} from 'react';
import './Forecast.css';


const Forecast = ({ weatherData, allIcons, clear_icon }) => {


  const windowRef = useRef(null);
  // Standard state for scroll physics


  // Track dragging state parameters variables
  let isDown = false;
  let startX;
  let scrollLeft;

  // If data hasn't loaded yet, return nothing to prevent crashes
  if (!weatherData || !weatherData.forecast) return null;

  // Mouse held down event handling
  const handleMouseDown = (e) => {
    isDown = true;
    windowRef.current.style.cursor = 'grabbing';
    // Calculate initial click coordinate minus container positioning offsets
    startX = e.pageX - windowRef.current.offsetLeft;
    scrollLeft = windowRef.current.scrollLeft;
  };

  // Mouse Release/Leave events
  const handleMouseUpOrLeave = () => {
    isDown = false;
    if (windowRef.current) {
      windowRef.current.style.cursor = 'grab';
    }
  };

  // Handles how the carousel moves during mouse dragging
  const handleMouseMove = (e) => {
    if (!isDown) return; // Exit if user isn't holding click
    e.preventDefault();  // Stop browser text selection highlights while dragging
    
    const x = e.pageX - windowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiply by 1.5 to adjust drag speed sensitivity
    windowRef.current.scrollLeft = scrollLeft - walk;
  };
  

return (
    <>
        <div className='forecast-carousel-wrapper'>  
        <div className='carousel-window'
            ref={windowRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseUp={handleMouseUpOrLeave}
            onMouseMove={handleMouseMove}
            style={{ cursor: 'grab' }}
        >
            <div className='carousel-track'>
            {weatherData.forecast.forecastday.map((dayItem, index) => (
                
                <div key={dayItem.date} className='forecast-card'>
                <p className='card-day'>
                    {index === 0 ? 'Today' : new Date(dayItem.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <img 
                    src={allIcons[dayItem.day.condition.code] || clear_icon} 
                    alt='condition' 
                    className='card-icon' 
                    draggable="false"
                />
                <div className='card-temps'>
                    <span className='max-temp'>{Math.floor(dayItem.day.maxtemp_c)}°</span>
                    <span className='min-temp'>{Math.floor(dayItem.day.mintemp_c)}°</span>
                </div>
                </div>

            ))}
            </div>
        </div>

        </div>
    </>
  );
};

export default Forecast;