import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import totalReducer from './redux/reducers/Total'
import dailyReducer from './redux/reducers/Daily'
import countryArticleReducer from './redux/reducers/CountryArticle'
import { connectRouter } from 'connected-react-router'
import history from './history'

export default configureStore({
  reducer: {
    country: countryArticleReducer,
    counter: counterReducer,
    total: totalReducer,
    daily: dailyReducer,
    router: connectRouter(history)
  },
});
