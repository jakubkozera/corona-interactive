import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import totalReducer from './redux/reducers/Total'
import dailyReducer from './redux/reducers/Daily'

export default configureStore({
  reducer: {
    counter: counterReducer,
    total: totalReducer,
    daily: dailyReducer
  },
});
