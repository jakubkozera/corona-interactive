var _ = require('lodash');

export default function computeDailyRepory(data) {

    let countryCases = [];
    let dailyConfirmed = 0;
    let dailyDeaths = 0;
    let dailyRecovered = 0;

    for (let i = 0; i < data.length; i++) {
        dailyConfirmed += parseInt(data[i]["Confirmed"]);
        dailyDeaths += parseInt(data[i]["Deaths"]);
        dailyRecovered += parseInt(data[i]["Recovered"]);

        const country = data[i]["Country/Region"];

        const countryCase = _.find(countryCases, c => c.country === country);
        if(countryCase) {
            countryCase.confirmed += parseInt(data[i]["Confirmed"]);
            countryCase.deaths += parseInt(data[i]["Deaths"]);
            countryCase.recovered += parseInt(data[i]["Recovered"]);
        } else {
            let newCountryCase = {
                country: country,
                confirmed: parseInt(data[i]["Confirmed"]),
                deaths: parseInt(data[i]["Deaths"]),
                recovered: parseInt(data[i]["Recovered"])
            }

            countryCases.push(newCountryCase);
        }
    }
    countryCases = _.orderBy(countryCases, "confirmed", "desc")
    console.log(countryCases);


    return {
        dailyConfirmed,
        dailyDeaths,
        dailyRecovered,
        dailyCountryCases: countryCases
      }
}