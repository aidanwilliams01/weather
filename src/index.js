import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

// Business Logic

async function getWeather(location) {
  const response = await WeatherService.getWeather(location);
  if (response.main) {
    printWeather(response, location);
  } 
  else {
    printError(response, location);
  }
}

async function getFutureWeather(location) {
  const response = await WeatherService.getFutureWeather(location);
  if (response.list) {
    printFutureWeather(response);
  } 
  else {
    printError(response, location);
  }
}

// UI Logic

function printError(error, location) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${location}: ${error}.`;
  document.querySelector('#showFutureWeather').innerText = '';
}

function printWeather(response, location) {
  let dateTime =  new Date();
  let offset = dateTime.getTimezoneOffset();
  dateTime = dateTime.valueOf() + (offset * 60 * 1000) + (response.timezone * 1000);
  dateTime = new Date(dateTime).toTimeString();
  dateTime = dateTime.slice(0, 5);
  document.querySelector('#showResponse').innerText = 
  `The current time in ${location} is ${dateTime}.
  The weather is '${response.weather[0].description}'.
  The humidity is ${response.main.humidity}%.
  The temperature in Fahrenheit is ${response.main.temp} degrees.
  The feels-like temperature in Fahrenheit is ${response.main.feels_like} degrees.
  The wind speed is ${response.wind.speed} miles/hour.`;
}

function printFutureWeather(response) {
  let output = '';
  for (let index = 0; index < 8; index++) {
    let dateTime =  new Date((response.list[index].dt_txt));
    dateTime = dateTime.valueOf() + (response.city.timezone * 1000);
    dateTime = new Date(dateTime).toTimeString();
    dateTime = dateTime.slice(0, 5);
    output = `${output}
    ${dateTime} - ${response.list[index].weather[0].description}, ${response.list[index].main.temp} degrees`;
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