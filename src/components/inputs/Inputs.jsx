import styled from 'styled-components';
import FilterByMonth from '../filter/FilterByMonth';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { postExpense } from '../../library/api/expense';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Inputs = () => {
  const { user } = useContext(UserContext);
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses']);
      navigate(0);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    const item = formData.get('item');
    const description = formData.get('description');
    const amount = formData.get('amount');

    if (!date || !description.trim() || !item.trim() || !amount.trim()) return alert('모든 항목에 기입하세요.');

    const newSpendingRecord = {
      id: crypto.randomUUID(),
      date,
      item,
      amount: Number(amount),
      description,
      createdBy: user.userId,
    };

    mutation.mutate(newSpendingRecord);
    e.target.reset();
  };

  return (
    <div>
      <div>
        <StForm onSubmit={onSubmit}>
          <StInputContainer type="date" placeholder="날짜" name="date" />
          <StInputContainer type="text" placeholder="지출 항목" name="item" />
          <StInputContainer type="text" placeholder="지출 내용" name="description" />
          <StInputContainer type="number" placeholder="지출 금액" name="amount" />
          <StSaveBtn type="submit">저장</StSaveBtn>
        </StForm>
      </div>
      <div>
        <FilterByMonth />
      </div>
    </div>
  );
};

export default Inputs;

const StInputContainer = styled.input`
  width: 200px;
  height: 30px;
  text-align: center;
  margin: 20px 10px;
  border-radius: 8px;
  color-scheme: dark;
`;

const StSaveBtn = styled.button`
  background-color: grey;
  border-radius: 8px;
  width: 50px;
  margin: 20px auto;
  cursor: pointer;
  &:hover {
    animation: jelly 0.5s;
  }
  @keyframes jelly {
    25% {
      transform: scale(0.8, 1.2);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const StForm = styled.form`
  display: flex;
`;
