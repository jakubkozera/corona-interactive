import {
    createSlice
} from '@reduxjs/toolkit';
import moment from 'moment'

export const slice = createSlice({
    name: 'daily',
    initialState: {
        usConfirmed: {},
        otherLocationConfirmed: {},
        allDataLoaded: false
    },
    reducers: {
        usConfirmed: (state, action) => {
            state.usConfirmed = action.payload;
        },
        otherLocationConfirmed: (state, action) => {
            state.otherLocationConfirmed = action.payload;
        },
        deathsConfirmed: (state, action) => {
            state.deathsConfirmed = action.payload;
        },
        recoveredConfirmed: (state, action) => {
            state.recoveredConfirmed = action.payload;
        },
        dataLoaded: (state, action) => {
            state.allDataLoaded = action.payload;
        }
    },
});

export const {
    dataLoaded,
    usConfirmed,
    otherLocationConfirmed,
    recoveredConfirmed,
    deathsConfirmed
} = slice.actions;

export const selectUsConfirmed = state => state.daily.usConfirmed.result;
export const selectRecoveredConfirmed = state => state.daily.recoveredConfirmed.result;
export const selectDeathsConfirmed = state => state.daily.deathsConfirmed.result;
export const selectOtherLocationConfirmed = state => state.daily.otherLocationConfirmed.result;
export const selectAllDataLoaded = state => state.daily.allDataLoaded;

export const selectCountryDailyReport = country => state => {
    if(country === 'us') {
        return {
            confirmed: state.daily.usConfirmed.countriesComputed[0],
            deaths: state.daily.deathsConfirmed.countriesComputed.filter(cc => cc.countryRoute === country)[0],
            recovered: state.daily.recoveredConfirmed.countriesComputed.filter(cc => cc.countryRoute === country)[0],
        }
    }

    return {
        confirmed: state.daily.otherLocationConfirmed.countriesComputed.filter(cc => cc.countryRoute === country)[0],
        deaths: state.daily.deathsConfirmed.countriesComputed.filter(cc => cc.countryRoute === country)[0],
        recovered: state.daily.recoveredConfirmed.countriesComputed.filter(cc => cc.countryRoute === country)[0],
    }
};

export const selectCountryDetailedDailyReport = country => state => {

    let result = [];

    const countryDailyReport = selectCountryDailyReport(country)(state)
    const dateProps = Object.getOwnPropertyNames(countryDailyReport.confirmed).slice(4);
    const validDateProps = dateProps.filter(dp => countryDailyReport.confirmed[dp] > 0);

    result.push({
        confirmed: countryDailyReport.confirmed[validDateProps[0]],
        active: (countryDailyReport.confirmed[validDateProps[0]] - countryDailyReport.deaths[validDateProps[0]] - countryDailyReport.recovered[validDateProps[0]]),
        newConfirmed: countryDailyReport.confirmed[validDateProps[0]],
        deaths: countryDailyReport.deaths[validDateProps[0]],
        newDeaths: countryDailyReport.deaths[validDateProps[0]],
        recovered: countryDailyReport.recovered[validDateProps[0]],
        newRecovered: countryDailyReport.recovered[validDateProps[0]],
        recoveryRatio: (countryDailyReport.recovered[validDateProps[0]] / countryDailyReport.confirmed[validDateProps[0]] ).toFixed(4),
        deathRatio: (countryDailyReport.deaths[validDateProps[0]] / countryDailyReport.confirmed[validDateProps[0]] ).toFixed(4),
        date: moment(validDateProps[0], 'MM-DD-YY').format('YYYY-MM-DD'), 
    });

    for(let i = 1; i < validDateProps.length; i++) {
        result.push({
            confirmed: countryDailyReport.confirmed[validDateProps[i]],
            active: (countryDailyReport.confirmed[validDateProps[i]] - countryDailyReport.deaths[validDateProps[i]] - countryDailyReport.recovered[validDateProps[i]]),
            newConfirmed: (countryDailyReport.confirmed[validDateProps[i]] - countryDailyReport.confirmed[validDateProps[i - 1]]),
            deaths: countryDailyReport.deaths[validDateProps[i]],
            newDeaths: (countryDailyReport.deaths[validDateProps[i]] - countryDailyReport.deaths[validDateProps[i - 1]]),
            recovered: countryDailyReport.recovered[validDateProps[i]],
            newRecovered: (countryDailyReport.recovered[validDateProps[i]] - countryDailyReport.recovered[validDateProps[i - 1]]),
            recoveryRatio: (countryDailyReport.recovered[validDateProps[i]] / countryDailyReport.confirmed[validDateProps[i]] ).toFixed(4),
            deathRatio: (countryDailyReport.deaths[validDateProps[i]] / countryDailyReport.confirmed[validDateProps[i]] ).toFixed(4),
            date: moment(validDateProps[i], 'MM-DD-YY').format('YYYY-MM-DD'), 
        });
    }

    return result.reverse();
}


export default slice.reducer;