const _apiKey = "9614c9de00c867da3d4986edf8141e0c";
const _baseUrl = "https://api.openweathermap.org/data/2.5";

/* Example api call for current weather for London, UK:
https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9614c9de00c867da3d4986edf8141e0c 
*/
export const getCurrentWeather = async location => {
  try {
    const response = await fetch(
      `${_baseUrl}/weather?q=${location}&APPID=${_apiKey}&units=metric`
    );
    const data = await response.json();
    return response.status === 200 ? data : null;
  } catch (err) {
    handleError();
  }
};

/* Example api call for 5 Day Forecast

`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&type=accurate&APPID=${_apiKey}&cnt=5`
https://api.openweathermap.org/data/2.5/forecast/daily?q=CITY-NAME&type=accurate&APPID=YOUR-API-KEY&cnt=5
*/
export const getFiveDayForecast = async location => {
  try {
    const response = await fetch(
      `${_baseUrl}/forecast?q=${location}&APPID=${_apiKey}&cnt=5&type=accurate&units=metric`
    );
    const data = await response.json();
    return response.status === 200 ? data : null;
  } catch (err) {
    handleError();
  }
};

const handleError = err => {
  return console.warn(
    `Warning! There's an error with getCurrentWeather() ${err}`
  );
};
