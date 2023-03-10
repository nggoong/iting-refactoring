import React, { useRef, memo } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { BiRightArrowCircle } from 'react-icons/bi';
import useAddCommentMutation from '../../hooks/queries/useAddCommentMutation';

interface CommentAddBoxProps {
	isShow?: boolean;
	onSubmit: any;
}

interface Props {
	postingId?: number;
	placeholderText?: string;
	sendMsg?: (messageText: string) => void;
	commentEditStateForSubmit?: boolean;
}

const SubmitForm = ({ postingId, placeholderText, sendMsg, commentEditStateForSubmit }: Props) => {
	const commentInput = useRef<HTMLInputElement | null>(null);
	const location = useLocation();
	const { mutate: commentAddHandler } = useAddCommentMutation({ commentInputRef: commentInput });

	const submitButtonHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!commentInput.current!.value) return;

		if (location.pathname.includes('/detail/room/chat')) {
			sendMsg!(commentInput.current!.value);
			commentInput.current!.value = '';
		} else commentAddHandler({ postingId: postingId!, data: { content: commentInput.current!.value } });
	};

	return (
		<>
			<CommentAddBox onSubmit={submitButtonHandler} isShow={commentEditStateForSubmit}>
				<CommentInputBox>
					<input type="text" placeholder={placeholderText} ref={commentInput} />
					<CommentAddBtn onClick={submitButtonHandler}>
						<BiRightArrowCircle />
					</CommentAddBtn>
				</CommentInputBox>
			</CommentAddBox>
		</>
	);
};

export default memo(SubmitForm);

const CommentAddBox = styled.form<CommentAddBoxProps>`
	background: #efefef;
	margin: 0 auto;
	width: 100%;
	max-width: 480px;
	height: 63px;
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 0);
	display: flex;
	align-items: center;
	${(props) => {
		if (props.isShow === true) {
			return css`
				visibility: hidden;
			`;
		}
	}}
`;

const CommentInputBox = styled.div`
	width: 90%;
	height: 44px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #d8d8d8;
	border-radius: 30px;
	background: white;
	input {
		border: none;
		width: 80%;
		height: 30px;
		background: transparent;
	}
`;

const CommentAddBtn = styled.div`
	margin-top: 5px;
	cursor: pointer;
	color: #3549ff;
	font-size: 30px;
`;
