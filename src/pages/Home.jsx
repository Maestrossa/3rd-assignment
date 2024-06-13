import Inputs from '../components/inputs/Inputs';
import SpendingList from '../components/spending-list-components/SpendingList';
import styled from 'styled-components';

const StMain = styled.main`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px auto;
`;

const Home = () => {
  return (
    <StMain>
      <Inputs />
      <SpendingList />
    </StMain>
  );
};

export default Home;
