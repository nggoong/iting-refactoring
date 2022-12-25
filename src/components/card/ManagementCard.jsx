import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ManagementCard = ({ isShow, svg, managementType, pathUrl, feedbackUrl }) => {
	const navigate = useNavigate();
	const ClickHandler = () => {
		if (!feedbackUrl) navigate(pathUrl);
		else window.open(feedbackUrl);
	};
	return (
		<>
			<ManagementWrapper isShow={isShow} onClick={ClickHandler}>
				{svg}
				<p>{managementType}</p>
			</ManagementWrapper>
		</>
	);
};

export default ManagementCard;

const ManagementWrapper = styled.div`
	display: ${(props) => (props.isShow ? 'flex' : 'none')};
	padding: 20px;
	color: #656565;
	border-bottom: 1px solid #e6e6e6;
	cursor: pointer;
	p {
		margin-left: 20px;
	}
`;
