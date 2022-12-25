import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../shared/axios';

import Header from '../components/header/Header';
import { userContext } from '../context/UserProvider';
import { Helmet } from 'react-helmet';

const MyInfoManage = () => {
	const navigate = useNavigate();
	const context = useContext(userContext);
	const { userInfo } = context.state;
	const { setUserInfo } = context.actions;

	const [nicknameState, setNicknameState] = useState(true);
	const [nicknameCheck, setNicknameCheck] = useState(false);
	const [userTypeState, setUserTypeState] = useState(false);
	const [dupCheckBtnState, setDupCheckBtnState] = useState(false);
	const [changeBtnState, setChangeBtnState] = useState(false);

	const _nickReg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,10}$/;

	const nickname_ref = useRef();
	const usertype_ref = useRef();

	const nicknameHandler = () => {
		setNicknameState(false);
		// 닉네임 정규식이 참이고, 빈값이 아니고, 기존닉네임에서 값이 바뀐 경우 중복확인 버튼 렌더링
		if (
			_nickReg.test(nickname_ref.current.value) &&
			nickname_ref.current.value !== '' &&
			nickname_ref.current.value !== userInfo.nickname
		) {
			setNicknameState(false);
			return setDupCheckBtnState(true);
		} else {
			setNicknameState(true);
			return setDupCheckBtnState(false);
		}
	};

	const nicknameCheckHandler = async () => {
		try {
			const res = await instance.get(`/api/users/nickname/${nickname_ref.current.value}`);
			// console.log(res);
			setNicknameCheck(true);
			setNicknameState(true);
			alert('사용 가능한 닉네임입니다.');
		} catch (err) {
			// console.log(err);
			setNicknameCheck(false);
			setNicknameState(false);
			alert(err.response.data);
		}
	};

	const userTypeHandler = () => {
		if (usertype_ref.current.value !== userInfo.user_type) {
			return setUserTypeState(true);
		} else {
			return setUserTypeState(false);
		}
	};

	const myInfoChangeHandler = async () => {
		const data = {
			nickname: nickname_ref.current.value,
			user_type: usertype_ref.current.value
		};
		try {
			const res = await instance.put('/api/mypage/user/info', data);
			alert('개인정보가 변경되었습니다.');
			const { nickname, user_type } = data;
			const { username, kakao } = userInfo;
			const userData = { username, nickname, user_type, kakao };
			setUserInfo(userData);
			navigate('/mypage');
		} catch (err) {
			console.log('실패', err);
		}
	};

	useEffect(() => {
		if (!_nickReg.test(nickname_ref.current.value)) {
			return setChangeBtnState(false);
		} else if (nicknameState && userTypeState) {
			return setChangeBtnState(true);
		} else if (!nicknameState && userTypeState) {
			return setChangeBtnState(false);
		} else if (!nicknameCheck && userTypeState) {
			return setChangeBtnState(false);
		} else if (nicknameCheck && userTypeState) {
			return setChangeBtnState(true);
		} else if (nicknameCheck && nicknameState) {
			return setChangeBtnState(true);
		}
	}, [nicknameCheck, userTypeState, nicknameState]);

	return (
		<>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title="개인정보 변경" isAction={true} />
			<MyInfoWrapper>
				<NicknameBox>
					<p>닉네임</p>
					<NicknameInputBox>
						<input ref={nickname_ref} defaultValue={userInfo.nickname} onChange={nicknameHandler}></input>
						<NicknameCheckBtn onClick={nicknameCheckHandler} disabled={!dupCheckBtnState}>
							{' '}
							중복 확인{' '}
						</NicknameCheckBtn>
					</NicknameInputBox>
				</NicknameBox>
				<UserTypeBox>
					<select ref={usertype_ref} onChange={userTypeHandler} defaultValue={userInfo.user_type}>
						<option value="SEEKER">취준생</option>
						<option value="JUNIOR">주니어</option>
						<option value="SENIOR">시니어</option>
					</select>
				</UserTypeBox>
				<ChangeMyInfoBtn onClick={myInfoChangeHandler} disabled={!changeBtnState}>
					{' '}
					변경하기{' '}
				</ChangeMyInfoBtn>
			</MyInfoWrapper>
		</>
	);
};

export default MyInfoManage;

const MyInfoWrapper = styled.div`
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
