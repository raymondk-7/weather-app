import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'


// POJO to reference icons in library. Numbers are assigned by WeatherAPI.com to diferrent conditions, which are represented 
// by the given .pngs


// After a search, the API returns a large JSON object holding a condition code, which is saved into weatherData.
// The component uses the returned code to look up the correct icon to return from the POJO. 

const allIcons = {
  // Clear / Sunny
  1000: clear_icon,
  
  // Cloudy / Misty / Foggy
  1003: cloud_icon,
  1006: cloud_icon,
  1009: cloud_icon,
  1030: cloud_icon,
  1135: cloud_icon,
  
  // Drizzle
  1150: drizzle_icon,
  1153: drizzle_icon,
  
  // Rain / Showers
  1180: rain_icon,
  1183: rain_icon,
  1186: rain_icon,
  1189: rain_icon,
  1240: rain_icon,
  1243: rain_icon,
  
  // Snow / Ice
  1210: snow_icon,
  1213: snow_icon,
  1219: snow_icon,
  1255: snow_icon,
};

// Export the object so other components can access it
export default allIcons;