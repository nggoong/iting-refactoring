import React from 'react';
import styled from 'styled-components';

interface Props {
	title: string;
	text: string;
}

const Notice = ({ title, text }: Props) => {
	return (
		<NoticeWrapper>
			<ContentArea>
				<p className="notice-title">{title}</p>
				<p className="notice-text">{text}</p>
			</ContentArea>
			<ImageArea></ImageArea>
		</NoticeWrapper>
	);
};

export default Notice;

const NoticeWrapper = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	padding-bottom: 160px;
	/* padding-top:50px; */
	box-sizing: border-box;
	background: white;
	user-select: none;
`;

const ContentArea = styled.div`
	width: 100%;
	color: ${({ theme }) => theme.colors.mainBlue};
	p {
		text-align: center;
	}
	.notice-title {
		font-weight: 700;
		font-size: 30px;
		letter-spacing: -0.3px;
	}
	.notice-text {
		font-weight: 600;
		font-size: 16px;
		letter-spacing: -0.3px;
	}
`;

const ImageArea = styled.div`
	width: 100%;
`;
