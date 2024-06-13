import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../library/api/auth';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export default function Layout() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        setUser(null);
        navigate('/login');
        localStorage.clear();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    localStorage.clear();
  };

  return (
    <>
      <NavBar>
        <HomeBtn to="/">홈</HomeBtn>
        <UserProfile>
          {user && (
            <>
              <AvatarLink to="/mypage">
                <UserAvatar src={user.avatar} />
              </AvatarLink>
              <UserName>{user.nickname}</UserName>
              <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            </>
          )}
        </UserProfile>
      </NavBar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}

const NavBar = styled.nav`
  background-color: #242424;
  color: #ffffff;
  padding: 10px 20px;
  margin: 0 0 0 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  & > * {
    background-color: #242424;
    font-family: 'Sunflower', sans-serif;
  }
`;

const HomeBtn = styled(Link)`
  background-color: #242424;
  color: white;
  margin-left: 20px;
  text-decoration: none;

  &:hover {
    animation: jelly 0.5s;
  }
  @keyframes jelly {
    25% {
      transform: scale(0.8, 1.2);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  & > * {
    background-color: #242424;
    font-family: 'Sunflower', sans-serif;
  }
`;

const AvatarLink = styled(Link)`
  background-color: #242424;
  margin-right: 5px;
  font-family: 'Sunflower', sans-serif;
  &:hover {
    animation: jelly 0.5s;
  }
  @keyframes jelly {
    25% {
      transform: scale(0.8, 1.2);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  color: white;
  margin-right: 20px;
`;
const LogoutBtn = styled.button`
  padding: 8px 12px;
  margin-left: 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    animation: jelly 0.5s;
  }
  @keyframes jelly {
    25% {
      transform: scale(0.8, 1.2);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem;
`;
