import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import UserInterface from './models/UserInterface';
import { UserContext } from './global/contexts';
import Drawer from './layouts/Drawer';
import TweetIndex from './layouts/tweet/TweetIndex';
import TweetDetail from './layouts/tweet/TweetDetail';
import UserIndex from './layouts/user/UserIndex';
import ProfileIndex from './layouts/profile/ProfileIndex';
import SignIn from './layouts/auth/SignIn';
import SignUp from './layouts/auth/SignUp';
import About from './layouts/about/About';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
`;
const DrawerWrapper = styled.div`
  height: 100vh;
  width: 15%;
  background-color: black;
  color: white;
`;
const MainContainer = styled.div`
  height: 100vh;
  width: 85%;
  background-color: white;
  color: black;
  overflow: scroll;
`;

const Main = () => {
  return (
    <Switch>
      <Route exact path="/tweet/list">
        <TweetIndex/>
      </Route>
      <Route path="/tweet/detail/:id" component={TweetDetail}/>
      <Route path="/user/list">
        <UserIndex/>
      </Route>
      <Route path="/profile">
        <ProfileIndex/>
      </Route>
      <Route path="/sign_in">
        <SignIn/>
      </Route>
      <Route path="/sign_up">
        <SignUp/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
    </Switch>
  )
};

const sessionKey = 'tweet-app-session-key'
function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<UserInterface>({ id: 0, email: "", name: "" })
  
  useEffect(() => {
    const session = window.sessionStorage.getItem(sessionKey) // セッション取得
    if (session) {
      console.log(`session exists: session = ${session}`)
      const user = JSON.parse(session)
      setUser(user)
      setIsLogin(true)
    }
  }, [])

  return (
    <UserContext.Provider value={{isLogin, setIsLogin, user, setUser}}>
      <Router>
        <Wrapper>
          <DrawerWrapper>
            <Drawer />
          </DrawerWrapper>
          <MainContainer>
            <Main/>
          </MainContainer>
        </Wrapper>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
