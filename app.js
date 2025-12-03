/* 
  File: app.js
  Author: Lawin Khalil and Zeljka Zujic
  Date: 3 December 2025
  Purpose: Weather Forecast App using OpenWeatherMap API
  Description: Fetch and display current weather and 5-day forecast using vanilla JavaScript
*/

/* 
Information on OpenWeatherMap API

The link for the acquiring the weather API is the following: https://openweathermap.org/api
The web application offers features for Current Weather API: /weather.
In addition, it also offers features for a 5-Day Forecast API: /forecast. 
*/

// ========== Setup ==========
/* 
NOTE: API key is now stored securely in the backend server.
For local testing: http://localhost:3000/api
For production: Replace with your Render backend URL after deployment
*/

const API_BASE_URL = "http://localhost:3000/api"; // Variable declaration and main URL for backend API proxy.

// ========== Global State ==========
/* This section contains the variables that are accessible across the weather forecast web application. */
let currentUnit = "metric"; // Variable declaration for temperature units where 'metric' is for Celsius and 'imperial' is for Fahrenheit. We are using 'metric'.
let lastSearchedCity = ""; // This variable stores the last searched city made by the user. Initially, there is nothing due to the empty string value.


// ========== DOM Elements ==========
/* 
Here we "grab" or "find" all the HTML elements we need to work with. By storing them in variables, we don't have to search 
for them over and over again. Basically, we get references to HTML elements using querySelector.
https://www.w3schools.com/jsref/met_document_queryselector.asp
*/

const cityInput = document.querySelector("#cityInput"); // Input field for city name
const searchBtn = document.querySelector("#searchBtn"); // Search button
const locationBtn = document.querySelector("#locationBtn"); // Geolocation button
const unitToggle = document.querySelector("#unitToggle"); // Checkbox for unit toggle
const unitLabel = document.querySelector("#unitLabel"); // Label showing current unit
const statusMessage = document.querySelector("#statusMessage"); // Status message container such as "City not found" or "Weather data loaded"...
const currentWeatherSection = document.querySelector("#currentWeatherSection"); // Current weather section
const currentWeather = document.querySelector("#currentWeather"); // Current weather card container
const forecastSection = document.querySelector("#forecastSection"); // Forecast section
const forecast = document.querySelector("#forecast"); // Forecast cards container
const loadingSpinner = document.querySelector("#loadingSpinner"); // Loading spinner


// ========== Event Listeners ==========

// This adds a click event to the search button. When the button is clicked, the handleSearch function runs.
searchBtn.addEventListener("click", handleSearch);

// This one adds a keypress event to input field (search on Enter key)
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Checks if Enter key was pressed by the user
    handleSearch(); // Triggers the search or function "handleSearch" for getting the city name from the input field.
  }
});

// This one adds click event to geolocation button "My location".
locationBtn.addEventListener("click", handleGeolocation);

// Add change event to unit toggle switching between the metric (Celsius) and imperial (Fahrenheit)
unitToggle.addEventListener("change", handleUnitToggle);

// ========== Main Functions ==========

// The below function handles search button click which validates input and initiates the weather data fetch
function handleSearch() {
  const city = cityInput.value.trim(); // Get the city name from user input

  // Validation: Here it checks if city name is provided and if it is not provided, error message is displayed.
  if (!city) {
    // If statement for if the input is empty
    showStatus("Please enter a city name.", "error"); // Show error message if no city name inserted before click
    return; // Stops the execution
  }

  lastSearchedCity = city; // Stores city namee for later use
  fetchWeatherData(city); // Calls the function to get weather data
}

/*
 This has the function which handles the GEOLOCATION button click. 
 It uses browser's Geolocation API to get current position where the user lives or is situated at.
 */
function handleGeolocation() {
  // Geolocation handler
  // Check if browser supports geolocation
  if (!navigator.geolocation) {
    // If statement for when geolocation is not available or supported
    showStatus("Geolocation is not supported by your browser.", "error"); // Shows error message
    return; // Stops the execution
  }

  showStatus("Getting your location...", "info"); // This shows loading message of getting your location
  showLoading(true); // Shows the laoding spinner

  // Here it makes a request to fetch the current position from browser
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // When the position is successfully retrieved
      const lat = position.coords.latitude; // It gets the latitude
      const lon = position.coords.longitude; // Also gets the longitude
      fetchWeatherByCoords(lat, lon); // Then proceeds to fetch weather using the coordinates
    },
    // However, if it is unable to get that, there is an errror displayed
    function (error) {
      // When can't get the position or it fails
      showLoading(false); // Hides the loading spinner
      showStatus("Unable to retrieve your location. " + error.message, "error"); // Shows this error message "Unable to retrieve..."
    }
  );
}

/*
 This function handles temperature UNIT TOGGLE (from Celsius to Fahrenheit and vice versa)
 It is called whenever the user toggles the switch button. 
 It remembers which unit (C or F) is currently selected.
 */
function handleUnitToggle() {
  // Starting the function
  // Checks if the toggle or checkbox is on or off
  // If it's on, then sets the unit to C, otherwise it sets it to F
  currentUnit = unitToggle.checked ? "metric" : "imperial";

  // Updates text label next to toggle switch to show the current unit
  // That way the user knows which unit is active
  // Ternary operator used here to simplify the code. Source: https://www.w3schools.com/js/js_if_ternary.asp
  unitLabel.textContent =
    currentUnit === "metric"
      ? "Celsius (°C)" // Shows Celsius label
      : "Fahrenheit (°F)"; // Shows Fahrenheit label

  // This runs if user has already searched for the city and then changed temperature unit
  // That way, the app will automatically re-fetch weather data without user typing the city again
  if (lastSearchedCity) {
    // Re-fetchs the weather data for the same city but uses the new unit
    fetchWeatherData(lastSearchedCity); // The temperature info is updated
  }
}

/*
 This asynchronous function fetches WEATHER DATA BY CITY name
 It calls both current weather and forecast APIs
*/
async function fetchWeatherData(city) { // Function starts
  // Hiding weather data from previous search
  currentWeatherSection.classList.add("hidden"); // Hides current weather section
  forecastSection.classList.add("hidden"); // Hides the forecast section 
  showLoading(true); // Shows the spinner 
  showStatus("Loading weather data...", "info"); //Shows the message to the useer that data is loading 

  // Try and catch block is used for catching errors 
  try { // Creates the URL to ask the backend API proxy for weather data based on city name and selected temperature unit 
    const currentWeatherUrl = `${API_BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&units=${currentUnit}`; 
    const forecastUrl = `${API_BASE_URL}/forecast?q=${encodeURIComponent(
      city
    )}&units=${currentUnit}`; 

    // Fetches both APIs at the same time 
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl), // Gets current weather
      fetch(forecastUrl), // Gets 5 day forecast
    ]);

    // Checks if the responses are ok
    if (!currentResponse.ok || !forecastResponse.ok) {
      
      const errorData = await currentResponse.json(); // reads an error message from API 
      throw new Error(
        errorData.message || "City not found. Please check the city name." // Stops and shows the error
      ); 
    }

    // Parses the JSON data from the response - converts JSON response from API to JavaScript object
    const currentData = await currentResponse.json(); // Weather info
    const forecastData = await forecastResponse.json(); // Forecst info

    // Displays the data in the user interface
    displayCurrentWeather(currentData); // Updates weather section
    displayForecast(forecastData); // Updates forecast section

    showLoading(false); // Hides the spinner 
    showStatus(
      `Weather data for ${currentData.name}, ${currentData.sys.country}`,
      "success" // Shows success message 
    ); 

  } catch (error) { // If any error occurs
    showLoading(false); // Hides spinner
    showStatus(`Error: ${error.message}`, "error"); // Shows error to user
    console.error("Weather fetch error:", error); // Logs error to console for debugging 
  }
}

/*
 This asynchronous function fetches weather data based on user's GEOLOCATION.
 It displays both the current weather and 5 day forecast for that location. 
 It uses 2 important information - latitude and longitude!
 Based on the coordinates, the function gets the weather of the specified location.
 */
async function fetchWeatherByCoords(lat, lon) {

  // Try and catch block
  try {
    // Creates URL for the backend API proxy using latitude and longitude 
    const currentWeatherUrl = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${currentUnit}`; 
    const forecastUrl = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${currentUnit}`; 

    // Asks both APIs at the same time for data 
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl), // Fetches current weather
      fetch(forecastUrl), // Fetches forecast
    ]);

    // Checks if responses are ok
    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Unable to fetch weather data for your location."); // Throws an error if either API response is unsuccessful
    }

    // Parses responses (converts JSON responses into JS objects)
    const currentData = await currentResponse.json(); // Parses current weather
    const forecastData = await forecastResponse.json(); // Parses forecast

    // Saves the city name so that it can be reused later
    lastSearchedCity = currentData.name; // Saves city name
    cityInput.value = currentData.name; // Updates input field

    // Shows the weather data on the page 
    displayCurrentWeather(currentData); // Shows current weather
    displayForecast(forecastData); // Shows forecast

    showLoading(false); // Hides spinner because data fetching is finished
    showStatus(
      `Weather data for your location: ${currentData.name}, ${currentData.sys.country}`,
      "success"
    ); // Shows success message to the user 

  } catch (error) { // If any errors occur during fetching, the function is stopped

    showLoading(false); // Hides spinner because loading is stopped when error occurs
    showStatus(`Error: ${error.message}`, "error"); // Displays error message 
    console.error("Geolocation weather fetch error:", error); // Logs error to console for debugging
  }
}

/*
 The function that display CURRENT WEATHER DATA in UI
 It takes the weather data from API and updates the upage with information such as:
 - temperature and feel-like temparature
 - weather description
 - humidity
 - wind speed
 - pressure etc.
 */
function displayCurrentWeather(data) {
  // Extract key information from API 
  const temp = Math.round(data.main.temp); // Rounds the temperature to nearest whole number
  const feelsLike = Math.round(data.main.feels_like); // Rounds "feels like" temperature
  const description = data.weather[0].description; // Short weather description ("clear sky", "broken clouds" etc)
  const icon = data.weather[0].icon; // Icon code for the weather
  const humidity = data.main.humidity; // Humidity percentage
  const windSpeed = data.wind.speed; // Wind speed
  const pressure = data.main.pressure; // Atmospheric pressure
  const visibility = (data.visibility / 1000).toFixed(1); // Converts visibility from meters to kilometers and then rounds to 1 decimal
  const cityName = data.name; // Name of the city
  const country = data.sys.country; // Country code
  const unitSymbol = currentUnit === "metric" ? "°C" : "°F"; // Temperature unit symbol (Celsius or Fahrenheit)
  const windUnit = currentUnit === "metric" ? "m/s" : "mph"; // Wind speed unit (m/s or mph)

  // Build HTML content to show weather info
  // Creates card for curent weather
  // HTML template filled with the weather info
  const html = `
        <div class="weather-main">
            <div class="weather-icon-container">
                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}" class="weather-icon">
            </div>
            <div class="weather-info">
                <h3>${cityName}, ${country}</h3>
                <div class="temperature">${temp}${unitSymbol}</div>
                <div class="condition">${description}</div>
                <div class="feels-like">Feels like ${feelsLike}${unitSymbol}</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <div class="detail-label">💧 Humidity</div>
                <div class="detail-value">${humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">💨 Wind Speed</div>
                <div class="detail-value">${windSpeed} ${windUnit}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">🌡️ Pressure</div>
                <div class="detail-value">${pressure} hPa</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">👁️ Visibility</div>
                <div class="detail-value">${visibility} km</div>
            </div>
        </div>
    `;

  // Page gets updated with the weather info
  currentWeather.innerHTML = html; // Puts the HTML inside weather container element
  currentWeatherSection.classList.remove("hidden"); // Makes sure the weather section is visible
}

/*
 The function that displays a 5 DAY FORECAST on the webpage.
 Uses forecast data from the API to shows:
 - one forecast per day, around noon
 - date, temperature, weather description, wether icon
 - humidity and wind speed
*/
function displayForecast(data) {
  // Setting up variables to filter forecast data
  // instead of detailed forecast (in 3h intervals) we need only one forecast per day (around noon)
  const dailyForecasts = []; // Array to store daily forecasts
  const processedDates = new Set(); // Keeps track of which dates we have already added

  // Loops through all forecast items from the API
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000); // Converts Unix timestamp to JavaScript Date
    const dateString = date.toDateString(); // Converts dates to readable strings. Sources: https://www.geeksforgeeks.org/javascript/how-to-convert-unix-timestamp-to-time-in-javascript , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString

    // Only picks one forecast per day (around noon)
    if (
      !processedDates.has(dateString) && // Skips if the date is already added
      date.getHours() >= 11 &&
      date.getHours() <= 13
    ) {
      processedDates.add(dateString); // Marks this date as processed
      dailyForecasts.push(item); // Adds forecast to he array
    }
  });

  // Limits forecasts to 5 days
  const fiveDayForecasts = dailyForecasts.slice(0, 5); // Takes only the first 5 days

  // Prepares units for display (for temperature and wind speed)
  const unitSymbol = currentUnit === "metric" ? "°C" : "°F"; // Temperature unit (C or F)
  const windUnit = currentUnit === "metric" ? "m/s" : "mph"; // Wind unit (m/s or mph)

  // Builds HTML for each forecast card
  const html = fiveDayForecasts
    .map((item) => {
      const date = new Date(item.dt * 1000); // Converts timestamp to date
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short", // Short day name
        month: "short", // Short month name
        day: "numeric", // Day of the month, number
      }); 
      const temp = Math.round(item.main.temp); // Rounds temperature to the closest whole number
      const description = item.weather[0].description; // Short weather description
      const icon = item.weather[0].icon; // Icon code
      const humidity = item.main.humidity; // Humidity
      const windSpeed = item.wind.speed; // Wind speed

      // Return HTML for one forecast card 
      return `
            <div class="forecast-card">
                <div class="forecast-date">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="forecast-icon">
                <div class="forecast-temp">${temp}${unitSymbol}</div>
                <div class="forecast-condition">${description}</div>
                <div class="forecast-details">
                    💧 ${humidity}%<br>
                    💨 ${windSpeed} ${windUnit}
                </div>
            </div>
        `; 
    })
    .join(""); // Combines all forecast cards into one HTML string

  // Updates the page with the 5-day forecast info (Insert HTML into DOM)
  forecast.innerHTML = html; // Inserts the forecast cards into the container
  forecastSection.classList.remove("hidden"); // Make the forecast section visible
}

// ========== Utility Functions ==========

/*
 Function used to show STATUS MESSAGE to user
 Message type: 
 - 'info' for useful information
 - 'error' for different types of issues
 - 'success' if weather data is fetched successfully and displayed to user
 */
function showStatus(message, type) {
  statusMessage.textContent = message; // Puts message text into status message element on the page
  statusMessage.className = `status-message ${type}`; // Applies the CSS class so that the message gets the right color/style
}

/*
 Function used to show or hide the LOADING SPINNER on the page
 Used while the app is waiting for data from API 
 */
function showLoading(show) {
  // Checks weather the spinner should be shown or hidden
  if (show) {
    loadingSpinner.classList.remove("hidden"); // Makes the spinner visible by removing the hidden CSS class
  } else {
    loadingSpinner.classList.add("hidden"); // Hides the spinner by adding hidden CSS class
  }
}

// ========== Initialization ==========

/*
 INITIALIZES the weather app on page load
 Checks if the user has entered the API key and prepared the UI
 */
function init() {
  console.log("Weather Forecast App initialized"); // Logs a message in the console for debugging purpose

  cityInput.focus(); // Automatically places cursor in the search box for faster input
}

// Runs initialization once the HTML is fully loaded
document.addEventListener("DOMContentLoaded", init);

// ========== Error Handling ==========

window.addEventListener("error", function (event) { // Catches any unexpected errors that occur anywhere in the app
  console.error("Global error:", event.error); // Logs error details in the console for debugging
  showStatus("An unexpected error occurred. Please try again.", "error"); // Shows user-friendly message so that user knows what is going on
});

// ========== End of app.js ==========