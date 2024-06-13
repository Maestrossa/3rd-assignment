import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMonth: 0,
};

const statementSlice = createSlice({
  name: 'spendingHistory',
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = statementSlice.actions;
export default statementSlice.reducer;
