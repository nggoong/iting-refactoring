import React, { useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import PostingViewer from './pages/PostingViewer';
import Detail from "./pages/Detail";
import Post from './pages/Post';
import CreateRoom from './pages/CreateRoom';
import ChatRoom from './pages/ChatRoom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import KakaoLogin from './components/KakaoLogin';
import Navigation from './components/nav/Navigation';
import Mypage from './pages/Mypage';
import RoomViewer from './pages/RoomViewer';
import MyInfoManage from './pages/MyInfoManage';
import MyPwManage from './pages/MyPwManage';
import PrivateRoute from './components/limitAuthRoute/PrivateRoute';
import UserLimitRoute from './components/limitAuthRoute/UserLimitRoute';
import ErrorFound from './components/notice/NotFound';
import CommentInPost from './pages/CommentInPost';
import { Routes, Route, useLocation } from 'react-router-dom';

import instance from './shared/axios';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import { userContext } from './context/UserProvider';
import Splash from './pages/Splash';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet'

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";



function App() {

  const context = useContext(userContext);
  const location = useLocation();
  const access = context.state.userInfo.username;
  const { setUserInfo } = context.actions;
  const token = sessionStorage.getItem("Authorization");

  useEffect(()=> {
    const getUserInfo = async () => {
      const token = sessionStorage.getItem("Authorization");
      /* 토큰이 웹 스토리지에 없는 경우(로그인 X) */
      if(!token) {
        // 혹시나 context에 저장되어 있을 경우를 방지 default 값으로 초기화
        return;
      }
      /*토큰이 웹 스토리지에 있는 경우(로그인 O) */ 
      else if(token) {
        const res = await instance.get('/api/user/info');
        const data = res.data;
        // user 정보 저장
        setUserInfo({...data});
      }
    }

    getUserInfo().catch(console.error);
  }, []);
  
  return (
    // TODO: 로그인 유무에 따라 url 직접 접근 차단 또는 허용하는 기능 구현(react-router로)
    <ThemeProvider theme={theme}>
    <div className="App">
        <GlobalStyle/>
        <Helmet>
          <title>IT-ing</title>
          <link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
        </Helmet>
        <Content>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Splash/>}/>
            <Route path="/viewer/commentinpost" element={<CommentInPost />} />
            <Route path="/viewer/posting/:category" element={<PostingViewer/>}/>
            <Route path="/viewer/posting/search/:hashtag" element={<PrivateRoute component={<PostingViewer/>} authenticated={token}/>}/>
            <Route path="/viewer/room" element={<PrivateRoute component={<RoomViewer/>} authenticated={token}/>}/>
            <Route path="/viewer/room/search/:hashtag" element={<PrivateRoute component={<RoomViewer/>} authenticated={token}/>}/>
            <Route path="/detail/posting/:postingId" element={<PrivateRoute component={<Detail />} authenticated={token}/>} />
            <Route path="/signup" element={<Signup />}></Route>

            
            <Route path="/mypage/myinfomanage" element={<MyInfoManage />} />
            <Route path="/mypage/mypwmanage" element={<MyPwManage />} />

            <Route path="/login" element={<UserLimitRoute component={<Login />} authenticated={token}/>}></Route>
            <Route path="/mypage" element={<PrivateRoute component={<Mypage />} authenticated={token}/>} />

            <Route
            path="/oauth2/redirect/:token"
            element={<KakaoLogin />}
             />
            <Route path="/posting" element={<PrivateRoute component={<Post/>} authenticated={token}/>}/>
            <Route path="/posting/edit/:postingId" element={<PrivateRoute component={<Post/>} authenticated={token}/>}/>
            <Route path="/create/room" element={<PrivateRoute component={<CreateRoom/>} authenticated={token}/>}/>
            <Route path="/detail/room/chat/:roomId" element={<PrivateRoute component={<ChatRoom/>} authenticated={token}/>}/>
            <Route path="*" element={<ErrorFound title={"NOT FOUND"} text={"페이지를 찾지 못했어요!"}/>}/>
          </Routes>
          </AnimatePresence>
         
        </Content>
        <Navigation/>
    </div>
    </ThemeProvider>
  );
}

export default Sentry.withProfiler(App);

const Content = styled.div`
  width:100vw;
  max-width:480px;
  margin:0 auto;
`
