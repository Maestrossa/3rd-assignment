import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statement: [
    {
      id: crypto.randomUUID(),
      date: '2024-01-01',
      category: '식비',
      item: '돈까스',
      amount: 10000,
    },
    {
      id: crypto.randomUUID(),
      date: '2024-01-25',
      category: '여가',
      item: '영화',
      amount: 20000,
    },
    {
      id: crypto.randomUUID(),
      date: '2024-03-15',
      category: '쇼핑',
      item: '신발',
      amount: 60000,
    },
    {
      id: crypto.randomUUID(),
      date: '2024-05-01',
      category: '식비',
      item: '치킨',
      amount: 20000,
    },
  ],
  selectedMonth: 0,
};

const statementSlice = createSlice({
  name: 'spendingHistory',
  initialState,
  reducers: {
    addStatement: (state, action) => {
      state.statement.push(action.payload);
    },
    updateRecord: (state, action) => {
      // action.payload안에 데이터가 있다.
      const index = state.statement.findIndex((item) => item.id === action.payload.id);
      //만약 값을 찾지 못했을 경우 -1
      if (index !== -1) {
        //찾았을 때
        state.statement[index] = action.payload;
      }
    },
    deleteRecord: (state, action) => {
      state.statement = state.statement.filter((item) => item.id !== action.payload.id);
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { addStatement, updateRecord, deleteRecord, setSelectedMonth } = statementSlice.actions;
export default statementSlice.reducer;
