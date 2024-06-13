import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSelectedMonth } from '../../redux/slices/statementSlice';

const FilterByMonth = () => {
  const dispatch = useDispatch();

  const activeIndex = useSelector((state) => state.spendingHistory.selectedMonth); // store에서 가져온 값
  // 리덕스 값은 새로고침하면 휘발됨.
  const handleClick = (month) => {
    dispatch(setSelectedMonth(month));
    localStorage.setItem('selectedMonth', month);
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // 1. 페이지가 리렌더링될때 시작값 (선택되있는 월) => 페이지 그려질 때 자동으로 월이 선택되어야 함.

  // 2. 준비물: 제일 마지막으로 선택된 월. 로컬스토리지 => 로지스토리지에서 가져올 수 있음.

  // 3. 리렌더링될때 로컬스토리지에서 가져온다 useEffect를 사용.
  useEffect(() => {
    const getLocalMonth = Number(localStorage.getItem('selectedMonth'));
    // 4. useEffect안에서 가져온 월을 가지고 선택?
    // localStorage에서 값을 가져오면 string 타입
    handleClick(getLocalMonth);
  }, []);

  return (
    <section>
      <StBtnContainer>
        {months.map((month) => (
          <StBtn key={month} $active={activeIndex === month} onClick={() => handleClick(month)}>
            {month}월
          </StBtn>
        ))}
      </StBtnContainer>
    </section>
  );
};

export default FilterByMonth;

const StBtnContainer = styled.div`
  width: 800px;
  background-color: #222222;
  border-radius: 8px;
  margin: 20px auto;
  padding: 20px;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`;
const StBtn = styled.button`
  width: 100px;
  background-color: ${(props) => (props.$active ? '#3fffb9' : '#171717')};
  color: ${(props) => (props.$active ? '#171717' : 'white')};
  box-shadow: ${(props) =>
    props.$active ? '0 0 5px #3fffb9, 0 0 25px #3fffb9, 0 0 50px #3fffb9, 0 0 200px #3fffb9' : 'none'};
  border-color: transparent;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #3fffb9;
    color: #050801;
    box-shadow: 0 0 5px #3fffb9, 0 0 25px #3fffb9, 0 0 50px #3fffb9, 0 0 200px #3fffb9;
  }
`;
