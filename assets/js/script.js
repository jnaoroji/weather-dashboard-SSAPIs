var APIKey = '33f5de6f25a252daa041266e6c88b503';
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = cityInputEl.value.trim();
    console.log("city is: " + city);
  
    if (city) {
      getUserRepos(city);
  
      repoContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city');
    }
  };

  var getUserRepos = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+(city)+'&appid='+(APIKey);
    
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data, user);
            displayRepos(data, user);
            
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Open Weather');
      });
  };