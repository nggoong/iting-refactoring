import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './components/nav/Navigation';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import { Helmet } from 'react-helmet';
import * as Sentry from '@sentry/react';
import Router from '../src/router';
import useUserDispatch from './hooks/useUserDispatch';
import { AuthAPI } from './shared/api';

function App() {
	const userDispatch = useUserDispatch();

	useEffect(() => {
		const getUserInfo = async () => {
			const token = sessionStorage.getItem('Authorization');
			if (!token) {
				return;
			} else if (token) {
				const res = await AuthAPI.fetchUserInfo();
				const data = res.data;
				userDispatch({ type: 'SET_INFO', info: data });
			}
		};
		getUserInfo().catch(console.error);
	}, []);

	return (
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
