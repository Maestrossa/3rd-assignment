import axios from 'axios';

const JSON_SERVER_HOST = 'http://localhost:5002';

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (err) {
    alert('에러가 생겼습니다.');
  }
};

export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses/${queryKey[1]}`);
    return response.data;
  } catch (err) {
    alert('에러가 생겼습니다.');
  }
};

export const postExpense = async (newExpense) => {
  try {
    const { data } = await axios.post(`${JSON_SERVER_HOST}/expenses`, newExpense);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터 등록 에러입니다');
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const { data } = await axios.put(`${JSON_SERVER_HOST}/expenses/${id}`, rest);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터 업데이트 에러입니다');
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    alert('데이터 삭제 에러입니다');
  }
};
