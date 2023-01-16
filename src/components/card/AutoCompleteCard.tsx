import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
	value: {
		hashtag: string;
		count: number;
	};
}

const AutoCompleteCard = ({ value }: Props) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const CompleteCardClickHandler = () => {
		if (pathname.includes('/viewer/room')) {
			navigate(`/viewer/room/search/${value.hashtag}`);
		} else if (pathname.includes('/viewer/posting')) {
			navigate(`/viewer/posting/search/${value.hashtag}`);
		}
	};
	return (
		<AutoCompleteCardWrapper onClick={CompleteCardClickHandler}>
			<AutoCompleteCardContent>
				<p className="auto-comp-icon">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M17.6715 16.0839L14.1874 12.5986C16.7944 9.11501 16.0835 4.17776 12.5996 1.57096C9.11577 -1.03583 4.17811 -0.325041 1.5711 3.15854C-1.03592 6.64213 -0.325068 11.5794 3.15881 14.1862C5.95734 16.2802 9.80107 16.2802 12.5996 14.1862L16.0853 17.6715C16.5233 18.1095 17.2335 18.1095 17.6715 17.6715C18.1095 17.2335 18.1095 16.5234 17.6715 16.0854L17.6715 16.0839ZM7.90827 13.5135C4.81197 13.5135 2.30195 11.0037 2.30195 7.90761C2.30195 4.81157 4.81197 2.30176 7.90827 2.30176C11.0046 2.30176 13.5146 4.81157 13.5146 7.90761C13.5113 11.0023 11.0032 13.5102 7.90827 13.5135Z"
							fill="#838383"
						/>
					</svg>
				</p>
				<p className="auto-hashtag">{`${value?.hashtag}`}</p>
				<p className="auto-comp-count">{`(${value?.count})`}</p>
			</AutoCompleteCardContent>
		</AutoCompleteCardWrapper>
	);
};

export default AutoCompleteCard;

const AutoCompleteCardWrapper = styled.div`
	padding: 10px 23px;
	width: 100%;
	background: #f6f7ff;
	height: 48px;
	box-sizing: border-box;
	border-bottom: 1px solid #b7b7b7;
	cursor: pointer;
	border-radius: 10px;

	&:hover {
		background: rgba(53, 73, 255, 0.3);
	}
`;

const AutoCompleteCardContent = styled.div`
	width: 100%;
	height: 100%;
	color: #838383;
	display: flex;
	align-items: center;

	.auto-comp-icon {
		display: flex;
		align-items: center;
		margin-right: 10px;
	}

	.auto-hashtag {
		margin-right: 5px;
	}
`;
