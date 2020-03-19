var _ = require('lodash');


export default function computePerCountryReport(data) {

    let casesPerCountry = [];


    let countryCases = [];
    let dailyConfirmed = 0;
    let dailyDeaths = 0;
    let dailyRecovered = 0;

    for (let i = 0; i < data.length; i++) {
        const currentConfirmed = parseInt(data[i]["Confirmed"]);
        dailyConfirmed += currentConfirmed;

        const currentDeaths = parseInt(data[i]["Deaths"]);
        dailyDeaths += currentDeaths;

        const currentRecovered = parseInt(data[i]["Recovered"]);
        dailyRecovered += currentRecovered;

        const lat = parseFloat(data[i]["Latitude"]);
        const long = parseFloat(data[i]["Longitude"])
        const country = data[i]["Country/Region"];

        
        const state = data[i]["Province/State"]
        let countryState;
        if(state) {
            countryState = {
                name: state,
                long: long,
                lat: lat,
                confirmed: currentConfirmed,
                deaths: currentDeaths,
                recovered: currentRecovered
            }
        }
        
        const countryCase = _.find(countryCases, c => c.country === country);
        if(countryCase) {
            countryCase.confirmed += currentConfirmed;
            countryCase.deaths += currentDeaths;
            countryCase.recovered += currentRecovered;
            if(!!countryCase.states && state) {
                countryCase.states.push(countryState)
            }
        } else {

            let newCountryCase = {
                states: [],
                country: country,
                confirmed: currentConfirmed,
                deaths: currentDeaths,
                recovered: currentRecovered,
                lat,
                long 
            }

            if(state) {
                newCountryCase.states.push(countryState);
            } 

            countryCases.push(newCountryCase);
        }
    }
    countryCases = _.orderBy(countryCases, "confirmed", "desc")


    return {
        casesPerCountry
      }
}