// Global variables
let searchHistory = [];
const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

// DOM element references
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const todayContainer = document.querySelector('#today');
const forecastContainer = document.querySelector('#forecast');
const searchHistoryContainer = document.querySelector('#history');

// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Function to display the search history list.
function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';

  // Start at end of history array and count down to show the most recent at the
  // top.
  for (let i = searchHistory.length - 1; i >= 0; i--) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');

    // `data-search` allows access to city name when click handler is invoked
    btn.setAttribute('data-search', searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}

// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
  // If there is no search term return the function
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
  const storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}

// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather, timezone) {
  const date = dayjs().tz(timezone).format('M/D/YYYY');

  // Store response data from our fetch request in variables
  const tempF = weather.temp;
  const windMph = weather.wind_speed;
  const humidity = weather.humidity;
  const uvi = weather.uvi;
  const iconUrl =
    'https://openweathermap.org/img/w/' + weather.weather[0].icon + '.png';

  // use description. use main as fallback if no description
  const iconDescription = weather.weather[0].description || weather[0].main;

  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const heading = document.createElement('h2');
  const weatherIcon = document.createElement('img');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');
  const uvEl = document.createElement('p');
  const uviBadge = document.createElement('button');

  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);

  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  heading.textContent = city + '(' + date + ')';
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = 'Temp: ' + tempF + '°F';
  windEl.textContent = 'Wind: ' + windMph + ' MPH';
  humidityEl.textContent = 'Humidity: ' + humidity + ' %';
  cardBody.append(heading, tempEl, windEl, humidityEl);

  uvEl.textContent = 'UV Index: ';
  uviBadge.classList.add('btn', 'btn-sm');

  if (uvi < 3) {
    uviBadge.classList.add('btn-success');
  } else if (uvi < 7) {
    uviBadge.classList.add('btn-warning');
  } else {
    uviBadge.classList.add('btn-danger');
  }

  uviBadge.textContent = uvi;
  uvEl.append(uviBadge);
  cardBody.append(uvEl);

  todayContainer.innerHTML = '';
  todayContainer.append(card);
}

// Function to display a forecast card given an object from open weather api
// daily forecast.
function renderForecastCard(forecast, timezone) {
  // variables for data from api
  const unixTs = forecast.dt;
  const iconUrl =
    'https://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';
  const iconDescription = forecast.weather[0].description;
  const tempF = forecast.temp.day;
  const humidity = forecast.humidity;
  const windMph = forecast.wind_speed;

  // Create elements for a card
  const col = document.createElement('div');
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const weatherIcon = document.createElement('img');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute('class', 'col-md');
  col.classList.add('five-day-card');
  card.setAttribute('class', 'card bg-primary h-100 text-white');
  cardBody.setAttribute('class', 'card-body p-2');
  cardTitle.setAttribute('class', 'card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  // Add content to elements
  cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = 'Temp: ' + tempF + ' °F';
  windEl.textContent = 'Wind: ' + windMph + ' MPH';
  humidityEl.textContent = 'Humidity: ' + humidity + ' %';

  forecastContainer.append(col);
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast, timezone) {
  // Create unix timestamps for start and end of 5 day forecast
  const startDt = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
  const endDt = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();

  const headingCol = document.createElement('div');
  const heading = document.createElement('h4');

  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);

  forecastContainer.innerHTML = '';
  forecastContainer.append(headingCol);
  for (let i = 0; i < dailyForecast.length; i++) {
    // The api returns forecast data which may include 12pm on the same day and
    // always includes the next 7 days. The api documentation does not provide
    // information on the behavior for including the same day. Results may have
    // 7 or 8 items.
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      renderForecastCard(dailyForecast[i], timezone);
    }
  }
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
function fetchWeather(location) {
  const lat = location.lat;
  const lon = location.lon;
  const city = location.name;
  const apiUrl =
    ' https://api.openweathermap.org/data/2.5/onecall?lat=' +
    lat +
    '&lon=' +
    lon +
    '&units=imperial&exclude=minutely,hourly&appid=' +
    weatherApiKey;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  const apiUrl =
    weatherApiRootUrl +
    '/geo/1.0/direct?q=' +
    search +
    '&limit=5&appid=' +
    weatherApiKey;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function handleSearchFormSubmit(e) {
  // Don't continue if there is nothing in the search form
  if (!searchInput.value) {
    return;
  }

  e.preventDefault();
  const search = searchInput.value.trim();
  fetchCoords(search);
  searchInput.value = '';
}

function handleSearchHistoryClick(e) {
  // Don't do search if current elements is not a search history button
  if (!e.target.matches('.btn-history')) {
    return;
  }

  const btn = e.target;
  const search = btn.getAttribute('data-search');
  fetchCoords(search);
}

initSearchHistory();
document.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);