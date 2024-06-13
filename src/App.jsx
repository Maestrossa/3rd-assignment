import React from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { UserInfoProvider } from './context/UserContext';

const App = () => {
  return (
    <>
      <UserInfoProvider>
        <GlobalStyle />
        <Router />
      </UserInfoProvider>
    </>
  );
};

export default App;
