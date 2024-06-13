import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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

const SpendingList = () => {
  // 1. 내가 선택한 '월'에 맞는 데이터를 필터
  // 2. 준비물 : 내가 선택한 월, 원본 데이터

  // 3. 원본 데이터 가져오기
  const statement = useSelector((state) => state.spendingHistory.statement);
  // 4. 내가 선택한 월 가져오기
  const activeIndex = useSelector((state) => state.spendingHistory.selectedMonth);

  // 원본 데이터에서 내가 선택한 '월'에 맞는 데이터들만 필터링
  const getFilteredStatement = () => {
    return statement.filter((item) => {
      const dateObject = new Date(item.date); //Date 공부해보기
      // console.log('dateObject =>', dateObject);
      // console.log('dateObject.getMonth() =>', dateObject.getMonth());
      return dateObject.getMonth() + 1 === activeIndex;
    });
  };

  const filterdList = getFilteredStatement();

  return (
    <section>
      <div>
        {filterdList.map((item) => (
          <StLink to={`/details/${item.id}`} key={item.id}>
            <StDiv>
              <span>{item.date}</span>
              <span>
                {item.category} - {item.item}
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
