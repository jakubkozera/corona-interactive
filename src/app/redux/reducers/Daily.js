import {
    createSlice
} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'daily',
    initialState: {
        chinaConfirmed: {},
        otherLocationConfirmed: {},
        allDataLoaded: false
    },
    reducers: {
        chinaConfirmed: (state, action) => {
            state.chinaConfirmed = action.payload;
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
    chinaConfirmed,
    otherLocationConfirmed,
    recoveredConfirmed,
    deathsConfirmed
} = slice.actions;

export const selectChinaConfirmed = state => state.daily.chinaConfirmed.result;
export const selectRecoveredConfirmed = state => state.daily.recoveredConfirmed.result;
export const selectDeathsConfirmed = state => state.daily.deathsConfirmed.result;
export const selectOtherLocationConfirmed = state => state.daily.otherLocationConfirmed.result;
export const selectAllDataLoaded = state => state.daily.allDataLoaded;

export const selectCountryDailyReport = country => state => {
    if(country === 'china') {
        return {
            confirmed: state.daily.chinaConfirmed.countriesComputed[0],
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



export default slice.reducer;