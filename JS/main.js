
function currentWeatherData() {
  var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
  var zipCode = document.getElementById("zipCodeInput").value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
    .then(response => response.ok ? response.json() : Promise.reject('Invalid zip code'))
    .then(data => {
      var table = createWeatherTable(data);
      var weatherDataDiv = document.getElementById("weatherData");

      weatherDataDiv.appendChild(table);
      var header = document.createElement('h1');
      header.textContent = 'WEATHER OR NOT';
      weatherDataDiv.appendChild(header);
    })
    .catch(error => alert(error));
}
var locationButton = document.createElement('button');
locationButton.setAttribute('id', 'getLocationData');
locationButton.textContent = 'Get Location Weather';
locationButton.addEventListener('click', getLocationWeatherData);
locationButton.classList.add('btn', 'btn-lg', 'rounded-pill');
weatherDataDiv.appendChild(locationButton);
function getLocationWeatherData() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.ok ? response.json() : Promise.reject('Error fetching weather data'))
        .then(data => {
          var table = createWeatherTable(data);
          var weatherDataDiv = document.getElementById("weatherData");

          weatherDataDiv.innerHTML = '';
          weatherDataDiv.appendChild(table);
          var header = document.createElement('h1');
          header.textContent = 'WEATHER OR NOT';
          weatherDataDiv.appendChild(header);
        })
        .catch(error => alert(error));
    }, function (error) {
      alert('Error getting location: ' + error.message);
    }, {
      enableHighAccuracy: true
    });
  } else {
    alert('Geolocation is not available in your browser');
  }
}

function createWeatherTable(data) {
  var temperatureKelvin = data.main.temp;
  var temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
  var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(1);

  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  
  createRow('City :', data.name);
  createRow('Temperature :', `${data.main.temp} K`, `${temperatureCelsius} °C`, `${temperatureFahrenheit} °F`);
  createRow('Humidity :', `${data.main.humidity} %`);
  createRow('Pressure :', `${data.main.pressure} hPa`);
  createRow('Condition :', data.weather[0].description, createWeatherIcon(data.weather[0].icon));

  table.appendChild(tbody);

  table.classList.add('table', 'mt-4');

  var header = document.createElement('h1');
  header.textContent = 'WEATHER OR NOT';
  header.classList.add('display-4');
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'zipCodeInput');
  input.setAttribute('placeholder', 'ENTER ZIP CODE HERE');
  input.classList.add('btn' ,'btn-lg', 'rounded-pill')

  var button = document.createElement('button');
  button.setAttribute('id', 'currentWeatherData');
  button.textContent = 'Get Weather';
  button.addEventListener('click', currentWeatherData);
  button.classList.add('btn' ,'btn-lg', 'rounded-pill')

  var weatherDataDiv = document.getElementById('weatherData');
  weatherDataDiv.innerHTML = ''; 
  weatherDataDiv.appendChild(header);
  weatherDataDiv.appendChild(input);
  weatherDataDiv.appendChild(button);
  weatherDataDiv.appendChild(locationButton);

  weatherDataDiv.appendChild(table);

  return table;


  function createRow(label, ...values) {
    var row = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = label;
    row.appendChild(th);
  
    var temperatureCell = document.createElement('td');
    values.forEach((value, index) => {
      if (value instanceof Element) {
        temperatureCell.appendChild(value);
        temperatureCell.classList.add('temperature-cell');
      } else {
        if (index !== 0) {
          // learned about non breaking spaces
          temperatureCell.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        temperatureCell.textContent += value;
      }
    });
  
    row.appendChild(temperatureCell);
    tbody.appendChild(row);
  }

  function createWeatherIcon(icon) {
    var iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    var img = document.createElement('img');
    img.setAttribute('src', iconUrl);
    img.setAttribute('alt', 'Weather Icon');
    return img;
  }
}