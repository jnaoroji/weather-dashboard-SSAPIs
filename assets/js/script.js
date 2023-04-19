var APIKey = "33f5de6f25a252daa041266e6c88b503";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)