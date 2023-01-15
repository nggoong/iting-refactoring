import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AnimationPage from '../components/animation/AnimationPage';

import { Helmet } from 'react-helmet';

const Splash = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate('/viewer/posting/list');
		}, 2000);
	}, []);
	return (
		<AnimationPage>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<SplashWrapper>
				<svg width="142" height="83" viewBox="0 0 142 83" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_833_4269)">
						<path
							d="M13.0177 6.42634C13.0177 10.1406 10.2708 12.8527 6.50883 12.8527C2.74685 12.8527 0 10.1406 0 6.42634C0 2.71203 2.74685 0 6.50883 0C10.2708 0 13.0177 2.71203 13.0177 6.42634ZM11.8234 51.3518H1.19428V16.6849H11.8234V51.3518V51.3518Z"
							fill="white"
						/>
						<path
							d="M41.2621 25.7058H34.3352V51.2343H23.7061V25.7058H16.7793V16.6853H23.7061V6.42676H34.3352V16.6853H41.2621V25.7058V25.7058Z"
							fill="white"
						/>
						<path
							d="M58.0411 6.42634C58.0411 10.1406 55.2943 12.8527 51.5323 12.8527C47.7703 12.8527 45.0234 10.1406 45.0234 6.42634C45.0234 2.71203 47.7703 0 51.5323 0C55.2943 0 58.0411 2.71203 58.0411 6.42634ZM56.8468 51.3518H46.2177V16.6849H56.8468V51.3518V51.3518Z"
							fill="white"
						/>
						<path
							d="M64.8496 16.6848H75.4787V20.2222C77.5687 17.4512 80.7933 15.8594 85.2718 15.8594C93.3929 15.8594 98.9463 21.6961 98.9463 31.2472V51.2337H88.3172V33.0159C88.3172 27.7687 86.1675 24.8798 82.1667 24.8798C78.1658 24.8798 75.4787 28.1225 75.4787 33.4876V51.2337H64.8496V16.6848V16.6848Z"
							fill="white"
						/>
						<path
							d="M131.372 16.6848V20.2222C129.282 17.4512 125.938 15.8594 121.34 15.8594C111.308 15.8594 104.321 23.3469 104.321 33.6645C104.321 43.982 111.308 51.1748 121.34 51.1748C125.938 51.1748 129.282 49.5829 131.372 46.8119V50.4673C131.372 54.7711 128.386 57.6011 123.967 57.6011C123.878 57.6011 123.788 57.6011 123.704 57.5952V57.6247H44.4638L33.8407 68.6202V57.8487H1.59512C1.42792 57.8487 1.2667 57.8605 1.10547 57.8782V66.6687C1.2667 66.6864 1.4339 66.6982 1.59512 66.6982H24.8836V77.8411C24.8836 79.9577 26.1734 81.8384 28.1619 82.6284C28.7949 82.882 29.4577 82.9999 30.1146 82.9999C31.5119 82.9999 32.8733 82.4457 33.8825 81.4021L48.2975 66.4742H123.961C124.134 66.4742 124.307 66.4624 124.475 66.4447C134.662 66.2383 142.001 59.8179 142.001 50.597V16.6848H131.372ZM123.012 42.508C117.936 42.508 114.711 38.7937 114.711 33.6645C114.711 28.5352 117.936 24.8209 123.012 24.8209C128.087 24.8209 131.551 28.5352 131.551 33.6645C131.551 38.7937 128.207 42.508 123.012 42.508Z"
							fill="white"
						/>
					</g>
					<defs>
						<clipPath id="clip0_833_4269">
							<rect width="142" height="83" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</SplashWrapper>
		</AnimationPage>
	);
};

export default Splash;

const SplashWrapper = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10000;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	left: 50%;
	transform: translate(-50%, 0);
	background: ${({ theme }) => theme.colors.mainBlue};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	box-sizing: border-box;

	h1 {
		color: white;
		font-size: 60px;
		font-weight: bold;
	}
`;
