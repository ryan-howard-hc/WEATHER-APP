


function currentWeatherData() {
  var apiKEY= 'f91a2ba49ec43ee8f836bbbd73a614e7';
  var zipCode= document.getElementById("zipCodeInput").value;


  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      
        console.log(data);
    })
    .catch(error => {
        console.log('Error:', error);
    });
    
    var zipCode = document.getElementById("zipCodeInput").value;
    console.log("Zip Code:", zipCode);
  }

