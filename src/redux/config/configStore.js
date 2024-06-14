import { configureStore } from '@reduxjs/toolkit';
import monthSlice from '../slices/monthSlice';

const store = configureStore({
  reducer: {
    month: monthSlice,
  },
});
export default store;
