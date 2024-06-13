import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteExpense, getExpense, putExpense } from '../library/api/expense';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: selectedExpense = [], isPending, error } = useQuery({ queryKey: ['expense', id], queryFn: getExpense });

  const goToHome = () => {
    navigate('/');
  };

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      goToHome();
      queryClient.invalidateQueries({ queryKey: ['expense', id] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      goToHome();
      queryClient.invalidateQueries({ queryKey: ['expenses', id] });
    },
  });

  console.log(selectedExpense);
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    const description = formData.get('description');
    const item = formData.get('item');
    const amount = Number(formData.get('amount'));

    if (amount <= 0) return alert('0 이상의 금액을 입력하세요.');
    if (!date || !description.trim() || !item.trim() || !amount || amount <= 0) return alert('모든 항목에 기입하세요.');

    if (
      date === selectedExpense.date &&
      description === selectedExpense.description &&
      item === selectedExpense.item &&
      amount === Number(selectedExpense.amount)
    ) {
      return alert('수정된 항목이 없습니다.\n수정될 값을 다시 확인하여 주세요.');
    }
    const newSpendingRecord = {
      id: id,
      date,
      item,
      description,
      amount,
    };

    mutationEdit.mutate(newSpendingRecord);
    alert('수정되었습니다.');
  };

  const handleDelete = () => {
    if (window.confirm('정말 해당 지출내역을 삭제하시겠습니까?')) {
      mutationDelete.mutate(id);
      alert('삭제가 완료되었습니다.');
    } else {
      return alert('삭제가 취소되었습니다.');
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div>
        <StFormContainer onSubmit={handleUpdate}>
          <StLabel>날짜</StLabel>
          <StInput defaultValue={selectedExpense.date} type="date" placeholder="날짜" name="date" />

          <StLabel>지출 내용</StLabel>
          <StInput defaultValue={selectedExpense.item} type="text" placeholder="지출 내용" name="item" />

          <StLabel>지출 항목</StLabel>
          <StInput defaultValue={selectedExpense.description} type="text" placeholder="지출 항목" name="description" />

          <StLabel>지출 금액</StLabel>
          <StInput defaultValue={selectedExpense.amount} type="number" placeholder="지출 금액" name="amount" />
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
  color-scheme: dark;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 8px;
  padding: 20px;
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
  margin: 5px 0 20px 0;
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
