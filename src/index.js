import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(location) {
  let request = new XMLHttpRequest();

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, location);
    } else {
      printError(this, response, location);
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
}

// UI Logic

function printError(request, apiResponse, location) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${location}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, location) {
  document.querySelector('#showResponse').innerText = `The weather in ${location} is '${apiResponse.weather[0].description}'.
  The humidity is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${apiResponse.main.temp} degrees.
  The feels-like temperature in Fahrenheit is ${apiResponse.main.feels_like} degrees.
  The wind speed is ${apiResponse.wind.speed} miles/hour.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(location);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});