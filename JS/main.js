//This function is called when the Get Weather button is clicked
//Retrieves API Key, as well as the zip entered by user (LINES 15 and 16)
//the  nested fetch() function makes a GET request which can be cached,reloaded,bookmarked, and the parameters remain in browser history unlike a POST request
      //ASK JUSTIN AND MICHAEL WHY I WOULD USE POST EVER 
      //Re Corey: POSTs are usually meant to be used whenever you're doing something that will alter state/data, like updating a record, or filling out a form.
      //Re Corey:Most frameworks support securing POST actions with antiforgery tokens as well, which adds security
//the api data is converted to JSON (LINE 28)
      //JSON is text representation of JS object literals and arrays
//the JSON is sent as a variable (LINE 28) to a function(LINE 49) that relays the data pulled
//(AHA!!!! apparently divs can be created in JS and sent to HTML? Probably how you do that stretch goal)

//either way, from this (LINE 29), this new variable is sent to the weatherData div in HTML)
//LINE 30  formats this into a table and also sends it to HTML?
function currentWeatherData() {
  var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
  var zipCode = document.getElementById("zipCodeInput").value;

  axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
    .then(response => {
      var data = response.data;
      //    The promise is a way to handle asynchronous operation 
          //    Asynchronous operation is a way to run programs in parallel
          //    ASK WHY THIS NEEDS TO BE ASYNC (IF IT DOES)

      //    The .then is what to do if correct,        .catch is if it catches an error
      //    IS THIS BASICALLY THE SAME AS IF, ELSE?
          var table = createWeatherTable(data);
          var weatherDataDiv = document.getElementById("weatherData");
          weatherDataDiv.innerHTML = table;

          // var h1Element = document.querySelector("h1");
          // h1Element.insertAdjacentElement("afterend", weatherDataDiv);
                    //ATTEMPT TO DISPLAY HEADER AFTER
      })
      .catch(error => {
        console.error(error);
        alert('Error retrieving weather data');
      });

  console.log("Zip Code:", zipCode);
}

//the function below is a nested function with data inserted from the currentWeatherData function
//it uses the data from the lines above it within same function
//Everything in the ${data.} is the inserted parameters pulled from the API and inserted directly into the table

//THIS ENTIRE FUNCTION IS WITHIN THE ABOVE FUNCTION WHICH IS TRIGGERED BY THE BUTTON CLICK
function createWeatherTable(data) {
  var weatherIcon = data.weather[0].icon;
    //same deal as below. Pulled from openweathers api from its own url
    //the 0 is a placeholder for each icons ID tags
  var iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
    //The url variable tied to the variable that pulls directly from the api

  var temperatureKelvin = data.main.temp;
  var temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
  var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(1);
    //.toFixed(1) reduces the million decimals created at the end of the number

    //BELOW is the table directly in created in JS
    //It's a template literal which allows me to put 
  var table = `
  <h1>WEATHER OR NOT</h1>  
  <input type="text" id="zipCodeInput" placeholder="ENTER ZIP CODE HERE">
  <button id="currentWeatherData" onclick="currentWeatherData()">Get Weather</button>
    <table class="table mt-4">
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
        <th scope="row">Condition</th>
        <td>${data.weather[0].description}</td>
          <td><img src="${iconUrl}" alt="Weather Icon"></td>

    </tr>
</tbody>
</table>
  `;
  return table;
}
//FIXED HEADER DISAPPEARING BY PUTTING IT IN THE TABLE
 

//Like, in a "real" environment, sensitive information like an API key, a connection string, etc. would be in a separate configuration file that the application reads from.
//I'm sure there are ways do that in JS as well, but that's overkill for something like this. I was just speaking in a broader sense


function init () {
  console.log("hello world")
}