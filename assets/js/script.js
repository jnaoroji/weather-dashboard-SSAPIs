//declare all variables
var APIKey = '33f5de6f25a252daa041266e6c88b503';
var cityInputEl = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form');
var citySearch = document.querySelector('#search-current');
var futureSearch = document.querySelector('#search-future');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');
// declare search history string and variables
var searchHistoryEl = document.querySelector('#search-history');
var searchHistory = [];
var cityName;

var historyBtn;

//on load, checks for persistant data
if (localStorage.getItem('searchHistory')) {
  searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  displaySearchHistory();
}
//click event triggers form
var formSubmitHandler = function (event) {
  event.preventDefault();
  currentWeatherEl.innerHTML = '';
  futureWeatherEl.innerHTML = '';
// uses form input to define search term and city for open weather API
  var city = cityInputEl.value.trim();
  
  if (city) {
    getCityInfo(city);
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    console.log("search history= " + searchHistory);
    displaySearchHistory();
    
    cityInputEl.value = '';

  } else {
    alert('Please enter a valid city');
  }
};
//uses open weather api to get city 5 day forecast
var getCityInfo = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+(city)+'&appid='+(APIKey)+'&units=metric';
    
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
        console.log(data);
        displayWeather(data, city);
        displayFuture(data, city);
            
        });
      } else {
          alert('Error: ' + response.statusText);
      }
      })
      .catch(function () {
        alert('Unable to connect to Open Weather');
      });
};
//displays current weather forecast 
var displayWeather = function (data) {
  if (data.length === 0) {
      currentWeatherEl.textContent = 'This city was not found.';
      return;
  }
  
  var cityName = data.city.name;
  citySearch.textContent = cityName;

  for (var i = 0; i < data.list.length; i++) {

    var dayData = data.list[0];
      
    var date = dayjs(dayData.dt * 1000);
    var dateStr = date.format('ddd, MMM D');
    var icon = "https://openweathermap.org/img/wn/" + dayData.weather[0].icon + "@2x.png";
    var desc = dayData.weather[0].description;
    var temp = dayData.main.temp;
    var humidity = dayData.main.humidity;
    var windSpeed = (dayData.wind.speed)* 3.6;
    var roundedWindSpeed = windSpeed.toFixed(1);
  
    var weatherCardEl = document.createElement('div');
    weatherCardEl.classList.add('weather-card');

    var dateEl = document.createElement('h3');
    dateEl.textContent = dateStr;
      
    var iconEl = document.createElement('img');
    iconEl.setAttribute('src', icon);
    iconEl.setAttribute('alt', dayData.weather[0].description);
   
    var descEl = document.createElement('p');
    descEl.classList.add('weather-item');
    descEl.innerHTML = 'Forecast: ' + desc;
    
    var tempEl = document.createElement('p');
    tempEl.classList.add('weather-item');
    tempEl.innerHTML = 'Temperature: ' + temp + ' &deg;C';
     
    var humidityEl = document.createElement('p');
    humidityEl.classList.add('weather-item');
    humidityEl.innerHTML = 'Humidity: ' + humidity + '%';
     
    var windEl = document.createElement('p');
    windEl.classList.add('weather-item');
    windEl.innerHTML = 'Wind Speed: ' + roundedWindSpeed + ' km/ph';
      
  
    weatherCardEl.appendChild(dateEl);
    weatherCardEl.appendChild(iconEl);
    weatherCardEl.appendChild(descEl);
    weatherCardEl.appendChild(tempEl);
    weatherCardEl.appendChild(humidityEl);
    weatherCardEl.appendChild(windEl);
      
  
    currentWeatherEl.appendChild(weatherCardEl);
    return;
  }
  
};

//displays future 5 day weather forecast at 6AM, 
//12PM means some cities are missing on the fifth day due to time zones
var displayFuture = function (data) {
  
  var cityName = data.city.name;
  futureSearch.textContent = cityName;

  for (var i = 0; i < data.list.length; i++) {

    var dayData = data.list[i];
    var today = dayjs().startOf('day');
    
    if (dayData.dt_txt.includes('06:00:00') && !dayjs(dayData.dt_txt).isSame(today, 'day')) {
    var date = dayjs(dayData.dt * 1000);

    var dateStr = date.format('ddd, MMM D');
    var icon = "https://openweathermap.org/img/wn/" + dayData.weather[0].icon + "@2x.png";
    var desc = dayData.weather[0].description;
    var temp = dayData.main.temp;
    var humidity = dayData.main.humidity;
    var windSpeed = (dayData.wind.speed)* 3.6;
    var roundedWindSpeed = windSpeed.toFixed(1);

    var dayEl = document.createElement('div');
    dayEl.classList.add('day');
    
    var dateEl = document.createElement('h3');
    dateEl.textContent = dateStr;
    dayEl.appendChild(dateEl);

    var iconEl = document.createElement('img');
    iconEl.setAttribute('src', icon);
    iconEl.setAttribute('alt', dayData.weather[0].description);
    dayEl.appendChild(iconEl);
    
    var descEl = document.createElement('p');
    descEl.classList.add('weather-item');
    descEl.innerHTML = 'Forecast: ' + desc;
    dayEl.appendChild(descEl);

    var tempEl = document.createElement('p');
    tempEl.classList.add('weather-item');
    tempEl.innerHTML = 'Temperature: ' + temp + ' &deg;C';
    dayEl.appendChild(tempEl);

    var humidityEl = document.createElement('p');
    humidityEl.classList.add('weather-item');
    humidityEl.innerHTML = 'Humidity: ' + humidity + '%';
    dayEl.appendChild(humidityEl);

    var windEl = document.createElement('p');
    windEl.classList.add('weather-item');
    windEl.innerHTML = 'Wind Speed: ' + roundedWindSpeed + ' km/ph';
    dayEl.appendChild(windEl);
    
    futureWeatherEl.appendChild(dayEl);
    }

  }
};
//displays weather forecast for each of the search history buttons
function displaySearchHistory() {
  searchHistoryEl.innerHTML = '';

  for (var i = 0; i < searchHistory.length; i++) {
    var city = searchHistory[i];

    historyBtn = document.createElement('button');
    historyBtn.classList.add('btn','search-history-item');
    historyBtn.textContent = city;
    
    searchHistoryEl.appendChild(historyBtn);
  }
}

// uses each history button as a trigger to display weather forecast
var BtnHistoryHandler = function (event) {
  event.preventDefault();
  
  var target = event.target;
  if (target.matches('button')) {
  var city = target.textContent.trim();

  currentWeatherEl.innerHTML = '';
  futureWeatherEl.innerHTML = '';
  getCityInfo(city);
  
  
  displaySearchHistory();
  
  cityInputEl.value = '';

  } else {
  alert('Please enter a valid city');
  }
   
}
//form input to search a city's weather forecast
userFormEl.addEventListener('submit', formSubmitHandler);
// button click to search a city's weather forecast based on search history
searchHistoryEl.addEventListener('click', BtnHistoryHandler);
  