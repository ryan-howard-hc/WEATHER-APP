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
      .catch(error => {
          console.log('Error:', error);
      });

  console.log("Zip Code:", zipCode);
}
