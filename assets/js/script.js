
var APIKey = '33f5de6f25a252daa041266e6c88b503';
var city;
var cityInputEl = document.querySelector('#city');
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var userFormEl = document.querySelector('#user-form');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearch = document.querySelector('#search-current');
var futureSearch = document.querySelector('#search-future');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();
  

  if (city) {
    getCityInfo(city);

    weatherContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a valid city');
  }
};

  var getCityInfo = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+(city)+'&appid='+(APIKey)+'&units=metric';
    
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

  var displayWeather = function (data) {
    if (data.length === 0) {
      weatherContainerEl.textContent = 'This city was not found.';
      return;
    }
    var cityName = data.city.name;
    citySearch.textContent = cityName;


    weatherContainerEl.innerHTML = '';
  
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
  
  userFormEl.addEventListener('submit', formSubmitHandler);