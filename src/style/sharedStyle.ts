import styled from 'styled-components';

export const WhiteBackground = styled.div`
	// position:fixed;
	// left:0;
	// top:0;
	width: 100%;
	max-width: 480px;
	height: 110vh;
	background: white;
	// left:50%;
	// transform: translate(-50%, 0);
`;

export const HRLineDiv = styled.div`
	width: 100%;
	height: 2px;
	border-color: ${({ theme }) => theme.colors.hrGray};
	box-sizing: border-box;
	margin-bottom: 15px;
	background: ${({ theme }) => theme.colors.hrGray};
`;
