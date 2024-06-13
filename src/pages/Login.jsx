import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { login } from '../library/api/auth';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const toHomepg = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    const password = formData.get('password');
    const credentials = { id, password };

    const { userId, nickname, avatar, success } = await login({ credentials });

    setUser({ userId, nickname, avatar });

    if (success) {
      toHomepg();
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <section>
      <div>
        <StFormContainer onSubmit={handleSubmit}>
          <h1>로그인</h1>
          <StLabel>아이디</StLabel>
          <StInput type="text" placeholder="아이디" name="id" />

          <StLabel>비밀번호</StLabel>
          <StInput type="password" placeholder="비밀번호" name="password" />

          <StBtnContainer>
            <button type="submit">로그인</button>
            <button type="button" onClick={handleSignUpClick}>
              회원가입
            </button>
          </StBtnContainer>
        </StFormContainer>
      </div>
    </section>
  );
};

export default Login;

const StFormContainer = styled.form`
  max-width: 800px;
  margin: 50px auto;
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
  margin-bottom: 20px;
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
      box-shadow: 0 0 1px #ffffb9, 0 0 3px #ffffb9, 0 0 6px #ffffb9, 0 0 25px #ffffb9;
    }
  }
`;
