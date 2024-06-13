import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../../library/api/expense';
import { useSelector } from 'react-redux';

const SpendingList = () => {
  const { data: expenses = [], isLoading, error } = useQuery({ queryKey: ['expenses'], queryFn: getExpenses });
  const activeIndex = useSelector((state) => state.spendingHistory.selectedMonth);

  const getFilteredStatement = () => {
    return expenses.filter((item) => {
      const dateObject = new Date(item.date);
      return dateObject.getMonth() + 1 === activeIndex;
    });
  };

  const filteredList = getFilteredStatement();

  if (isLoading) {
    return <div>로딩중 입니다.</div>;
  }

  return (
    <section>
      <div>
        {filteredList.map((item) => (
          <StLink to={`/details/${item.id}`} key={item.id}>
            <StDiv>
              <span>{item.date}</span>
              <span>
                {item.item} - {item.description}
              </span>
            </StDiv>
            <span>{item.amount.toLocaleString()} 원</span>
          </StLink>
        ))}
      </div>
    </section>
  );
};

export default SpendingList;

const StLink = styled(Link)`
  width: 800px;
  font-family: 'Sunflower', sans-serif;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid grey;
  border-radius: 8px;
  margin: 20px auto;
  transition: transform 0.2s ease-in-out 0s;
  &:hover {
    transform: scale(1.02);
    border: none;
    color: #050801;
    box-shadow: 0 0 1px #3fffb9, 0 0 3px #3fffb9, 0 0 6px #3fffb9, 0 0 25px #3fffb9;
  }
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    font-size: 13px;
    margin: 5px;
    text-align: left;
  }
  & > :nth-child(2) {
    font-size: 15px;
    margin: 5px;
  }
`;
