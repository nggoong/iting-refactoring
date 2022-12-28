import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import instance from '../shared/axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Signup = () => {
	const navigate = useNavigate();

	//ref로 input값 받아오기
	const email_ref = useRef(null);
	const nickname_ref = useRef(null);
	const pw_ref = useRef(null);
	const pwcheck_ref = useRef(null);

	//input값 제한 조건 충족에 따른 p태그 반환
	const [emailcheck, setEmailCheck] = useState(null);
	const [nicknamecheck, setNickNameCheck] = useState(null);
	const [pwcheck, setPwCheck] = useState(null);
	const [pwrecheck, setPwReCheck] = useState(null);
	const [userType, setUserType] = useState('SEEKER');

	//중복확인 여부
	const [idduple, setIdDuple] = useState(null);
	const [nicknameduple, setNickNameDuple] = useState(null);

	//아이디(이메일) 제한 조건 : 이메일 형식
	const email_limit = (email) => {
		let _reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		return _reg.test(email);
	};

	//아이디 형식이 맞지 않을 경우
	const idCheck = () => {
		if (!email_limit(email_ref.current.value)) {
			setEmailCheck(false);
		} else {
			setEmailCheck(true);
		}
	};

	// 닉네임 제한 조건 : 2자리 이상 10자리 이하 한글/영문/숫자
	const nickname_limit = (nickname) => {
		let _reg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,10}$/;
		return _reg.test(nickname);
	};

	//닉네임 형식이 맞지 않을 경우
	const nickNameCheck = () => {
		if (!nickname_limit(nickname_ref.current.value)) {
			setNickNameCheck(false);
		} else {
			setNickNameCheck(true);
		}
	};

	// 비밀번호 제한 조건 : 8자리 이상 20자리 이하
	const password_limit = (password) => {
		let _reg = /^(?=.*[@$!%*?&])[0-9a-zA-Z!@#$%^&.*]{8,20}$/;
		return _reg.test(password);
	};

	//비밀번호 형식이 맞지 않을 경우
	const pwCheck = () => {
		if (!password_limit(pw_ref.current.value)) {
			setPwCheck(false);
		} else {
			setPwCheck(true);
		}
	};

	// 유저 비밀번호 확인 일치 체크
	const pwReCheck = () => {
		if (pw_ref.current.value !== pwcheck_ref.current.value) {
			setPwReCheck(false);
		} else {
			setPwReCheck(true);
		}
	};

	// 유저 타입 가져오기
	const selectUserType = (e) => {
		setUserType(e.target.value);
	};

	const submitId = async () => {
		if (emailcheck === null) {
			alert('ID를 입력해주세요!');
		} else if (emailcheck === false) {
			alert('ID 형식을 확인해주세요!');
		} else {
			try {
				await instance.get(`/api/users/email/${email_ref.current.value}`);
				alert('사용 가능한 ID 입니다!');
				setIdDuple(true);
			} catch (err) {
				console.log(err);
				alert('이미 사용된 ID 입니다!');
				setIdDuple(false);
			}
		}
	};

	const submitNickName = async () => {
		if (nicknamecheck === null) {
			alert('닉네임을 입력해주세요!');
		} else if (nicknamecheck === false) {
			alert('닉네임 형식을 확인해주세요!');
		} else {
			try {
				await instance.get(`/api/users/nickname/${nickname_ref.current.value}`);
				alert('사용 가능한 닉네임 입니다!');
				setNickNameDuple(true);
			} catch (err) {
				console.log(err);
				alert('이미 사용된 닉네임 입니다!');
				setNickNameDuple(false);
			}
		}
	};

	const submitSignup = async () => {
		//input 값에 공란이 있으면 알럿 띄우기
		if (email_ref.current.value === '') {
			alert('아이디를 입력하세요!');
		} else if (nickname_ref.current.value === '') {
			alert('닉네임을 입력하세요!');
		} else if (pw_ref.current.value === '') {
			alert('비밀번호를 입력하세요!');
		} else if (pwcheck_ref.current.value === '') {
			alert('비밀번호를 다시 입력하세요!');
		} else if (userType === null) {
			alert('유저 타입을 선택해주세요!');
		} else if (idduple === null) {
			alert('아이디 확인이 필요해요!');
		} else if (nicknameduple === null) {
			alert('닉네임 확인이 필요해요!');
		}

		if (emailcheck && nicknamecheck && pwcheck && pwrecheck && userType && idduple && nicknameduple) {
			const user_data = {
				username: email_ref.current.value,
				nickname: nickname_ref.current.value,
				password: pw_ref.current.value,
				checkPassword: pwcheck_ref.current.value,
				user_type: userType
			};

			try {
				await instance.post('/api/signup', user_data);
				alert('회원가입이 완료되었습니다!');
				navigate('/login');
			} catch (err) {
				console.log(err);
				alert('회원가입에 문제가 생겼어요!');
			}
		}
	};

	return (
		<SignupWrapper>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<SingupContent>
				<p>아이디</p>
				<IdBox>
					<>
						<input placeholder="이메일 형식" ref={email_ref} onChange={idCheck} />
						<button
							className={emailcheck === null ? 'btnstart' : emailcheck ? '' : 'btnfalse'}
							disabled={emailcheck ? false : true}
							onClick={submitId}
						>
							{' '}
							중복 확인
						</button>
					</>
					{emailcheck === null ? (
						<None />
					) : emailcheck ? (
						<None />
					) : (
						<Fail>
							<p>이메일 형식으로 작성해주세요!</p>
						</Fail>
					)}
				</IdBox>

				<p>비밀번호</p>
				<PwBox>
					<input type="password" placeholder="영문/숫자 8-20자, 특수문자(!@#$%^&.*)포함 " ref={pw_ref} onChange={pwCheck} />
					{pwcheck === null ? (
						<None />
					) : pwcheck ? (
						<None />
					) : (
						<Fail>
							<p>특수문자를 포함 영문/숫자(8-20자)으로 작성해주세요!</p>
						</Fail>
					)}
					<input type="password" placeholder="비밀번호 확인" ref={pwcheck_ref} onChange={pwReCheck} />
					{pwrecheck === null ? (
						<None />
					) : pwrecheck ? (
						<None />
					) : (
						<Fail>
							<p>입력하신 비밀번호와 다릅니다!</p>
						</Fail>
					)}
				</PwBox>

				<p>닉네임</p>
				<NicknameBox>
					<input placeholder="한글/영문/숫자, 2-10자리 이하" ref={nickname_ref} onChange={nickNameCheck} />
					<button
						className={nicknamecheck === null ? 'btnstart' : nicknamecheck ? '' : 'btnfalse'}
						disabled={nicknamecheck ? false : true}
						onClick={submitNickName}
					>
						{' '}
						중복 확인
					</button>
				</NicknameBox>
				{nicknamecheck === null ? (
					<None />
				) : nicknamecheck ? (
					<None />
				) : (
					<Fail>
						<p>2-10자리 한글/영문/숫자를 입력해주세요!</p>
					</Fail>
				)}

				<UsertypeBox>
					<select name="userType" onChange={selectUserType}>
						<option value="SEEKER">취준생</option>
						<option value="JUNIOR">주니어</option>
						<option value="SENIOR">시니어</option>
					</select>
				</UsertypeBox>

				<SignupBottom>
					<button className={idduple && nicknameduple ? '' : 'btnfalse'} type="submit" onClick={submitSignup}>
						가입하기
					</button>
					<Link to="/login">
						<p>회원 로그인 바로가기</p>
					</Link>
					<hr />
				</SignupBottom>
			</SingupContent>
		</SignupWrapper>
	);
};

export default Signup;

const SignupWrapper = styled.div`
	background: #ffffff;
	display: flex;
	flex-direction: column;

	padding-top: 80px;

	button {
		cursor: pointer;
	}

	.btnstart {
		cursor: not-allowed;
	}

	.btnfalse {
		background: #3549ff9e;
		cursor: not-allowed;
	}
`;

const SingupContent = styled.div`
	margin-left: auto;
	margin-right: auto;
	p {
		color: #757575;
		font-size: 14px;
		margin-bottom: 9px;
	}

	input {
		box-sizing: border-box;
		height: 46px;
		background: #ffffff;
		border: 1.5px solid #d8d8d8;
		border-radius: 8px;
		padding: 14px;
		::placeholder {
			color: black;
		}
	}

	button {
		width: 128px;
		height: 46px;
		background: #3549ff;
		border-radius: 8px;
		border: none;

		font-family: 'Apple SD Gothic Neo';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 19px;
		letter-spacing: -0.3px;

		color: #ffffff;
	}
`;

const IdBox = styled.div`
	margin-bottom: 27px;

	input {
		width: 203px;
		margin-right: 5px;
	}
`;

const PwBox = styled.div`
	width: 336px;
	display: flex;
	flex-direction: column;
	margin-bottom: 37px;
	input:first-child {
		margin-bottom: 8px;
	}
`;

const NicknameBox = styled.div`
	display: flex;
	input {
		margin-right: 5px;
		width: 203px;
	}
`;

const UsertypeBox = styled.div`
	margin-top: 27px;

	select {
		box-sizing: border-box;

		height: 46px;
		width: 338px;

		background: #ffffff;
		border: 1.5px solid #d8d8d8;
		border-radius: 8px;

		color: #8d8d8d;
	}

	select option {
		font-family: 'Apple SD Gothic Neo';
		font-style: normal;
		font-size: 16px;
		line-height: 19px;
		letter-spacing: -0.3px;
		width: 41px;
		height: 19px;
	}
`;

const SignupBottom = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		color: black;
		text-decoration: none;
	}

	button {
		padding: 18px 0px;
		margin-top: 81px;
		width: 335px;
		height: 60px;
		left: 20px;
		top: 654px;

		background: #3549ff;
		border-radius: 40px;
	}

	p {
		margin-top: 29px;
		margin-bottom: 4px;
		color: #717171;
		font-size: 14px;
	}

	hr {
		width: 135px;
		margin-bottom: 43px;
	}
`;

const None = styled.div`
	display: none;
`;

const Fail = styled.div`
	p {
		margin-top: 2px;
		font-size: 13px;
		padding-left: 10px;
		color: red;
	}
`;
