import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service';

// Business Logic

function getAPIData(location) {
  WeatherService.getWeather(location)
    .then(function(weatherResponse) {
      if (weatherResponse instanceof Error) {
        const errorMessage = `there was a problem accessing the weather data from OpenWeather API for ${location}: 
        ${weatherResponse.message}`;
        throw new Error(errorMessage);
      }
      const description = weatherResponse.weather[0].description;
      printWeather(weatherResponse, location);
      return GiphyService.getGif(description);
    })
    .then(function(giphyResponse) {
      if (giphyResponse instanceof Error) {
        const errorMessage = `there was a problem accessing the gif data from Giphy API:
        ${giphyResponse.message}.`;
        throw new Error(errorMessage);
      }
      displayGif(giphyResponse, location);
    })
    .catch(function(error) {
      printError(error);
    });
}

// async function getFutureWeather(location) {
//   const response = await WeatherService.getFutureWeather(location);
//   if (response.list) {
//     printFutureWeather(response);
//   } 
//   else {
//     printError(response, location);
//   }
// }

// UI Logic

function printError(error) {
  document.querySelector('#error').innerText = error;
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

function displayGif(response, city) {
  const url = response.data[0].images.downsized.url;
  const img = document.createElement('img');
  img.src = url;
  img.alt = `${city} weather`;
  document.querySelector('#gif').append(img);
}

function clearResults() {
  document.querySelector('#gif').innerText = null;
  document.querySelector('#error').innerText = null;
  document.querySelector('#showResponse').innerText = null;
}

// function printFutureWeather(response) {
//   let output = '';
//   for (let index = 0; index < 8; index++) {
//     let dateTime =  new Date((response.list[index].dt_txt));
//     dateTime = dateTime.valueOf() + (response.city.timezone * 1000);
//     dateTime = new Date(dateTime).toTimeString();
//     dateTime = dateTime.slice(0, 5);
//     output = `${output}
//     ${dateTime} - ${response.list[index].weather[0].description}, ${response.list[index].main.temp} degrees`;
//   }
//   document.querySelector('#showFutureWeather').innerText = `24-hour forecast: ${output}`;
// }

function handleFormSubmission(event) {
  event.preventDefault();
  clearResults();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getAPIData(location);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});