import React from 'react';
import styled from 'styled-components';
import NomalBadge from '../hashtag/NomalBadge';
import { useNavigate } from 'react-router-dom';
import { userTypeTrans } from '../../shared/sharedFn';
import { FiChevronRight } from 'react-icons/fi';

const RoomCard = ({ room }) => {
	const navigate = useNavigate();

	const roomCardClickHandler = () => {
		if (room.isfull) {
			alert('채팅방이 꽉 찼습니다.');
			return;
		} else navigate(`/detail/room/chat/${room.roomId}`, { state: { title: `${room.title}`, isHost: false } });
	};

	return (
		<RoomCardWrapper onClick={roomCardClickHandler}>
			<RoomCardContent>
				<RoomCardTitle>
					<p>{room.title}</p>
				</RoomCardTitle>
				<RoomCardUserInfo>
					<p className="room-host-nickname">{room.nickname}</p>
					<p className="room-host-level">{userTypeTrans(room.user_type)}</p>
				</RoomCardUserInfo>
				<RoomCardHashtagArea>
					{room.hashtag.map((tag, index) => (
						<NomalBadge key={index}>{`# ${tag}`}</NomalBadge>
					))}
				</RoomCardHashtagArea>
			</RoomCardContent>
			<RoomCardPersonCount>
				{room.isfull || (
					<p>
						1/2 <FiChevronRight />
					</p>
				)}
				{room.isfull && (
					<p style={{ color: 'red' }}>
						2/2 <FiChevronRight />
					</p>
				)}
			</RoomCardPersonCount>
		</RoomCardWrapper>
	);
};

export default RoomCard;

const RoomCardWrapper = styled.div`
	display: flex;
	width: 100%;
	padding: 20px;
	box-sizing: border-box;
	border-top: 2px solid;
	border-bottom: 2px solid;
	border-color: ${({ theme }) => theme.colors.hrGray};
	cursor: pointer;
	background: white;
	/* background:red; */
`;

const RoomCardContent = styled.div`
	/* background:blue; */
	width: 90%;
`;

const RoomCardTitle = styled.div`
	width: 100%;
	font-size: 17px;
	font-weight: 600;
	line-height: 20px;
	letter-spacing: -0.3px;
	margin-bottom: 6px;
`;

const RoomCardUserInfo = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 10px;

	.room-host-nickname {
		font-size: 13px;
		letter-spacing: -0.3px;
		color: ${({ theme }) => theme.colors.darkGray};
		font-weight: 500;
		margin-right: 8px;
	}

	.room-host-level {
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.3px;
		color: ${({ theme }) => theme.colors.mainBlue};
	}
`;

const RoomCardHashtagArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	div {
		margin-right: 2.5px;
	}
`;

const RoomCardPersonCount = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	/* background:yellow; */
	width: 10%;
	p {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 15px;
		letter-spacing: -0.3px;
		color: ${({ theme }) => theme.colors.mainBlue};
		margin-bottom: 5px;
		svg {
			font-size: 15px;
		}
	}
`;
