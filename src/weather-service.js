export default class WeatherService {
  static getWeather(location) {
    if (location.search(/\d/) === 0) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${process.env.API_KEY}&units=imperial`)
        .then(function(response) {
          if (!response.ok) {
            const errorMessage = `${response.status} ${response.status.Text}`;
            throw new Error(errorMessage);
          }
          else {
            return response.json();
          }
        })
        .catch(function(error) {
          return error;
        });
    }
    else {
      return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=imperial`)
        .then(function(response) {
          if (!response.ok) {
            const errorMessage = `${response.status} ${response.status.Text}`;
            throw new Error(errorMessage);
          }
          else {
            return response.json();
          }
        })
        .catch(function(error) {
          return error;
        });
    }
  }

  static getFutureWeather(location) {
    if (location.search(/\d/) === 0) {
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${location}&cnt=8&appid=${process.env.API_KEY}&units=imperial`)
        .then(function(response) {
          if (!response.ok) {
            const errorMessage = `${response.status} ${response.status.Text}`;
            throw new Error(errorMessage);
          }
          else {
            return response.json();
          }
        })
        .catch(function(error) {
          return error;
        });
    }
    else {
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=8&appid=${process.env.API_KEY}&units=imperial`)
        .then(function(response) {
          if (!response.ok) {
            const errorMessage = `${response.status} ${response.status.Text}`;
            throw new Error(errorMessage);
          }
          else {
            return response.json();
          }
        })
        .catch(function(error) {
          return error;
        });
    }
  }
}