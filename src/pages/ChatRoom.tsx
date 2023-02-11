import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SubmitForm from '../components/submitForm/SubmitForm';
import MyBubble from '../components/speechBubble/MyBubble';
import OtherBubble from '../components/speechBubble/OtherBubble';
import Header from '../components/header/Header';
import Notice from '../components/speechBubble/Notice';
import { TypeChatMessage, TypeChatRoomNavigateState } from '../typings';
import { useQueryClient } from '@tanstack/react-query';
import useSock from '../hooks/socket/useSock';

const ChatRoom = () => {
	const [messages, setMessages] = useState<TypeChatMessage[]>([]);
	const nicknameRef = useRef('');
	const chatRef = useRef<HTMLDivElement | null>(null);
	const tempRef = useRef<HTMLDivElement | null>(null);

	const navigate = useNavigate();
	const { state: navigateState } = useLocation() as TypeChatRoomNavigateState;
	const roomId = Number(useParams().roomId);
	const headers = {};
	const { sockConnect, sendMsg, disConnect } = useSock();
	const queryClient = useQueryClient();

	const scrollToBottom = () => {
		chatRef.current!.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		sockConnect(roomId, headers, setMessages, nicknameRef);

		return () => {
			try {
				if (!nicknameRef.current) return;
				disConnect(roomId, headers, nicknameRef.current);
			} catch (e) {
				navigate('/viewer/room');
			}
		};
	}, []);

	const disConnectFunction = () => {
		disConnect(roomId, headers, nicknameRef.current);
	};

	useEffect(() => {
		window.addEventListener('beforeunload', disConnectFunction);
		window.addEventListener('unload', disConnectFunction);
		window.addEventListener('pagehide', disConnectFunction);

		return () => {
			window.removeEventListener('beforeunload', disConnectFunction);
			window.removeEventListener('unload', disConnectFunction);
			window.removeEventListener('pagehide', disConnectFunction);
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
		const msglen = messages.length;
		/**  메세지가 추가될 때 마다 EXIT인지 확인 후 호스트 퇴장? >>게스트 퇴장 */
		if (messages[msglen - 1]?.enter === 'EXIT') {
			if (!navigateState.isHost) {
				alert('호스트가 퇴장하였습니다.');
				(async () => {
					await queryClient.invalidateQueries(['rooms']);
				})();
				navigate('/viewer/room');
			}
		}
	}, [messages]);

	const exeSendMsg = (text: string) => {
		sendMsg(roomId, 'COMM', 'TEXT', text, headers, nicknameRef.current);
	};

	return (
		<ChatRoomWrapper ref={tempRef}>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title={navigateState?.title} />
			<ChatArea>
				{messages?.map((msg, index) =>
					msg.enter === 'ENTER' || msg.enter === 'EXIT' ? (
						<Notice key={index}>{msg.message}</Notice>
					) : msg.nickname === nicknameRef.current ? (
						<MyBubble messageTime={msg.time} key={index}>
							{msg.message}
						</MyBubble>
					) : (
						<OtherBubble messageTime={msg.time} key={index}>
							{msg.message}
						</OtherBubble>
					)
				)}
				<div ref={chatRef} style={{ height: '10px' }}></div>
			</ChatArea>
			<SubmitForm sendMsg={exeSendMsg} />
		</ChatRoomWrapper>
	);
};

export default ChatRoom;

const ChatRoomWrapper = styled.div`
	padding-top: 71px;
	padding-bottom: 65px;
	width: 100%;
`;

const ChatArea = styled.div`
	overflow-y: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
`;
