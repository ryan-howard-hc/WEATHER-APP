//This function is called when the Get Weather button is clicked
//Retrieves API Key, as well as the zip entered by user (LINES 15 and 16)
//the  nested fetch() function makes a GET request which can be cached,reloaded,bookmarked, and the parameters remain in browser history unlike a POST request

      //Re Corey: POSTs are usually meant to be used whenever you're doing something that will alter state/data, like updating a record, or filling out a form.
      //Re Corey: Most frameworks support securing POST actions with antiforgery tokens as well, which adds security
//the api data is converted to JSON (LINE 28)
      //JSON is text representation of JS object literals and arrays
//the JSON is sent as a variable (LINE 28) to a function(LINE 49) that relays the data pulled
//(AHA!!!! apparently divs can be created in JS and sent to HTML using template literals... Probably how you do that stretch goal)

//either way, from this (LINE 29), this new variable is sent to the weatherData div in HTML)
//LINE 30  formats this into a table and also sends it to HTML?
function currentWeatherData() {
  var apiKey = 'f91a2ba49ec43ee8f836bbbd73a614e7';
  var zipCode = document.getElementById("zipCodeInput").value;          //

  axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`) //template literal
    .then(response => {

      var data = response.data;
      var tableDiv = createWeatherTable(data);        
      var weatherDataDiv = document.getElementById("weatherData"); //VARIABLE TO ATTACH TABLE TO INPUT IN HTML
      
      weatherDataDiv.appendChild(tableDiv); // APPENDS TABLE TO CORRESPONDING DIV IN HTML

      


      const successCallback = (position) => {
        console.log(position);
      };
      
      const errorCallback = (error) => {
        console.log(error);
      };
      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

      })
      .catch(error => {
        console.error(error);
        alert('Error retrieving weather data');
      });

  console.log("Zip Code:", zipCode);
}

// createWeatherTable() pulls the data variable as an argument which itself is a variable pulled from the response from the API






//the function below is a nested function with data inserted from the currentWeatherData function
//it uses the data from the lines above it within same function

//THIS ENTIRE FUNCTION IS WITHIN THE ABOVE FUNCTION WHICH IS TRIGGERED BY THE BUTTON CLICK
function createWeatherTable(data) {
  var table = document.createElement("table");





//1
var headers = ["City", "Temperature", "Temperature (Celsius)", "Temperature (Fahrenheit)", "Humidity", "Description"];//CAN EFFECTIVELY CHANGE THESE CORRESPONDING TO EACH HEADER CELL
  var headerRow = document.createElement("tr");            
 
  headers.forEach(function (headerText) {               //creates a function to add text to each header in the array using the callback function .forEach

    var headerCell = document.createElement("th");        //creates the cells
    headerCell.textContent = headerText;                  //

    headerRow.appendChild(headerCell);
      //This block ties the text from the array to each header cell
      //through the appendChild element. 
  });
  table.appendChild(headerRow);     //attaches subfunction from headers variable/Top row





//2
  var weatherRow = document.createElement("tr");            
  var celsius = Math.round(data.main.temp - 273.15);
  var fahrenheit = Math.round((data.main.temp - 273.15) * 9 / 5 + 32);          
  var dataRow = [data.name, data.main.temp, celsius +"C",fahrenheit+"F", data.main.humidity, data.weather[0].description];  //pulls from data variable which pulls from response data

  dataRow.forEach(function (dataText) { //dataRow pulls array data while the cellText nested function provides framework to append to each cell
    var dataCell = document.createElement("td");        //2B  Creates cell element connected to the cell
    dataCell.textContent = dataText;                                  //gives the text content from dataRow
    
    weatherRow.appendChild(dataCell);                                 //pushes the info into each cell of the weatherRow from the dataRow
  });
  table.appendChild(weatherRow);          //attaches the subfunction from dataRow variable/Bottom row

var iconRow = document.createElement("tr");
var iconCell = document.createElement("td");
var iconImg = document.createElement("img");
iconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
iconCell.appendChild(iconImg);
iconRow.appendChild(iconCell);
table.appendChild(iconRow);

  return table;
}


 

//Like, in a "real" environment, sensitive information like an API key, a connection string, etc. would be in a separate configuration file that the application reads from.
//I'm sure there are ways do that in JS as well, but that's overkill for something like this. I was just speaking in a broader sense
