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

export const selectChinaConfirmed = state => state.daily.chinaConfirmed;
export const selectRecoveredConfirmed = state => state.daily.recoveredConfirmed;
export const selectDeathsConfirmed = state => state.daily.deathsConfirmed;
export const selectOtherLocationConfirmed = state => state.daily.otherLocationConfirmed;
export const selectAllDataLoaded = state => state.daily.allDataLoaded;

export default slice.reducer;