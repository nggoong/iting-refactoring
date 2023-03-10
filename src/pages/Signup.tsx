import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeSignup } from '../typings';
import { AuthAPI } from '../shared/api';

const Signup = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isSubmitting, errors }
	} = useForm<TypeSignup>({ mode: 'onChange' });
	const [userType, setUserType] = useState('SEEKER');
	const [idduple, setIdDuple] = useState<null | boolean>(null);
	const [nicknameduple, setNickNameDuple] = useState<null | boolean>(null);

	const selectUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserType((e.target as HTMLSelectElement).value);
		console.log(userType);
	};

	const submitId = async () => {
		const { username } = getValues();
		try {
			await AuthAPI.emailDupCheck(username);
			alert('사용 가능한 ID 입니다!');
			setIdDuple(true);
		} catch (err: any) {
			alert(err.response.data);
			setIdDuple(false);
		}
	};

	const submitNickName = async () => {
		const { nickname } = getValues();
		try {
			await AuthAPI.nicknameDupCheck(nickname);
			alert('사용 가능한 닉네임 입니다!');
			setNickNameDuple(true);
		} catch (err: any) {
			alert(err.response.data);
			setNickNameDuple(false);
		}
	};

	const onSubmitSignup: SubmitHandler<TypeSignup> = async (data) => {
		if (!idduple) {
			alert('아이디 확인이 필요해요!');
			return;
		} else if (!nicknameduple) {
			alert('닉네임 확인이 필요해요!');
			return;
		}
		try {
			await AuthAPI.userSignup(data);
			alert('회원가입이 완료되었습니다!');
			return navigate('/login');
		} catch (err) {
			alert('회원가입에 문제가 생겼어요!');
			return;
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
			<SingupContent onSubmit={handleSubmit(onSubmitSignup)}>
				<p>아이디</p>
				<IdBox>
					<input
						placeholder="이메일 형식"
						autoComplete="off"
						{...register('username', {
							required: '이메일 입력은 필수입니다.',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: '이메일 형식에 맞지 않습니다.'
							}
						})}
					/>
					<button
						className={errors.username || !getValues().username ? 'btnfalse' : 'btnstart'}
						type="button"
						disabled={errors.username || !getValues().username ? true : false}
						onClick={submitId}
					>
						{' '}
						중복 확인
					</button>
					{errors.username && <Fail role="alert">{errors.username.message}</Fail>}
				</IdBox>

				<p>비밀번호</p>
				<PwBox>
					<input
						type="password"
						placeholder="영문/숫자 8-20자, 특수문자(!@#$%^&.*)포함 "
						{...register('password', {
							required: '비밀번호 입력은 필수입니다.',
							pattern: {
								value: /(?=.*[@$!%*?&])[0-9a-zA-Z!@#$%^&.*]$/,
								message: '특수문자를 포함 영문/숫자(8-20자)으로 작성해주세요!'
							},
							minLength: {
								value: 8,
								message: '8자리 이상 20자리 미만으로 입력해주세요.'
							},
							maxLength: {
								value: 20,
								message: '8자리 이상 20자리 미만으로 입력해주세요.'
							}
						})}
					/>
					{errors.password && <Fail role="alert">{errors.password.message}</Fail>}
					<input
						type="password"
						placeholder="비밀번호 확인"
						{...register('checkPassword', {
							required: '비밀번호를 확인해주세요.',
							validate: {
								matchesPreviousPassword: (value) => {
									const { password } = getValues();
									return password === value || '비밀번호가 일치하지 않습니다.';
								}
							}
						})}
					/>
					{errors.checkPassword && <Fail role="alert">{errors.checkPassword.message}</Fail>}
				</PwBox>

				<p>닉네임</p>
				<NicknameBox>
					<input
						placeholder="한글/영문/숫자, 2-10자리 이하"
						autoComplete="off"
						{...register('nickname', {
							required: '닉네임을 입력해주세요.',
							pattern: {
								value: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,10}$/,
								message: '2자리 이상 10자리 이하 한글/영문/숫자가 필요합니다.'
							},
							minLength: {
								value: 2,
								message: '2자리 이상 10자리 이하로 입력해주세요.'
							},
							maxLength: {
								value: 10,
								message: '2자리 이상 10자리 이하로 입력해주세요.'
							}
						})}
					/>
					<button
						className={errors.nickname || !getValues().nickname ? 'btnfalse' : 'btnstart'}
						type="button"
						disabled={errors.nickname || !getValues().nickname ? true : false}
						onClick={submitNickName}
					>
						{' '}
						중복 확인
					</button>
				</NicknameBox>
				{errors.nickname && <Fail role="alert">{errors.nickname.message}</Fail>}

				<UsertypeBox>
					<select
						{...register('user_type', {
							onChange: selectUserType
						})}
					>
						<option value="SEEKER">취준생</option>
						<option value="JUNIOR">주니어</option>
						<option value="SENIOR">시니어</option>
					</select>
				</UsertypeBox>

				<SignupBottom>
					<button type="submit" disabled={isSubmitting}>
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

	.btnstart {
		background-color: ${({ theme }) => theme.colors.mainBlue};
		cursor: pointer;
	}

	.btnfalse {
		cursor: not-allowed;
	}
`;

const SingupContent = styled.form`
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
		border-radius: 8px;
		border: none;
		background-color: ${({ theme }) => theme.colors.mainBlue};
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

		background-color: ${({ theme }) => theme.colors.mainBlue};
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

const Fail = styled.div`
	color: red;
	margin-top: 2px;
	font-size: 13px;
	padding-left: 10px;
`;
