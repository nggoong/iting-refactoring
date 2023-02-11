import SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';
import useExitRoomMutation from '../queries/useExitRoomMutation';
import { TypeChatMessage } from '../../typings';
import { chatroomAPI } from '../../shared/api';
import { useNavigate } from 'react-router';

const useSock = () => {
	const sock = new SockJS(`${process.env.REACT_APP_API_URL}/iting`);
	const client = StompJS.over(sock);
	client.debug = null;

	const navigate = useNavigate();

	const { mutate: exitRoom } = useExitRoomMutation();

	const socketReConnectFunc = (stompClient: StompJS.Client, callback: () => void) => {
		setTimeout(() => {
			if (stompClient.ws.readyState === 1) {
				callback();
			} else {
				socketReConnectFunc(stompClient, callback);
			}
		}, 1);
	};

	const sendMsg = (roomId: number, enter: string, messageType: string, messageText: string, headers: any, nickname: string) => {
		const newMsg = {
			enter,
			messageType,
			nickname: nickname,
			message: messageText
		};
		socketReConnectFunc(client, () => {
			client.send(`/api/pub/${roomId}`, headers, JSON.stringify(newMsg));
		});
	};

	const disConnect = (roomId: number, headers: any, nickname: string) => {
		client.send(
			`/api/pub/${roomId}`,
			headers,
			JSON.stringify({
				enter: 'EXIT',
				messageType: 'TEXT',
				nickname: nickname,
				message: `${nickname}님이 퇴장하였습니다.`
			})
		);
		client.disconnect(() => {
			exitRoom(roomId);
		});
	};

	const sockConnect = (
		roomId: number,
		headers: any,
		messageStackFunc: React.Dispatch<React.SetStateAction<TypeChatMessage[]>>,
		nicknameRef: React.MutableRefObject<string>
	) => {
		client.connect(
			headers,
			async () => {
				client.subscribe(`/api/sub/${roomId}`, (data) => {
					const newMsg = JSON.parse(data.body);
					messageStackFunc((prev) => [...prev, newMsg]);
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
				} catch (err: any) {
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
	};

	return { sockConnect, sendMsg, disConnect };
};

export default useSock;
