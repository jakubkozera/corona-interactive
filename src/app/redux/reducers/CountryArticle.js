import {
    createSlice
} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'country',
    initialState: {
        articles: {}
    },
    reducers: {
        addCountryArticles: (state, action) => {
            let articles = { ...state.articles };
            articles[action.payload.country] = action.payload.articles;
            state.articles = articles;
        },
        dataLoaded: (state, action) => {
            state.allDataLoaded = action.payload;
        }
    },
});

export const { addCountryArticles } = slice.actions;
export const selectCountryArticles = country => state => state.country.articles[country]
export default slice.reducer;