import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header/Header';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { TypeChangeUserInfo } from '../typings';
import useUserDispatch from '../hooks/contexts/useUserDispatch';
import useUserState from '../hooks/contexts/useUserState';
import { AuthAPI } from '../shared/api';

const MyInfoManage = () => {
	const navigate = useNavigate();
	const userDispatch = useUserDispatch();
	const userState = useUserState();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isSubmitting, errors }
	} = useForm<TypeChangeUserInfo>({ mode: 'onChange' });

	const [nicknameCheck, setNicknameCheck] = useState(false);
	const [userTypeState, setUserTypeState] = useState(false);
	const [dupCheckBtnState, setDupCheckBtnState] = useState(false);
	const [changeBtnState, setChangeBtnState] = useState(false);

	const nicknameCheckHandler = async () => {
		const { nickname } = getValues();
		try {
			await AuthAPI.nicknameDupCheck(nickname);
			setNicknameCheck(true);
			alert('사용 가능한 닉네임입니다.');
		} catch (err: any) {
			setNicknameCheck(false);
			alert(err.response.data);
		}
	};

	const myInfoChangeHandler = async (data: TypeChangeUserInfo) => {
		if (!nicknameCheck && dupCheckBtnState) {
			alert('닉네임 중복 확인을 해주세요.');
			return;
		}
		try {
			const res = await AuthAPI.modifyUserInfo(data);
			const userData = { ...userState, ...data };
			userDispatch({ type: 'SET_INFO', info: userData });
			alert(res.data);
			navigate('/mypage');
		} catch (err: any) {
			alert(err.response.data);
		}
	};

	useEffect(() => {
		if (nicknameCheck || userTypeState) setChangeBtnState(true);
		else setChangeBtnState(false);
	}, [nicknameCheck, userTypeState]);

	return (
		<>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title="개인정보 변경" isAction={true} />
			<MyInfoWrapper onSubmit={handleSubmit(myInfoChangeHandler)}>
				<NicknameBox>
					<p>닉네임</p>
					<NicknameInputBox>
						<input
							defaultValue={userState.nickname}
							{...register('nickname', {
								required: '닉네임은 필수 입력 사항입니다.',
								pattern: {
									value: /[a-zA-Z0-9ㄱ-ㅎ가-힣]$/,
									message: '2자리 이상 10자리 이하 한글/영문/숫자가 필요합니다.'
								},
								minLength: {
									value: 2,
									message: '2자리 이상 10자리 이하로 입력해주세요.'
								},
								maxLength: {
									value: 10,
									message: '2자리 이상 10자리 이하로 입력해주세요.'
								},
								onChange: (e) => {
									nicknameCheck && setNicknameCheck(false);
									e.target.value === userState.nickname ? setDupCheckBtnState(false) : setDupCheckBtnState(true);
								}
							})}
						></input>
						<NicknameCheckBtn
							onClick={nicknameCheckHandler}
							disabled={!dupCheckBtnState || errors.nickname ? true : false}
							type="button"
						>
							{' '}
							중복 확인{' '}
						</NicknameCheckBtn>
					</NicknameInputBox>
				</NicknameBox>
				<UserTypeBox>
					<select
						defaultValue={userState.user_type}
						{...register('user_type', {
							onChange: (e) => {
								e.target.value === userState.user_type ? setUserTypeState(false) : setUserTypeState(true);
							}
						})}
					>
						<option value="SEEKER">취준생</option>
						<option value="JUNIOR">주니어</option>
						<option value="SENIOR">시니어</option>
					</select>
				</UserTypeBox>
				<ChangeMyInfoBtn disabled={!changeBtnState || isSubmitting} type="submit">
					{' '}
					변경하기{' '}
				</ChangeMyInfoBtn>
			</MyInfoWrapper>
		</>
	);
};

export default MyInfoManage;

const MyInfoWrapper = styled.form`
	margin-top: 60px;
	background: white;
	width: 100%;
	height: calc(100% - 60px - 71px);
	position: fixed;
	color: #757575;
	max-width: 480px;
	left: 50%;
	transform: translate(-50%, 0);
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

const NicknameBox = styled.div`
	width: 336px;
	margin: 0 auto;
	margin-top: 27.5px;
	p {
		margin-bottom: 8px;
	}
`;

const NicknameInputBox = styled.div`
	display: flex;
	align-items: center;
	input {
		width: 203px;
		margin-right: 5px;
	}
`;

const NicknameCheckBtn = styled.button`
	width: 128px;
	height: 46px;
	background: ${(props) => (props.disabled ? '#757575' : '#3549FF')};
	cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: none;
	font-weight: bold;
`;

const UserTypeBox = styled.div`
	width: 336px;
	margin: 41px auto 0px;
	select {
		box-sizing: border-box;
		width: 100%;
		height: 46px;
		color: #8d8d8d;
		background: #ffffff;
		border: 1.5px solid #d8d8d8;
		border-radius: 8px;
		padding: 14px;
	}
`;

const ChangeMyInfoBtn = styled.button`
	width: 335px;
	margin: 35px auto 0px;
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
