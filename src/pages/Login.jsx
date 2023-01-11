import React, { useContext } from 'react';
import styled from 'styled-components';
import instance from '../shared/axios';
import kakao_login from '../assets/images/kakao_login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userContext } from '../context/UserProvider';
import { Helmet } from 'react-helmet';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm();

	const navigate = useNavigate();

	const context = useContext(userContext);
	const { setUserInfo } = context.actions;

	const onSubmitLogin = async (data) => {
		try {
			const res = await instance.post('/api/login', data);
			const token = res.headers.authorization;
			const refreshtoken = res.headers.refreshtoken;
			const { username, nickname, user_type, kakao } = res.data;
			const userData = { username, nickname, user_type, kakao };
			setUserInfo(userData);
			sessionStorage.setItem('Authorization', token);
			sessionStorage.setItem('Refresh__Token', refreshtoken);
			alert('환영합니다!');
			navigate('/viewer/posting/list');
		} catch (err) {
			alert('아이디 또는 패스워드를 확인해주세요!');
		}
	};

	const onSubmitError = (errors) => {
		if (errors.username) alert(errors.username.message);
		else if (errors.password) alert(errors.password.message);
	};

	return (
		<LoginWrapper>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Logo onClick={() => navigate('/viewer/posting/list')}>
				<svg width="99" height="57" viewBox="0 0 99 57" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_833_4252)">
						<path
							d="M10.8657 4.41327C10.8657 6.96406 8.9888 8.82654 6.41822 8.82654C3.84763 8.82654 1.9707 6.96406 1.9707 4.41327C1.9707 1.86248 3.84763 0 6.41822 0C8.9888 0 10.8657 1.86248 10.8657 4.41327ZM10.0497 35.2657H2.78676V11.4583H10.0497V35.2657Z"
							fill="#3549FF"
						/>
						<path
							d="M30.1647 17.6529H25.4316V35.1845H18.1687V17.6529H13.4355V11.4581H18.1687V4.41309H25.4316V11.4581H30.1647V17.6529Z"
							fill="#3549FF"
						/>
						<path
							d="M41.6314 4.41327C41.6314 6.96406 39.7544 8.82654 37.1838 8.82654C34.6133 8.82654 32.7363 6.96406 32.7363 4.41327C32.7363 1.86248 34.6133 0 37.1838 0C39.7544 0 41.6314 1.86248 41.6314 4.41327ZM40.8153 35.2657H33.5524V11.4583H40.8153V35.2657Z"
							fill="#3549FF"
						/>
						<path
							d="M46.2832 11.4584H53.5461V13.8878C54.9742 11.9848 57.1776 10.8916 60.2378 10.8916C65.787 10.8916 69.5816 14.9 69.5816 21.4592V35.1848H62.3187V22.6738C62.3187 19.0703 60.8498 17.0864 58.116 17.0864C55.3822 17.0864 53.5461 19.3133 53.5461 22.9977V35.1848H46.2832V11.4584Z"
							fill="#3549FF"
						/>
						<path
							d="M91.738 11.4584V13.8878C90.3099 11.9848 88.025 10.8916 84.8831 10.8916C78.0283 10.8916 73.2543 16.0337 73.2543 23.1192C73.2543 30.2047 78.0283 35.1443 84.8831 35.1443C88.025 35.1443 90.3099 34.0511 91.738 32.1482V34.6585C91.738 37.6141 89.6979 39.5576 86.6785 39.5576C86.6173 39.5576 86.5561 39.5576 86.4989 39.5536V39.5738H32.3535L25.0947 47.1249V39.7277H3.06115C2.9469 39.7277 2.83673 39.7358 2.72656 39.7479V45.7848C2.83673 45.7969 2.95098 45.805 3.06115 45.805H18.9743V53.4574C18.9743 54.9109 19.8556 56.2025 21.2143 56.7451C21.6469 56.9192 22.0998 57.0001 22.5486 57.0001C23.5034 57.0001 24.4337 56.6195 25.1233 55.9029L34.9731 45.6512H86.6744C86.7927 45.6512 86.911 45.6431 87.0253 45.6309C93.9863 45.4892 99.0009 41.08 99.0009 34.7475V11.4584H91.738ZM86.0256 29.1925C82.5574 29.1925 80.354 26.6417 80.354 23.1192C80.354 19.5967 82.5574 17.0459 86.0256 17.0459C89.4939 17.0459 91.8604 19.5967 91.8604 23.1192C91.8604 26.6417 89.5755 29.1925 86.0256 29.1925Z"
							fill="#3549FF"
						/>
					</g>
					<defs>
						<clipPath id="clip0_833_4252">
							<rect width="99" height="57" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</Logo>

			<Inputarea onSubmit={handleSubmit(onSubmitLogin, onSubmitError)}>
				<input
					placeholder="EMAIL"
					name="EMAIL"
					{...register('username', {
						required: '이메일을 입력해주세요!',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: '이메일 형식이 아닙니다.'
						}
					})}
				/>
				<input
					placeholder="PW"
					type="password"
					name="PW"
					{...register('password', {
						required: '비밀번호를 입력해주세요!'
					})}
				/>
				<button type="submit" className="btn-login" disabled={isSubmitting}>
					로그인
				</button>
			</Inputarea>
			<Buttonarea>
				<a rel="noreferrer" href="https://api.it-ing.co.kr/oauth2/authorization/kakao">
					<button type="button" className="btn-kakao">
						<img src={kakao_login} alt="" />
					</button>
				</a>
			</Buttonarea>
			<Singuparea>
				<Link to="/signup">
					<p>아직 회원이 아니신가요?</p>
				</Link>
				<hr />
			</Singuparea>
		</LoginWrapper>
	);
};

export default Login;

const LoginWrapper = styled.div`
	padding-top: 80px;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100vh - 80px);

	input {
		margin-bottom: 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 16px;
		width: 327px;
		height: 58px;
		left: 24px;
		top: 268px;
		border: none;
		border-bottom: 2px solid #3549ff;
	}
`;

const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
	margin-bottom: 40px;
	cursor: pointer;
`;

const Inputarea = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 38px;

	.btn-login {
		background: #3549ff;
		height: 60px;
		border-radius: 40px;
		border: none;
		font-family: 'Apple SD Gothic Neo';
		font-style: normal;
		font-size: 20px;
		line-height: 24px;
		text-align: center;
		letter-spacing: -0.3px;
		color: #ffffff;
	}
`;

const Buttonarea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.btn-kakao {
		margin-top: 50px;
		margin-bottom: 18px;
		border: none;
		background-color: transparent;
	}

	img {
		width: 335px;
	}
`;

const Singuparea = styled.div`
	p {
		margin-bottom: 4px;
		color: #717171;
		font-size: 14px;
	}

	hr {
		width: 135px;
		margin-bottom: 43px;
	}

	a {
		color: black;
		text-decoration: none;
	}
`;
