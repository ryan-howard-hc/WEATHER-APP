
function currentWeatherData() {
    var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
    var zipCode = document.getElementById("zipCodeInput").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`).then(response => response.ok ? response.json() : Promise.reject('Invalid zip code')).then(data => {
        var table = createWeatherTable(data);
        var weatherDataDiv = document.getElementById("weatherData");

        weatherDataDiv.appendChild(table);
        var header = document.createElement('h1');

        header.textContent = 'WEATHER OR NOT';
        weatherDataDiv.appendChild(header);
    }).catch(error => alert(error));
}






function getLocationWeatherData() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`).then(response => response.ok ? response.json() : Promise.reject('Error fetching weather data')).then(data => {
                var table = createWeatherTable(data);
                var weatherDataDiv = document.getElementById("weatherData");
                var input = document.createElement('input');
                input.style.fontFamily = 'KungFu';
                input.style.letterSpacing = '3px',
                input.style.fontWeight = 'bold';
                input.style.marginBottom='10px';
                input.setAttribute('type', 'text');
                input.setAttribute('id', 'zipCodeInput');
                input.setAttribute('placeholder', 'ENTER ZIP CODE HERE');
                input.classList.add('btn', 'btn-lg', 'rounded-pill')
            
                var button = document.createElement('button');
                button.setAttribute('id', 'currentWeatherData');
                button.textContent = 'Get Weather';
                button.addEventListener('click', currentWeatherData);
                button.style.backgroundColor = '#3498db';
                button.style.color = '#fff';
                button.style.marginBottom = '10px';
                button.style.fontFamily = 'ChrustyRock';
                button.classList.add('btn', 'btn-lg', 'rounded-pill')
                weatherDataDiv.innerHTML = '';
                weatherDataDiv.appendChild(input);
                weatherDataDiv.appendChild(button);
                weatherDataDiv.appendChild(table);
               
                
                var header = document.createElement('h1');
                header.style.borderBottom = '2px solid black';

                header.textContent = 'WEATHER OR NOT';
                weatherDataDiv.appendChild(header);
            }).catch(error => alert(error));
        }, function (error) {
            alert('Error getting location: ' + error.message);
        }, {enableHighAccuracy: true});
    } else {
        alert('Geolocation is not available in your browser');
    }
    
}
function getWindDirection(degrees) {
  const directions = ['North', 'North-Northeast', 'Northeast', 'East-Northeast', 'East', 'East-Southeast', 'Southeast', 'South-Southeast', 'South', 'South-Southwest', 'Southwest', 'West-Southwest', 'West', 'West-Northwest', 'Northwest', 'North-Northwest'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
function createWeatherTable(data) {
    var temperatureKelvin = data.main.temp;
    var temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
    var temperatureFahrenheit = ((temperatureCelsius * 9 / 5) + 32).toFixed(1);

    var table = document.createElement('table');
    table.style.fontFamily = 'KungFu';
    table.style.fontWeight = 'bold';
    table.style.letterSpacing = '5px';
    table.style.backgroundColor = 'rgba(127, 255, 212, 0.1)';

    var tbody = document.createElement('tbody');

    createRow('City :', data.name);
    createRow('Temperature :', `${
        data.main.temp
    } K`, `${temperatureCelsius} °C`, `${temperatureFahrenheit} °F`);
    createRow('Humidity :', `${
        data.main.humidity
    } %`);
    createRow('Pressure :', `${
        data.main.pressure
    } hPa`);
    createRow('Condition :', data.weather[0].description, createWeatherIcon(data.weather[0].icon));
    createRow('Wind Speed :', `${data.wind.speed} m/s`);
    const windDirection = getWindDirection(data.wind.deg);

    createRow('Wind Direction :', `${data.wind.deg}° (${windDirection})`);


    table.appendChild(tbody);

    table.classList.add('table', 'mt-4');

    var header = document.createElement('h1');
    header.textContent = 'WEATHER OR NOT';
    header.style.borderBottom = '2px solid black';

  
    var input = document.createElement('input');
    input.style.fontFamily = 'KungFu';
    input.style.letterSpacing = '3px',
    input.style.fontWeight = 'bold';
    input.style.marginBottom='10px';

    input.setAttribute('type', 'text');
    input.setAttribute('id', 'zipCodeInput');
    input.setAttribute('placeholder', 'ENTER ZIP CODE HERE');
    input.classList.add('btn', 'btn-lg', 'rounded-pill')

    var button = document.createElement('button');
    button.setAttribute('id', 'currentWeatherData');
    button.textContent = 'Get Weather';
    button.addEventListener('click', currentWeatherData);
    button.style.backgroundColor = '#3498db';
    button.style.color = '#fff';
    button.style.marginBottom = '10px';
    button.style.fontFamily = 'ChrustyRock';
    button.classList.add('btn', 'btn-lg', 'rounded-pill')

    var weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = '';
    weatherDataDiv.appendChild(header);
    weatherDataDiv.appendChild(input);
    weatherDataDiv.appendChild(button);

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
                    temperatureCell.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;';
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
