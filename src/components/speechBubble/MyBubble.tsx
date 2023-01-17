import React from 'react';
import styled from 'styled-components';

interface Props {
	messageTime: string;
	children: string;
}

const MyBubble = ({ messageTime, children }: Props) => {
	return (
		<MyBubbleWrapper>
			<MyBubbleBox>
				<BubbleTime>{messageTime}</BubbleTime>
				<Bubble>{children}</Bubble>
			</MyBubbleBox>
		</MyBubbleWrapper>
	);
};

export default MyBubble;

const MyBubbleWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-bottom: 10px;
`;

const MyBubbleBox = styled.div`
	padding-right: 20px;
	display: flex;
	justify-content: flex-end;
	width: 80%;
`;
const BubbleTime = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	color: #99a1ee;
	min-width: 25%;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: -0.3px;
	margin-right: 5px;
`;

const Bubble = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* text-align:end; */
	padding: 10px;

	border-radius: 20px;
	font-size: 14px;
	line-height: 20px;
	font-weight: 500;
	background: ${({ theme }) => theme.colors.mainBlue};
	color: white;
`;
