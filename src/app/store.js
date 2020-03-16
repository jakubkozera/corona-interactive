import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import totalReducer from './redux/reducers/Total'

export default configureStore({
  reducer: {
    counter: counterReducer,
    total: totalReducer
  },
});
