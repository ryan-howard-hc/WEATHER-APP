# INIT
How to use axios to retrieve data and display it? How to fetch location data from API (openweathermap.org/)?
Used on desktop or mobile?
How to display the data?

(EXTRA) ONLY JS RENDERED(DONE!)
(EXTRA) Store multiple locations (KIND OF DONE???!?!? CHEESED)
(EXTRA) Historical data displayed as well
(EXTRA) How to store data in Local Storage? HOLD ONTO PREVIOUS SEARCHES
(EXTRA) Weather auto pulled from location data? (DONE!)
(EXTRA) DATA stored if page is refreshed?
(EXTRA) DYNAMIC CSS

# STATE
OBJECT FOR CURRENT WEATHER DATA - currentWeatherData
OBJECT FOR CURRENT VALUE OF ZIP AND PREVIOUS ZIP SEARCHES - userInput, previousSearches
## UI
1. Header/Title
2. Weather Display
    - databox in bootstrap
    - addEventListener for userInput
    - Error display if invalid input is entered (incorrect zip/special characters)

# RENDER
currentWeatherData() {
    var apiKey - string
    var zipCode -getElementByID
    axios.get ()
    .then{
        var data - response from axios
        var tablediv - (createWeatherTable(data)) 
        var weatherDataDiv - getElementByID
        weatherDataDiv - appendChild
    }
    .catch{
        error - alert
    }
}

createWeatherTable(data) {
    var table - createElement
    var headers - [Parameter headings]
    headers () {
        var headerCell - createElement
    }
    table.appendChild()

    var weatherRow - createElement
        var celsius
        var fahrenheit
    var dataRow - [array of data parameters]
    dataRow() {
        var dataCell -createElement
        dataRow.appendChild(dataCell)
    }

    var iconRow- createElement
    var iconCell- createElement
    var iconImg- createElement ???
    iconImg.src ???
    iconCell.append
    iconRow.append
    table.append

    return
}