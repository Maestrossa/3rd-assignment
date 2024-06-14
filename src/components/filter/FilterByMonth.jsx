import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSelectedMonth } from '../../redux/slices/monthSlice';

const FilterByMonth = () => {
  const dispatch = useDispatch();

  const activeIndex = useSelector((state) => state.month.selectedMonth);
  const handleClick = (month) => {
    dispatch(setSelectedMonth(month));
    localStorage.setItem('selectedMonth', month);
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    const getLocalMonth = Number(localStorage.getItem('selectedMonth'));
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
