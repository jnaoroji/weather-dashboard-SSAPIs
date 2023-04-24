
var APIKey = '33f5de6f25a252daa041266e6c88b503';
var city;
var cityInputEl = document.querySelector('#city');
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var userFormEl = document.querySelector('#user-form');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearch = document.querySelector('#search-bar');


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

      
      var DescEl = document.createElement('p');
      DescEl.classList.add('weather-item');
      DescEl.innerHTML = 'Forecast: ' + desc;
  

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
      weatherCardEl.appendChild(DescEl);
      weatherCardEl.appendChild(tempEl);
      weatherCardEl.appendChild(humidityEl);
      weatherCardEl.appendChild(windEl);
  
      weatherContainerEl.appendChild(weatherCardEl);
      return;
    }
  };
  

  userFormEl.addEventListener('submit', formSubmitHandler);