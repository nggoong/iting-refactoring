import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { editPostingTime } from '../../shared/sharedFn';
import { TypeCommentInPost } from '../../typings';

interface Props {
	data: TypeCommentInPost;
}

const CommentInPostCard = ({ data }: Props) => {
	const navigate = useNavigate();

	const cardClickHandler = () => {
		navigate(`/detail/posting/${data.posting_id}`);
	};
	return (
		<CommentInPostCardWrapper onClick={cardClickHandler}>
			<ContentBox>
				<CommentBox>
					<p>{data.comment_content}</p>
				</CommentBox>
				<DateBox>
					<p>{editPostingTime(data.localDateTime)}</p>
				</DateBox>
				<TitleBox>
					<p>원문</p>
					<p>{data.title}</p>
				</TitleBox>
			</ContentBox>
		</CommentInPostCardWrapper>
	);
};

export default CommentInPostCard;

const CommentInPostCardWrapper = styled.div`
	background: white;
	color: #656565;
	box-sizing: border-box;
	border-bottom: 1px solid lightgray;
	margin-bottom: 5px;
	cursor: pointer;
`;

const ContentBox = styled.div`
	padding: 15px;
`;

const CommentBox = styled.div`
	color: black;
	font-size: 18px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	margin-bottom: 7px;
`;

const DateBox = styled.div`
	margin-bottom: 7px;
`;

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	p:first-child {
		color: ${({ theme }) => theme.colors.mainBlue};
		box-sizing: border-box;
		border: 1px solid;
		border-color: ${({ theme }) => theme.colors.mainBlue};
		border-radius: 30px;
		padding: 5px;
		margin-right: 5px;
	}
`;
