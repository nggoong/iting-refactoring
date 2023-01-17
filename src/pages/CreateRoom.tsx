import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import DeletableBadge from '../components/hashtag/DeletableBadge';
import ErrorFound from '../components/notice/NotFound';
import { WhiteBackground } from '../style/sharedStyle';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { chatroomAPI } from '../shared/api';
import { hashtagValidation } from '../shared/sharedFn';
import { Helmet } from 'react-helmet';

const CreateRoom = () => {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		titleInput: '',
		hashtagInput: ''
	});
	const [hashtag, setHashtag] = useState<string[]>([]);

	const { mutate: createRoom, isError: createRoomError } = useMutation(chatroomAPI.createChatRoom, {
		onSuccess: (data) => {
			navigate(`/detail/room/chat/${data}`, { state: { title: inputs.titleInput, isHost: true } });
		}
	});

	const InputsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const keyupSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Space') {
			if (!inputs.hashtagInput.trim()) {
				setInputs({ ...inputs, hashtagInput: '' });
				return;
			} else {
				const result = inputs.hashtagInput.replace(/[/!@#$%^&*~)(/?><\s]/g, '');
				const valid = hashtagValidation(result, hashtag);
				if (!valid) return;
				else {
					setHashtag([...hashtag, result]);
					setInputs({ ...inputs, hashtagInput: '' });
				}
			}
		}
	};

	const hashtagSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.hashtagInput) {
			return;
		} else {
			const result = inputs.hashtagInput.replace(/[/!@#$%^&*~)(/?><\s]/g, '');
			const valid = hashtagValidation(result, hashtag);
			if (!valid) return;
			else {
				setHashtag([...hashtag, result]);
				setInputs({ ...inputs, hashtagInput: '' });
			}
		}
	};

	const createButtonClickHandler = () => {
		if (!inputs.titleInput) {
			alert('제목을 입력해주세요!');
			return;
		}
		createRoom({ title: inputs.titleInput, hashtag });
	};

	useEffect(() => {
		return () => {
			setInputs({ titleInput: '', hashtagInput: '' });
			setHashtag([]);
		};
	}, []);

	if (createRoomError) return <ErrorFound title={'Error!'} text={'에러가 발생했어요!'} />;
	return (
		<WhiteBackground>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title={'채팅 만들기'} isAction={false} />
			<CreateRoomWrapper>
				<CreateRoomForm onSubmit={(e) => e.preventDefault()}>
					<p>채팅방 제목</p>
					<input
						type="text"
						placeholder="제목을 입력하세요."
						value={inputs.titleInput}
						onChange={InputsChangeHandler}
						name="titleInput"
					></input>
				</CreateRoomForm>
				<CreateRoomForm onSubmit={hashtagSubmitHandler}>
					<p>해시태그 입력</p>
					<input
						type="text"
						placeholder="해시태그를 입력하세요.(6자리 이하)"
						value={inputs.hashtagInput}
						onChange={InputsChangeHandler}
						name="hashtagInput"
						onKeyUp={keyupSpace}
					></input>
				</CreateRoomForm>
				<HashtagArea>
					{hashtag.map((tag, index) => (
						<DeletableBadge key={index} hashtag={hashtag} setHashtag={setHashtag} idx={index}>
							{tag}
						</DeletableBadge>
					))}
				</HashtagArea>
				<CreateButton onClick={createButtonClickHandler}>만들기</CreateButton>
			</CreateRoomWrapper>
		</WhiteBackground>
	);
};

export default CreateRoom;

const CreateRoomWrapper = styled.div`
	width: calc(100% - 40px);
	max-width: 480px;
	padding-top: 100px;
	margin: 0 auto;
`;

const CreateRoomForm = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	p {
		margin-bottom: 8px;
		font-weight: 600;
		font-size: 14px;
		letter-spacing: -0.3px;
	}

	input {
		border: 1.5px solid #d8d8d8;
		border-radius: 8px;
		height: 46px;
		width: 100%;
		box-sizing: border-box;
		padding: 0 10px;
	}
`;

const HashtagArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	div {
		margin-right: 5px;
	}
`;

const CreateButton = styled.button`
	width: 100%;
	background: blue;
	border-radius: 40px;
	height: 60px;
	background: ${({ theme }) => theme.colors.mainBlue};
	color: white;
	font-size: 18px;
	font-weight: 600;
	margin-top: 15vh;
	cursor: pointer;
	border: none;
`;
