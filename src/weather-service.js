export default class WeatherService {
  static getWeather(location) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
  
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, location]);
        } else {
          reject([this, response, location]);
        }
      });
  
      if (location.search(/\d/) === 0) {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${process.env.API_KEY}&units=imperial`;
        request.open("GET", url, true);
        request.send();
      }
      else {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=imperial`;
        request.open("GET", url, true);
        request.send();
      }
    });
  }

  static getFutureWeather(location) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
  
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, location]);
        } else {
          reject([this, response, location]);
        }
      });
  
      if (location.search(/\d/) === 0) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${location}&cnt=8&appid=${process.env.API_KEY}&units=imperial`;
        request.open("GET", url, true);
        request.send();
      }
      else {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=8&appid=${process.env.API_KEY}&units=imperial`;
        request.open("GET", url, true);
        request.send();
      }
    });
  }
}