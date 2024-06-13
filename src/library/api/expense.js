import axios from 'axios';

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses`);
    return response.data;
  } catch (err) {
    console.log('expenseS ->', response);
    alert('에러가 생겼습니다.');
  }
};

export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/expenses/${queryKey[1]}`);
    return response.data;
  } catch (err) {
    consol.log('espense->', response);

    alert('에러가 생겼습니다.');
  }
};

export const postExpense = async (newExpense) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/expenses`, newExpense);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터 등록 에러입니다');
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`, rest);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터 업데이트 에러입니다');
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/expenses/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터 삭제 에러입니다');
  }
};
