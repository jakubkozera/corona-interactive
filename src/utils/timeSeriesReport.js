import _ from 'lodash'
import {
    countryProp,
    stateProp
} from './reportsConts'
import stringToRoute from './stringToRoute'

export function computeTimeSeriesReport(data) {

    const usData = data.filter(d => d[countryProp] === "US");
    const otherLocationData = data.filter(d => d[countryProp] !== "US");

    const dateProps = Object.getOwnPropertyNames(usData[0]).slice(4);

    let usResult = getComputedResult(usData, dateProps);
    let otherLocationResult = getComputedResult(otherLocationData, dateProps);

    return {
        usResult,
        otherLocationResult
    }
}


export function computeDeathsTimeSeriesReport(data) {

    const dateProps = Object.getOwnPropertyNames(data[0]).slice(4);
    let deathsResult = getComputedResult(data, dateProps)

    return {
        deathsResult
    }
}
export function computeRecoveredTimeSeriesReport(data) {

    const dateProps = Object.getOwnPropertyNames(data[0]).slice(4);
    let recoveredResult = getComputedResult(data, dateProps)

    return {
        recoveredResult
    }
}


function getComputedResult(data, props) {

    let result = {};
    let countriesComputed = []

    for (let i = 0; i < data.length; i++) {

        const country = data[i][countryProp];
        const countryComputed = _.find(countriesComputed, c => c.country === country)

        if (countryComputed) {
            const state = data[i][stateProp];

            for (let j = 0; j < props.length; j++) {
                const value = parseInt(data[i][props[j]]) || 0;
                if (i === 0) {
                    result[props[j]] = value
                } else {
                    result[props[j]] += value
                }
                countryComputed[props[j]] += value
                let newState = {
                    name: state
                };
                newState[props[j]] = value
                countryComputed.states.push(newState)
            }
        } else {
            let newComputedCountry = {
                states: [],
                country: country,
                countryRoute: stringToRoute(country),
            }
            let newComputedState = {}
            const state = data[i][stateProp];

            for (let j = 0; j < props.length; j++) {
                const value = parseInt(data[i][props[j]]) || 0;
                if (i === 0) {
                    result[props[j]] = value
                } else {
                    result[props[j]] += value
                }


                newComputedCountry[props[j]] = value
                if (state) {
                    newComputedState[props[j]] = value
                }
            }

            if (state) {
                newComputedState.name = state
                newComputedCountry.states.push(newComputedState)
            }

            countriesComputed.push(newComputedCountry)
        }


    }

    return {result, countriesComputed};
}