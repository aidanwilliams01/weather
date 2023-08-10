export default class WeatherService {
  static async getWeather(location) {
    try {
      if (location.search(/\d/) === 0) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${process.env.API_KEY}&units=imperial`);
        const jsonifiedResponse = await response.json();
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.status.Text}`;
          throw new Error(errorMessage);
        }
        return jsonifiedResponse;
      }
      else {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=imperial`);
        const jsonifiedResponse = await response.json();
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.status.Text}`;
          throw new Error(errorMessage);
        }
        return jsonifiedResponse;
      }
    }
    catch(error) {
      return error;
    }
  }
  
  static async getFutureWeather(location) {
    try {
      if (location.search(/\d/) === 0) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${location}&cnt=8&appid=${process.env.API_KEY}&units=imperial`);
        const jsonifiedResponse = await response.json();
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.status.Text}`;
          throw new Error(errorMessage);
        }
        return jsonifiedResponse;
      }
      else {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=8&appid=${process.env.API_KEY}&units=imperial`);
        const jsonifiedResponse = await response.json();
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.status.Text}`;
          throw new Error(errorMessage);
        }
        return jsonifiedResponse;
      }
    }
    catch(error) {
      return error;
    }
  }
}