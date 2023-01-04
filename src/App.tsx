import React, { useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './components/nav/Navigation';
import instance from './shared/axios';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import { userContext } from './context/UserProvider';
import { Helmet } from 'react-helmet';
import * as Sentry from '@sentry/react';
import Router from './components/router';

function App() {
	const context = useContext(userContext);
	const { setUserInfo } = context.actions;

	useEffect(() => {
		const getUserInfo = async () => {
			const token = sessionStorage.getItem('Authorization');
			/* 토큰이 웹 스토리지에 없는 경우(로그인 X) */
			if (!token) {
				// 혹시나 context에 저장되어 있을 경우를 방지 default 값으로 초기화
				return;
			} else if (token) {
				/*토큰이 웹 스토리지에 있는 경우(로그인 O) */
				const res = await instance.get('/api/user/info');
				const data = res.data;
				// user 정보 저장
				setUserInfo({ ...data });
			}
		};

		getUserInfo().catch(console.error);
	}, []);

	return (
		// TODO: 로그인 유무에 따라 url 직접 접근 차단 또는 허용하는 기능 구현(react-router로)
		<ThemeProvider theme={theme}>
			<div className="App">
				<GlobalStyle />
				<Helmet>
					<title>IT-ing</title>
					<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
					<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
					<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
				</Helmet>
				<Content>
					<Router />
				</Content>
				<Navigation />
			</div>
		</ThemeProvider>
	);
}

export default Sentry.withProfiler(App);

const Content = styled.div`
	width: 100vw;
	max-width: 480px;
	margin: 0 auto;
`;
