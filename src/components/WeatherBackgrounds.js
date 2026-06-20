import clear_bg from '../backgrounds/bg-clear.jpg'
import cloud_bg from '../backgrounds/bg-cloudy.jpg'
import drizzle_bg from '../backgrounds/bg-drizzle.gif'
import rain_bg from '../backgrounds/bg-raining.jpeg'
import snow_bg from '../backgrounds/bg-snowing.gif'

// POJO to reference backgrounds in library. Numbers are assigned by WeatherAPI.com to diferrent conditions, which are represented 
// by the given .pngs


const allBackgrounds = {
  // Clear / Sunny
  1000: clear_bg,
  
  // Cloudy / Misty / Foggy
  1003: cloud_bg,
  1006: cloud_bg,
  1009: cloud_bg,
  1030: cloud_bg,
  1135: cloud_bg,
  
  // Drizzle
  1150: drizzle_bg,
  1153: drizzle_bg,
  
  // Rain / Showers
  1180: rain_bg,
  1183: rain_bg,
  1186: rain_bg,
  1189: rain_bg,
  1240: rain_bg,
  1243: rain_bg,
  
  // Snow / Ice
  1210: snow_bg,
  1213: snow_bg,
  1219: snow_bg,
  1255: snow_bg,
};

// Export the object so other components can access it
export default allBackgrounds;