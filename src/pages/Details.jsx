import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { updateRecord, deleteRecord } from '../redux/slices/statementSlice';

const Details = () => {
  const dispatch = useDispatch();
  const statement = useSelector((state) => state.spendingHistory.statement);
  const params = useParams();
  const navigate = useNavigate();
  const targetData = statement.find((data) => data.id === params.id);
  const goToHome = () => {
    navigate('/');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    const category = formData.get('category');
    const item = formData.get('item');
    const amount = Number(formData.get('amount'));

    if (amount <= 0) return alert('0 이상의 금액을 입력하세요.');
    if (!date || !category.trim() || !item.trim() || !amount || amount <= 0) return alert('모든 항목에 기입하세요.');

    if (
      date === targetData.date &&
      category === targetData.category &&
      item === targetData.item &&
      amount === Number(targetData.amount)
    ) {
      return alert('수정된 항목이 없습니다.\n수정될 값을 다시 확인하여 주세요.');
    }
    const newSpendingRecord = {
      id: params.id,
      date,
      category,
      item,
      amount,
    };

    dispatch(updateRecord(newSpendingRecord));
    alert('수정되었습니다.');
    goToHome();
  };

  const handleDelete = () => {
    if (window.confirm('정말 해당 지출내역을 삭제하시겠습니까?')) {
      dispatch(deleteRecord(targetData));
      alert('삭제가 완료되었습니다.');
      goToHome();
    } else {
      return alert('삭제가 취소되었습니다.');
    }
  };

  return (
    <section>
      <div>
        <StFormContainer onSubmit={handleUpdate}>
          <StLabel>날짜</StLabel>
          <StInput defaultValue={targetData.date} type="date" placeholder="날짜" name="date" />

          <StLabel>지출 항목</StLabel>
          <StInput defaultValue={targetData.category} type="text" placeholder="지출 항목" name="category" />

          <StLabel>지출 내용</StLabel>
          <StInput defaultValue={targetData.item} type="text" placeholder="지출 내용" name="item" />

          <StLabel>지출 금액</StLabel>
          <StInput defaultValue={targetData.amount} type="number" placeholder="지출 금액" name="amount" />
          <StBtnContainer>
            <button type="submit">수정</button>
            <button type="button" onClick={handleDelete}>
              삭제
            </button>
            <button type="button" onClick={goToHome}>
              뒤로가기
            </button>
          </StBtnContainer>
        </StFormContainer>
      </div>
    </section>
  );
};

export default Details;

const StFormContainer = styled.form`
  max-width: 800px;
  margin: 0px auto;
  padding: 0px;
  color-scheme: dark;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 8px;
  padding: 10px;
  & > * {
    font-family: 'Sunflower', sans-serif;
    margin: 5px 5px;
  }
`;

const StLabel = styled.label`
  text-align: left;
  margin-bottom: 5px;
  font-size: 13px;
  color: #d4d4d4;
`;

const StInput = styled.input`
  margin: 5px;
  height: 40px;
  border-radius: 8px;
`;

const StBtnContainer = styled.div`
  display: flex;

  & > * {
    border: 1px solid;
    border-radius: 8px;
    margin-right: 10px;
    padding: 7px;
    cursor: pointer;
  }

  & > :first-child {
    &:hover {
      transform: scale(1.02);
      border: none;
      box-shadow: 0 0 1px #3fffb9, 0 0 3px #3fffb9, 0 0 6px #3fffb9, 0 0 25px #3fffb9;
    }
  }
  & > :nth-child(2) {
    &:hover {
      transform: scale(1.02);
      border: none;
      box-shadow: 0 0 1px #e72e43, 0 0 3px #e72e43, 0 0 6px #e72e43, 0 0 25px #e72e43;
    }
  }
  & > :nth-child(3) {
    &:hover {
      transform: scale(1.02);
      border: none;
      box-shadow: 0 0 1px #34b5ff, 0 0 3px #34b5ff, 0 0 6px #34b5ff, 0 0 25px #34b5ff;
    }
  }
`;
