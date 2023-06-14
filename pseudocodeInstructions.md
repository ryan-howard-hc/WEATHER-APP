
    MoSCoW
        //Must Have

        //Should Have

        //Could Have

        //Wont Have
            



//BEGIN

//INIT - Variables, Functions, Steps, Assumptions, Known-knowns, Known-unknowns?
    //Questions:

            //How to use axios to retrieve data and display it?
            //How to fetch location data from API (openweathermap.org/)?
                // API KEY- Unique API key = "f91a2ba49ec43ee8f836bbbd73a614e7"
                //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
            //How to store data in Local Storage?
            //Used on Desktop or mobile?
            //How to display the data?
            
    //UI: Atomic Design : Atoms, Molecules, Organisms
        //1: Header
        //2: Weather Display
            //databox in bootstrap
                //
                //addEventListener for userInput
                    //(click, enter, change) -> fetchData
                                     -> checkUserInput

        

    //'Use case'
        //1: User goes to page
        //2: User enters zip, clicks button/or return key
        //3: User views retrieved API data
        //3b: Error Message

    //State:
        //OBJECT FOR CURRENT WEATHER DATA
        //1: currentWeatherData = {
            zipCode : "40502" 
        }

        //OBJECT FOR CURRENT VALUE OF ZIP AND PREVIOUS ZIP SEARCHES
        //2: userInput = {
            currentValue : "40502"  //5 digits, no char, no special char

            previousSearches : {
                requestData "40502"
                resultData : { ... }
                requestTime: 
            };
            {
                requestData : "42069"
                resultData: { ... }
                requestTime
            }
        }

    //User Input



        //4: fetchData (){    //send api key and user input to API
            //4a: displayTemp(){    //compute temp or retrieve based to update UI

        }
          
            //4b: setState          //return data 
                //checkUserInput
                    //input length
                    //no special char
                    //error response
                    //VALIDATION AND ALERT FUNCTION
                //
        }

        //5: renderUI {

        }
//END