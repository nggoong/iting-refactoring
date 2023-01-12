import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { userContext } from '../context/UserProvider';
import Header from '../components/header/Header';
import instance from '../shared/axios';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

const MyPwManage = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isSubmitting, errors }
	} = useForm({
		mode: 'onChange'
	});
	const navigate = useNavigate();

	const context = useContext(userContext);
	const { userInfo } = context.state;
	const [isAbleSubmit, setIsAbleSubmit] = useState(false);

	const myPwChangeHandler = async (data) => {
		console.log(data);
		try {
			const res = await instance.put('/api/mypage/user/password', data);
			alert(res.data);
			navigate('/mypage');
		} catch (err) {
			console.log(err.response.data);
		}
	};

	useEffect(() => {
		if (userInfo.kakao) {
			alert('카카오회원은 비밀번호 변경을 할 수 없습니다.');
			return navigate('/mypage');
		}
	}, []);

	useEffect(() => {
		const inputValues = getValues();
		const temp = Object.values(inputValues);
		for (let i = 0; i < temp.length; i++) {
			if (!temp[i]) setIsAbleSubmit(false);
			else setIsAbleSubmit(true);
		}
	}, []);

	return (
		<>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title="비밀번호 변경" isAction={true} />
			<MyPwWrapper onSubmit={handleSubmit(myPwChangeHandler)}>
				<NowPwBox>
					<p>현재 비밀번호</p>
					<input
						type="password"
						autoComplete="off"
						{...register('password', {
							required: '현재 비밀번호 입력은 필수입니다.',
							onChange: ({ target }) => {
								const value = target;
								!value ? setIsAbleSubmit(false) : setIsAbleSubmit(true);
							}
						})}
					></input>
					{errors.password && <Fail>{errors.password.message}</Fail>}
				</NowPwBox>
				<NewPwBox>
					<p>신규 비밀번호</p>
					<input
						type="password"
						placeholder="영문이나 숫자, 특수문자(!@#$%^&.*)포함 8~20자"
						autoComplete="off"
						{...register('changePassword', {
							required: '변경할 비밀번호를 입력해주세요.',
							pattern: {
								value: /(?=.*[!@#$%^&.*])[0-9a-zA-Z!@#$%^&.*]$/,
								message: '영문이나 숫자, 특수문자(!@#$%^&.*)를 포함해주세요.'
							},
							minLength: {
								value: 8,
								message: '8자리 이상, 20자리 미만으로 입력해주세요.'
							},
							maxLength: {
								value: 20,
								message: '8자리 이상, 20자리 미만으로 입력해주세요.'
							},
							onChange: ({ target }) => {
								const value = target;
								!value ? setIsAbleSubmit(false) : setIsAbleSubmit(true);
							}
						})}
					></input>
					{errors.changePassword && <Fail>{errors.changePassword.message}</Fail>}
					<input
						type="password"
						placeholder="비밀번호 확인"
						autoComplete="off"
						{...register('confirmChangePassword', {
							required: '비밀번호가 일치하지 않습니다.',
							validate: {
								matchesPreviousPassword: (value) => {
									const { changePassword } = getValues();
									return changePassword === value || '비밀번호가 일치하지 않습니다.';
								}
							},
							onChange: ({ target }) => {
								const value = target;
								!value ? setIsAbleSubmit(false) : setIsAbleSubmit(true);
							}
						})}
					></input>
					{errors.confirmChangePassword && <Fail>{errors.confirmChangePassword.message}</Fail>}
				</NewPwBox>
				<ChangeMyPwBtn
					disabled={isSubmitting || errors.password || errors.changePassword || errors.confirmChangePassword || !isAbleSubmit}
					type="submit"
				>
					변경하기
				</ChangeMyPwBtn>
			</MyPwWrapper>
		</>
	);
};

export default MyPwManage;

const MyPwWrapper = styled.form`
	margin-top: 60px;
	background: white;
	width: 100%;
	height: calc(100% - 60px - 71px);
	position: fixed;
	left: 50%;
	transform: translate(-50%, 0);
	top: 0;
	color: #757575;
	display: flex;
	flex-direction: column;
	max-width: 480px;
	input {
		box-sizing: border-box;
		height: 46px;
		background: #ffffff;
		border: 1.5px solid #d8d8d8;
		border-radius: 8px;
		padding: 14px;
		::placeholder {
			color: #757575;
		}
	}
`;

const NowPwBox = styled.div`
	width: 336px;
	margin: 27.5px auto 22px;
	display: flex;
	flex-direction: column;
	p {
		font-size: 12px;
		margin-bottom: 8px;
	}
`;

const NewPwBox = styled.div`
	width: 336px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	p {
		font-size: 12px;
		margin-bottom: 8px;
	}
	input {
		margin-bottom: 8px;
	}
`;

const ChangeMyPwBtn = styled.button`
	width: 335px;
	margin: 20px auto 0px;
	background: ${(props) => (props.disabled ? '#757575' : '#3549FF')};
	cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
	color: white;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: bold;
	border-radius: 40px;
	border: none;
`;

const Fail = styled.div`
	margin-top: 2px;
	font-size: 13px;
	padding-left: 10px;
	color: red;
`;
