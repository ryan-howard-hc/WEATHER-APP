//This function is called when the Get Weather button is clicked
//Retrieves API Key, as well as the zip entered by user (LINES 14 and 15)
//the  nested fetch() function makes a GET request which can be cached,reloaded,bookmarked, and the parameters remain in browser history unlike a POST request
      //ASK JUSTIN AND MICHAEL WHY I WOULD USE POST EVER
//the api data is converted to JSON (LINE 27)
      //JSON is text representation of JS object literals and arrays
//the JSON is sent as a variable (LINE 27) to a function(LINE 48) that relays the data pulled

//(AHA!!!! apparently divs can be created in JS and sent to HTML? Probably how you do that stretch goal)

//either way, from this (LINE 28), this new variable is sent to the weatherData div in HTML)
//LINE 29  formats this into a table and also sends it to HTML?
// function currentWeatherData() {
//   var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
//   var zipCode = document.getElementById("zipCodeInput").value;

//   fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
//   .then(response => response.ok ? response.json() : Promise.reject('Invalid zip code'))
//       // ^ ABOVE added boolean TRUE/FALSE using ? whether the response is valid or not
//       //    The promise is a way to handle asynchronosu operation

//       //    Asynchronous operation is a way to run programs in parallel]
//       //    ASK WHY THIS NEEDS TO BE ASYNC (IF IT DOES)
//       //    The .then is what to do if correct, .catch is if it catches an error
//       //    IS THIS BASICALLY THE SAME AS IF, ELSE?
//   .then(data => {
//           var table = createWeatherTable(data);
//           var weatherDataDiv = document.getElementById("weatherData");
//           weatherDataDiv.innerHTML = table;

//           // var h1Element = document.querySelector("h1");
//           // h1Element.insertAdjacentElement("afterend", weatherDataDiv);
//                     //ATTEMPT TO DISPLAY HEADER AFTER

//       })
//       .catch(error => alert(error));
//       //    Added an alert to the .catch

//   console.log("Zip Code:", zipCode);
// }


// //the function below is a nested function with data inserted from the currentWeatherData function
// //it uses the data from the lines above it within same function
// //Everything in the ${data.} is the inserted parameters pulled from the API and inserted directly into the table

// //THIS ENTIRE FUNCTION IS WITHIN THE ABOVE FUNCTION WHICH IS TRIGGERED BY THE BUTTON CLICK
// function createWeatherTable(data) {
//   var weatherIcon = data.weather[0].icon;
//     //same deal as below. Pulled from openweathers api from its own url
//     //the 0 is a placeholder for each icons ID tags
//   var iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
//     //The url variable tied to the variable that pulls directly from the api

//   var temperatureKelvin = data.main.temp;
//   var temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
//   var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(1);
//     //.toFixed(1) reduces the million decimals created at the end of the number
    
//     //BELOW is the table directly in created in JS
//     //T
//     //It's a template literal which allows me to put 
//   var table = `
//   <h1>WEATHER OR NOT</h1>  
//   <input type="text" id="zipCodeInput" placeholder="ENTER ZIP CODE HERE">
//   <button id="currentWeatherData" onclick="currentWeatherData()">Get Weather</button>
//     <table class="table mt-4">
//       <tbody>
//         <tr>
//           <th scope="row">City</th>     
//           <td>${data.name}</td>       
//         </tr>
//         <tr>
//         <th scope="row">Temperature</th>
//         <td>${data.main.temp} K</td>
//         <td>${temperatureCelsius} °C</td>
//         <td>${temperatureFahrenheit} °F</td>
//     </tr>
//     <tr>
//         <th scope="row">Humidity</th>
//         <td>${data.main.humidity} %</td>
//     </tr>
//     <tr>
//         <th scope="row">Pressure</th>
//         <td>${data.main.pressure} hPa</td>
//     </tr>
//     <tr>
//         <th scope="row">Condition</th>
//         <td>${data.weather[0].description}</td>
//           <td><img src="${iconUrl}" alt="Weather Icon"></td>

//     </tr>
// </tbody>
// </table>
//   `;
//   return table;
// }
//FIXED HEADER DISAPPEARING BY PUTTING IT IN THE TABLE
 


function currentWeatherData() {
  var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
  var zipCode = document.getElementById("zipCodeInput").value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
    .then(response => response.ok ? response.json() : Promise.reject('Invalid zip code'))
    .then(data => {
      var table = createWeatherTable(data);
      var weatherDataDiv = document.getElementById("weatherData");
      weatherDataDiv.innerHTML = '';
      weatherDataDiv.appendChild(table);
    })
    .catch(error => alert(error));

  console.log("Zip Code:", zipCode);
}

function createWeatherTable(data) {
  var temperatureKelvin = data.main.temp;
  var temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
  var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(1);

  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  
  createRow('City', data.name);
  createRow('Temperature', `${data.main.temp} K`, `${temperatureCelsius} °C`, `${temperatureFahrenheit} °F`);
  createRow('Humidity', `${data.main.humidity} %`);
  createRow('Pressure', `${data.main.pressure} hPa`);
  createRow('Condition', data.weather[0].description, createWeatherIcon(data.weather[0].icon));

  table.appendChild(tbody);

  table.classList.add('table', 'mt-4');

  var header = document.createElement('h1');
  header.textContent = 'WEATHER OR NOT';

  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'zipCodeInput');
  input.setAttribute('placeholder', 'ENTER ZIP CODE HERE');

  var button = document.createElement('button');
  button.setAttribute('id', 'currentWeatherData');
  button.textContent = 'Get Weather';
  button.addEventListener('click', currentWeatherData);

  var weatherDataDiv = document.getElementById('weatherData');
  weatherDataDiv.innerHTML = ''; // clear field
  weatherDataDiv.appendChild(header);
  weatherDataDiv.appendChild(input);
  weatherDataDiv.appendChild(button);
  weatherDataDiv.appendChild(table);

  return table;


  // function createRow(label, ...values) {
  //   var row = document.createElement('tr');
  //   var th = document.createElement('th');
  //   th.setAttribute('scope', 'row');
  //   th.textContent = label;
  //   row.appendChild(th);

  //   values.forEach(value => {
  //     var td = document.createElement('td');
  //     td.textContent = value;
  //     row.appendChild(td);
  //   });

  //   tbody.appendChild(row);
  // }


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