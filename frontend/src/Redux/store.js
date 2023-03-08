import { configureStore } from '@reduxjs/toolkit';
import Reducer from './CartSlice';

 const store = configureStore({
  reducer: {
    Reducer
  },
});
export default store;