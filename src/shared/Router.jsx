import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
