import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../library/api/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const prevPg = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    const password = formData.get('password');
    const nickname = formData.get('nickname');

    if (id.length < 4 || id.length > 10) return alert('아이디는 4-10자 사이로 입력해주세요.');
    if (password.length < 4 || password.length > 15) return alert('비밀번호는 4-15자 사이로 입력해주세요.');
    if (nickname.length < 1 || nickname.length > 10) return alert('닉네임은 1-10자 사이로 입력해주세요.');

    const response = await register({ id, password, nickname });

    if (response) {
      alert('회원가입 완료.');
      navigate('/login');
    }
  };

  return (
    <section>
      <div>
        <StFormContainer onSubmit={handleSubmit}>
          <h1>회원가입</h1>
          <StLabel>아이디</StLabel>
          <StInput type="text" placeholder="아이디" name="id" />

          <StLabel>비밀번호</StLabel>
          <StInput type="password" placeholder="비밀번호" name="password" />

          <StLabel>닉네입</StLabel>
          <StInput type="text" placeholder="닉네입" name="nickname" />

          <StBtnContainer>
            <button type="submit">회원가입</button>
            <button type="button" onClick={prevPg}>
              뒤로가기
            </button>
          </StBtnContainer>
        </StFormContainer>
      </div>
    </section>
  );
};

export default SignUp;

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
      box-shadow: 0 0 1px #34b5ff, 0 0 3px #34b5ff, 0 0 6px #34b5ff, 0 0 25px #34b5ff;
    }
  }
`;
