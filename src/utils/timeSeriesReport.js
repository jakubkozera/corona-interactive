var _ = require('lodash');

export function computeTimeSeriesReport(data) {

    const chinaData = data.filter(d => d["Country/Region"] === "China");
    const otherLocationData = data.filter(d => d["Country/Region"] !== "China");

    const dateProps = Object.getOwnPropertyNames(chinaData[0]).slice(4);

    let chinaResult = getComputedResult(chinaData, dateProps);
    let otherLocationResult = getComputedResult(otherLocationData, dateProps);

    return {
        chinaResult,
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

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < props.length; j++) {
            const value = parseInt(data[i][props[j]]) || 0;
            if (i === 0) {
                result[props[j]] = value
            } else {
                result[props[j]] += value
            }
        }
    }

    return result;
}