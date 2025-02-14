const http = require('http');
const firebaseFunctions = require('../firebaseFunctions');
let comparaisons = [
    { name: "Ciel clair", result: 0},
    { name: "Principalement clair", result: 1},
    { name: "Partiellement nuageux", result: 2},
    { name: "Partiellement couvert", result: 3},
    { name: "Brouillard", result: 45},
    { name: "Brouillard givrant", result: 48},
    { name: "Brume légère", result: 51},
    { name: "Brume modérée", result: 53},
    { name: "Brume dense", result: 55},
    { name: "Légère brume verglaçante", result: 56},
    { name: "Dense brume verglaçante", result: 57},
    { name: "Pluie légère", result: 61},
    { name: "Pluie modérée", result: 63},
    { name: "Pluie forte", result: 65},
    { name: "Pluie verglaçante légère", result: 66},
    { name: "Pluie verglaçante forte", result: 67},
    { name: "Chute de neige légère", result: 71},
    { name: "Chute de neige modérées", result: 73},
    { name: "Chute de neige forte", result: 75},
    { name: "Petit flocon de neige", result: 77},
    { name: "Averses de pluie légères", result: 80},
    { name: "Averses de pluie modérée", result: 81},
    { name: "Averses de pluie violentes", result: 82},
    { name: "Averses de neige légères", result: 85},
    { name: "Averses de neige fortes", result: 86},
    //Thunderstorm forecast with hail is only available in Central Europe
    { name: "Orage", result: 95},
    { name: "Orage avec grêle légère", result: 96},
    { name: "Orage avec grêle forte", result: 99}
]

/**
* @brief Check if it is weather is fine or not based on the current date and 
* time and the weather code provided by the API.
* @param latitude Latitude of the location to check the weather for.
* @param longitude Longitude of the location to check the weather for.
* @returns {Promise} A promise that resolves to a boolean indicating whether it is 
* weather is fine or not.
*/
function WeatherisFineOrNot(latitude, longitude) {
    return new Promise((resolve, reject) => {
        http.get(`http://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode`, function (response) {
            var buffer = ""
            var dataJson;
            response.on("data", function (chunk) {
                buffer += chunk;
            }); 
            response.on("end", function (err) {
                dataJson = JSON.parse(buffer);
                var date = new Date().toISOString().slice(0, 10);
                var hour = new Date().getHours();
                dataJson.hourly.time.forEach(function(time, i) {
                    if (time.slice(0, 10) == date && time.slice(11, 13) == hour) {
                        var weatherCode = dataJson.hourly.weathercode[i];
                        if (weatherCode > 0 || weatherCode < 4)
                            resolve(true);
                        else
                            resolve(false);
                    }
                });
            })
        })
    });
}

/**
* @brief GetLocation function retrieves the location data from Firebase for the specified user ID.
* @param uid (string) user ID
* @returns Promise that resolves with location data if successful or rejects with an error if unsuccessful
*/
function GetLocation(uid) {
    return new Promise((resolve, reject) => {
        firebaseFunctions.getDataFromFireBase(uid, 'OpenMeteoService')
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            console.log(error);
        });
    });
}

module.exports = {
    /**
    * ActionWeather is a Promise that is used to determine if the weather is fine or not.
    * @param {string} uid - The unique identifier of a user.
    * @returns {Promise} A Promise that resolves with a boolean value indicating if the weather is fine or not.
    */
    ActionWeather: function(uid) {
        return new Promise((resolve, reject) => {
            GetLocation(uid)
            .then(data => {
                WeatherisFineOrNot(data.latitude, data.longitude)
                .then(weatherIsFine => {
                    if (weatherIsFine === true)
                        resolve(true);
                    else {
                        resolve(false);
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}