import { configureStore } from '@reduxjs/toolkit';
import statementSlice from '../slices/statementSlice';

const store = configureStore({
  reducer: {
    spendingHistory: statementSlice,
  },
});
export default store;
