import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';
import { chatroomAPI } from '../shared/api';
import { Helmet } from 'react-helmet';
import SubmitForm from '../components/submitForm/SubmitForm';
import MyBubble from '../components/speechBubble/MyBubble';
import OtherBubble from '../components/speechBubble/OtherBubble';
import Header from '../components/header/Header';
import Notice from '../components/speechBubble/Notice';
import { TypeChatMessage, TypeChatRoomNavigateState } from '../typings';
import useExitRoomMutation from '../hooks/queries/useExitRoomMutation';

const ChatRoom = () => {
	const [messages, setMessages] = useState<TypeChatMessage[]>([]);
	const nicknameRef = useRef('');
	const chatRef = useRef<HTMLDivElement | null>(null);
	const tempRef = useRef<HTMLDivElement | null>(null);

	const navigate = useNavigate();
	const { state: navigateState } = useLocation() as TypeChatRoomNavigateState;
	const roomId = Number(useParams().roomId);

	const sock = new SockJS(`${process.env.REACT_APP_API_URL}/iting`);
	const client = StompJS.over(sock);
	client.debug = null;
	const headers = {};

	const { mutate: exitRoom } = useExitRoomMutation();

	const disConnect = () => {
		client.send(
			`/api/pub/${roomId}`,
			headers,
			JSON.stringify({
				enter: 'EXIT',
				messageType: 'TEXT',
				nickname: nicknameRef.current,
				message: `${nicknameRef.current}님이 퇴장하였습니다.`
			})
		);
		client.disconnect(() => {
			exitRoom(roomId);
		}, {});
	};
	const socketReConnectFunc = (stompClient: StompJS.Client, callback: () => void) => {
		setTimeout(() => {
			/** Stomp.client에는 ws.readyState라는 integer 값이 있는데, 소켓 연결이 완료되었을 경우 이 값은 1로 설정됨 */
			/** 연결이 완료 되었으면 callback을 실행함 */
			if (stompClient.ws.readyState === 1) {
				callback();
			} else {
				/** 연결이 되지 않았을 경우 다시 실행 */
				socketReConnectFunc(stompClient, callback);
			}
		}, 1);
	};

	const sendMsg = (messageText: string) => {
		const sendMessage = {
			enter: 'COMM',
			messageType: 'TEXT',
			nickname: nicknameRef.current,
			message: messageText
		};
		socketReConnectFunc(client, () => {
			client.send(`/api/pub/${roomId}`, headers, JSON.stringify(sendMessage));
		});
	};

	const scrollToBottom = () => {
		chatRef.current!.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		client.connect(
			headers,
			async () => {
				client.subscribe(`/api/sub/${roomId}`, (data) => {
					const newMessage = JSON.parse(data.body);
					setMessages((prev) => [...prev, newMessage]);
				});

				try {
					const res = await chatroomAPI.enterRoom(roomId);
					nicknameRef.current = res.data;
					client.send(
						`/api/pub/${roomId}`,
						headers,
						JSON.stringify({
							enter: 'ENTER',
							messageType: 'TEXT',
							nickname: nicknameRef.current
						})
					);
				} catch (err) {
					alert('방이 꽉 찼습니다!');
					navigate('/viewer/room');
					return;
				}
			},
			() => {
				alert('채팅방 연결 실패!');
				navigate('/viewer/room');
			}
		);

		return () => {
			try {
				if (!nicknameRef.current) return;
				disConnect();
			} catch (e) {
				navigate('/viewer/room');
			}
		};
	}, []);

	const reloadFunction = () => {
		disConnect();
		navigate('/viewer/room');
	};

	useEffect(() => {
		window.addEventListener('beforeunload', reloadFunction);
		window.addEventListener('unload', disConnect); // 브라우저를 닫았을 때
		window.addEventListener('pagehide', disConnect);

		return () => {
			window.removeEventListener('beforeunload', reloadFunction);
			window.removeEventListener('unload', disConnect);
			window.removeEventListener('pagehide', disConnect);
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
		const msglen = messages.length;
		/**  메세지가 추가될 때 마다 EXIT인지 확인 후 호스트 퇴장? >>게스트 퇴장 */
		if (messages[msglen - 1]?.enter === 'EXIT') {
			if (!navigateState.isHost) {
				alert('호스트가 퇴장하였습니다.');
				navigate('/viewer/room');
			}
		}
	}, [messages]);

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
			<SubmitForm sendMsg={sendMsg} />
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
