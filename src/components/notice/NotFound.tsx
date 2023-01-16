import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
	title: string;
	text: string;
}

const ErrorFound = ({ title, text }: Props) => {
	return (
		<NotFoundWrapper>
			<ContentArea>
				<p className="notice-title">{title}</p>
				<p className="notice-text">{text}</p>
				<Link className="notice-home" to="/viewer/posting/list">
					홈으로 가기
				</Link>
			</ContentArea>
		</NotFoundWrapper>
	);
};

export default ErrorFound;

const NotFoundWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	max-width: 480px;
	height: 100vh;
	position: fixed;
	left: 50%;
	top: 0;
	transform: translate(-50%, 0);
	background: white;
	z-index: 99999;
`;

const ContentArea = styled.div`
	width: 100%;
	color: ${({ theme }) => theme.colors.mainBlue};
	text-align: center;
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
	.notice-home {
		display: block;
		margin-top: 20px;
		text-decoration: none;
		color: ${({ theme }) => theme.colors.mainBlue};
	}
`;
