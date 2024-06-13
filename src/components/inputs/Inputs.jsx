import styled from 'styled-components';
import FilterByMonth from '../filter/FilterByMonth';
import { useDispatch } from 'react-redux';
import { addStatement } from '../../redux/slices/statementSlice';

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

const Inputs = () => {
  const dispatch = useDispatch();
  // const statement = useSelector((state) => state.spendingHistory);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    const category = formData.get('category');
    const item = formData.get('item');
    const amount = formData.get('amount');

    if (!date || !category.trim() || !item.trim() || !amount.trim()) return alert('모든 항목에 기입하세요.');

    const newSpendingRecord = {
      id: crypto.randomUUID(),
      date,
      category,
      item,
      amount,
    };

    dispatch(addStatement(newSpendingRecord));
    e.target.reset();
  };

  return (
    <div>
      <div>
        <StForm onSubmit={onSubmit}>
          <StInputContainer type="date" placeholder="날짜" name="date" />
          <StInputContainer type="text" placeholder="지출 항목" name="category" />
          <StInputContainer type="text" placeholder="지출 내용" name="item" />
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
