import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { updateProfile } from '../library/api/auth';

const Mypage = () => {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState(user.nickname || '');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || '');
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    if (!nickname) return alert('닉네임을 입력하세요.');

    const response = await updateProfile(formData);

    if (response.success) {
      setUser({ ...user, nickname: response.nickname, avatar: response.avatar || user.avatar });
      goToHome();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <section>
      <div>
        <StFormContainer onSubmit={handleUpdateProfile}>
          <h1>My Page</h1>
          <StLabel>현재 닉네임: {user.nickname}</StLabel>
          <StInput
            type="text"
            placeholder="변경할 닉네임 (1-10 글자)"
            name="nickname"
            minLength="1"
            maxLength="10"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <StLabel>프로필 이미지</StLabel>
          <AvatarPreview src={avatarPreview} alt="ㅤㅤㅤ이미지" />
          <StInput type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} />
          <StBtnContainer>
            <button type="submit">프로필 업데이트</button>
            <button type="button" onClick={goToHome}>
              메인페이지로 가기
            </button>
          </StBtnContainer>
        </StFormContainer>
      </div>
    </section>
  );
};

export default Mypage;

const StFormContainer = styled.form`
  font-size: 30px;
  font-family: 'Sunflower', sans-serif;
  max-width: 600px;
  margin: 0px auto;
  gap: 15px;
  align-items: center;
  color-scheme: dark;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 8px;
  padding: 30px;
  & > * {
    font-family: 'Sunflower', sans-serif;
    margin: 5px 5px;
  }
`;

const StLabel = styled.label`
  text-align: left;
  font-size: 15px;
  margin-top: 20px;
  color: #d4d4d4;
`;

const StInput = styled.input`
  height: 30px;
  width: 300px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-align: center;
  align-items: center;
`;

const AvatarPreview = styled.img`
  width: 100px;
  height: 100px;
  background-color: #757575;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > * {
    border: 1px solid;
    border-radius: 8px;
    margin-right: 10px;
    padding: 7px;
    width: 300px;
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
