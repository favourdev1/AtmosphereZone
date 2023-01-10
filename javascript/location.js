cityName = document.getElementById("cityName");
weatherCondition = document.getElementById("weatherCondition");
let weatherImg = document.getElementById("weatherImg"); //Get the image element
tempMin = document.getElementById("tempMin");
tempMax = document.getElementById("tempMax");
degree = document.getElementById("degree");
feelsLike = document.getElementById("feelsLike");
wind = document.getElementById("wind");
humidity = document.getElementById("humidity");
pressure = document.getElementById("pressure");

let form = document.getElementById("weather-form");

GetCity();

// get current city first
function GetCity() {
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      var city = data.city;
      var country_name = data.country_name;
      var country_code = data.country_code;
      cityName.innerHTML = city + ", " + country_name;

      GetWeather(city, country_code);
    });
}

// run request for weather condition
function GetWeather(city, country_code = "") {
  if (country_code != "") {
    country_code = "," + country_code;
  }

  var Request =
    `http://api.openweathermap.org/data/2.5/weather?q=` +
    city +
    country_code +
    `&appid=65b76bb90b435078a3c4f47765081f16&units=metric`;
  fetch(Request)
    .then((response) => response.json())
    .then((dataResponse) => {
      weatherCondition.innerHTML =
        dataResponse.weather[0].description.toUpperCase();
      temp = dataResponse.main.temp;
      temp_min = dataResponse.main.temp_min;
      temp_max = dataResponse.main.temp_max;
      windSpeed = dataResponse.wind.speed;
      humidityvar = dataResponse.main.humidity;
      pressureVar = dataResponse.main.pressure * 0.0145037738;

      degree.innerHTML = temp.toFixed(1) + "&deg;c";
      tempMax.innerHTML = temp_max + "&deg;c";
      tempMin.innerHTML = temp_min + "&deg;c";
      wind.innerHTML = windSpeed + "m/s";
      pressure.innerHTML = pressureVar.toFixed(2) + "ATM";
      humidity.innerHTML = humidityvar + "%";
      feelsLike.innerHTML =
        "Feels like its " + dataResponse.main.feels_like + "&deg;c";
      weatherConditionMain = dataResponse.weather[0].main.toLowerCase();
      console.log(weatherConditionMain);
      switch (weatherConditionMain) {
        case "drizzel":
          weatherImg.src = "img/drizzel.png";
          break;

        case "clouds":
          weatherImg.src = "img/rain_cloud.png";
          break;

        case "rain":
          weatherImg.src = "img/rain.png";
          break;

        case "snow":
          weatherImg.src = "img/snow.png";
          break;
        case "thunderstorm":
          weatherImg.src = "img/thunderstorm.png";
          break;

        default:
          weatherImg.src = "img/sunny.png";

          break;
      }
    });
}
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the form from submitting

  let formData = new FormData(form); // create a FormData object from the form
  GetWeather(formData.get("location"));
});
