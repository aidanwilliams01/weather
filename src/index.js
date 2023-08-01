import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(location) {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();

    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response, location]);
      } else {
        printError(reject[this, response, location]);
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

  promise.then(function(weatherDataArray) {
    printWeather(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getFutureWeather(location) {
  let promise = new Promise(function(resolve, reject) {
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

  promise.then(function(weatherDataArray) {
    printFutureWeather(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
  document.querySelector('#showFutureWeather').innerText = '';
}

function printWeather(data) {
  let dateTime =  new Date();
  let offset = dateTime.getTimezoneOffset();
  dateTime = dateTime.valueOf() + (offset * 60 * 1000) + (data[0].timezone * 1000);
  dateTime = new Date(dateTime).toTimeString();
  dateTime = dateTime.slice(0, 5);
  document.querySelector('#showResponse').innerText = 
  `The current time in ${data[1]} is ${dateTime}.
  The weather is '${data[0].weather[0].description}'.
  The humidity is ${data[0].main.humidity}%.
  The temperature in Fahrenheit is ${data[0].main.temp} degrees.
  The feels-like temperature in Fahrenheit is ${data[0].main.feels_like} degrees.
  The wind speed is ${data[0].wind.speed} miles/hour.`;
}

function printFutureWeather(data) {
  let output = '';
  for (let index = 0; index < 8; index++) {
    let dateTime =  new Date((data[0].list[index].dt_txt));
    dateTime = dateTime.valueOf() + (data[0].city.timezone * 1000);
    dateTime = new Date(dateTime).toTimeString();
    dateTime = dateTime.slice(0, 5);
    output = `${output}
    ${dateTime} - ${data[0].list[index].weather[0].description}, ${data[0].list[index].main.temp} degrees`;
  }
  document.querySelector('#showFutureWeather').innerText = `24-hour forecast: ${output}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(location);
  getFutureWeather(location);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});