import React, {useRef} from 'react';
import './Forecast.css';


const Forecast = ({ weatherData, allIcons, clear_icon, selectedDayIndex, setSelectedDayIndex }) => {


  const windowRef = useRef(null);
  // Standard state for scroll physics


  // Track dragging state parameters variables
  let isDown = useRef(false);
  let startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  // If data hasn't loaded yet, return nothing to prevent crashes
  if (!weatherData || !weatherData.forecast) return null;

  // Mouse held down event handling
  const handleMouseDown = (e) => {
    isDown.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - windowRef.current.offsetLeft;
    scrollLeft.current = windowRef.current.scrollLeft;
    windowRef.current.style.cursor = 'grabbing';
  };

  // Mouse Release/Leave events
  const handleMouseUpOrLeave = () => {
    isDown.current = false;
    if (windowRef.current) {
      windowRef.current.style.cursor = 'grab';
    }
  };

  // Handles how the carousel moves during mouse dragging
  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    
    const x = e.pageX - windowRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Multiply by 1.5 to adjust drag speed sensitivity
    windowRef.current.scrollLeft = scrollLeft - walk;

    e.preventDefault();
    windowRef.current.scrollLeft = scrollLeft.current - walk;
  };
  

return (
    <>
        <h2 class='forecast-title'>Today, Tomorrow and the Next Day</h2>
        <article className='forecast-carousel-wrapper' id='weather-forecast'>  
          <div className='carousel-window'
              ref={windowRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseUpOrLeave}
              onMouseUp={handleMouseUpOrLeave}
              onMouseMove={handleMouseMove}
          >
              <div className='carousel-track'>
                
              {weatherData.forecast.forecastday.map((dayItem, index) => (
                  
                  <div 
                    key={dayItem.date} 
                    className={`forecast-card ${selectedDayIndex === index ? 'active' : ''}`}
                    // Where I left off. fix changing the days
                    onClick={() => {console.log("Card clicked", index); setSelectedDayIndex(index)}}
                    style={{ cursor: 'pointer' }}
                  >
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

        </article>
    </>
  );
};

export default Forecast;