import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
}

const Notice = ({ children }: Props) => {
	return (
		<NoticeWrapper>
			<p>{children}</p>
		</NoticeWrapper>
	);
};

export default Notice;

const NoticeWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 31px;
	width: 100%;
	background: ${({ theme }) => theme.colors.lightBlue};
	margin-bottom: 10px;
	p {
		color: #7986f7;
		font-weight: 700;
		font-size: 13px;
		letter-spacing: -0.3px;
	}
`;
