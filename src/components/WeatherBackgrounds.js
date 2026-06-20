// POJO to reference backgrounds in library. Numbers are assigned by WeatherAPI.com to diferrent conditions, which are represented 
// by the given colours

const allBackgrounds = {
  // Clear / Sunny (Sunny light blue or warm orange gradient)
  1000: 'linear-gradient(to bottom, #4ea8de, #56cfe1)',
  
  // Cloudy / Misty / Foggy (Muted slate grays)
  1003: 'linear-gradient(to bottom, #a8dadc, #457b9d)', // Partly Cloudy
  1006: 'linear-gradient(to bottom, #708090, #4f5d75)', // Cloudy
  1009: 'linear-gradient(to bottom, #5c677d, #334155)', // Overcast
  1030: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)', 
  1135: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)',
  
  // Drizzle 
  1150: 'linear-gradient(to bottom, #4f5d75, #2d3142)',
  1153: 'linear-gradient(to bottom, #4f5d75, #2d3142)',

  // Rain
  1180: 'linear-gradient(to bottom, #3a506b, #1c2541)',
  1183: 'linear-gradient(to bottom, #3a506b, #1c2541)', // Light Rain
  1186: 'linear-gradient(to bottom, #3a506b, #1c2541)',
  1189: 'linear-gradient(to bottom, #1c2541, #0b132b)', // Heavy Rain
  1240: 'linear-gradient(to bottom, #1c2541, #0b132b)',
  1243: 'linear-gradient(to bottom, #1c2541, #0b132b)',

  // Snow / Ice 
  1210: 'linear-gradient(to bottom, #e6f2ff, #b3d1ff)',
  1213: 'linear-gradient(to bottom, #e6f2ff, #b3d1ff)',
  1219: 'linear-gradient(to bottom, #e6f2ff, #b3d1ff)',
  1255: 'linear-gradient(to bottom, #e6f2ff, #b3d1ff)',
};


export default allBackgrounds;