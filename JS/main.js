//This function is called when the Get Weather button is clicked
//Retrieves API Key, as well as the zip entered by user (LINES 10 through 13)
//the  nested fetch() function makes a GET request which can be cached,reloaded,bookmarked, and the parameters remain in browser history unlike a POST request
      //ASK JUSTIN AND MICHAEL WHY I WOULD USE POST EVER
//the api data is converted to JSON (LINE 14)
      //JSON is text representation of JS object literals and arrays
//the JSON is sent as a variable (LINE 17) to a function(LINE 34) that relays the data pulled

//(AHA!!!! apparently divs can be created in JS and sent to HTML? Probably how you do that stretch goal)
//either way, from this (LINE 21), this new variable is sent to the weatherData div in HTML)
//23 and 24 format this into a table and "block"


function currentWeatherData() {
  var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
  var zipCode = document.getElementById("zipCodeInput").value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          var table = createWeatherTable(data);
          var weatherDataDiv = document.getElementById("weatherData");
          weatherDataDiv.innerHTML = table;
          weatherDataDiv.style.display = "block";
      })
      // .catch(error => {
      //     console.log('Error:', error);
      // });

  console.log("Zip Code:", zipCode);
}

//the function below is the function referenced with data inserted from the currentWeatherData function
//Everything in the ${data.} is the inserted parameters pulled from the API and inserted directly into the table

function createWeatherTable(data) {
  var temperatureKelvin = data.main.temp;
  var temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
  var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(1);
  //.toFixed(1) reduces the million decimals created at the end of the number
  var table = `
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">City</th>     
          <td>${data.name}</td>       
        </tr>
        <tr>
        <th scope="row">Temperature</th>
        <td>${data.main.temp} K</td>
        <td>${temperatureCelsius} °C</td>
        <td>${temperatureFahrenheit} °F</td>
    </tr>
    <tr>
        <th scope="row">Humidity</th>
        <td>${data.main.humidity} %</td>
    </tr>
    <tr>
        <th scope="row">Pressure</th>
        <td>${data.main.pressure} hPa</td>
    </tr>
    <tr>
        <th scope="row">Description</th>
        <td>${data.weather[0].description}</td>
    </tr>
</tbody>
</table>
  `;
  return table;
}

