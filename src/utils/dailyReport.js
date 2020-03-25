import stringToRoute from './stringToRoute'
import _ from 'lodash'
export default function computeDailyReport(data) {

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

        const lat = parseFloat(data[i]["Lat"]);
        const long = parseFloat(data[i]["Long_"])
        const country = data[i]["Country_Region"];

        
        const state = data[i]["Province_State"]
        let countryState;
        if(state) {
            countryState = {
                name: state,
                nameRoute: stringToRoute(state),
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


            if(state) {
                debugger;
                let existingState = countryCase.states.filter(s => s.name === state)[0];

                if(existingState) {
                    existingState.confirmed += countryState.confirmed;
                    existingState.deaths += countryState.deaths;
                    existingState.recovered += countryState.recovered; 
                } else {
                    countryCase.states.push(countryState)
                }
            }
        } else {

            let newCountryCase = {
                states: [],
                country: country,
                countryRoute: stringToRoute(country),
                confirmed: currentConfirmed,
                deaths: currentDeaths,
                recovered: currentRecovered
            }

            if(state) {


                newCountryCase.states.push(countryState);
            } else {
                newCountryCase.lat = lat;
                newCountryCase.long = long;
            }

            countryCases.push(newCountryCase);
        }
    }
    countryCases = _.orderBy(countryCases, "confirmed", "desc")

    return {
        dailyConfirmed,
        dailyDeaths,
        dailyRecovered,
        dailyCountryCases: countryCases
      }
}