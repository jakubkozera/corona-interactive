import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'total',
  initialState: {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countryCases: []
  },
  reducers: {
    confirmed: (state, action) => {
      state.confirmed = action.payload;
    },
    deaths: (state, action) => {
        state.deaths = action.payload;
      },
    recovered: (state, action) => {
        state.recovered = action.payload;
    },
    countryCases: (state, action) => {
      state.countryCases = action.payload;
  },
  },
});

export const { confirmed, deaths, recovered, countryCases } = slice.actions;

export const selectConfirmed = state => state.total.confirmed;
export const selectDeaths = state => state.total.deaths;
export const selectRecovered = state => state.total.recovered;
export const selectCountryCases = state => state.total.countryCases;
export const selectCountrySpecificCases = countryRoute => state => state.total.countryCases.filter(c => c.countryRoute === countryRoute)[0];

export default slice.reducer;