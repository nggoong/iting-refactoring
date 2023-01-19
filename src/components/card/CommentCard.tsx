import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { userTypeTrans } from '../../shared/sharedFn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlineLike } from 'react-icons/ai';
import { editPostingTime } from '../../shared/sharedFn';

import instance from '../../shared/axios';
import { userContext } from '../../context/UserProvider';
import { commentsAPI } from '../../shared/api';

interface Props {
	data: any;
	postingId: number;
	commentEditStateForSubmit: boolean;
	setCommentEditStateForSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CommentContentProps {
	isShow: boolean;
}

interface CommentContentEditProps {
	state: boolean;
}

interface CommentLikeBtnProps {
	isLike: boolean;
}

const CommentCard = ({ data, postingId, commentEditStateForSubmit, setCommentEditStateForSubmit }: Props) => {
	const commentEditInput = useRef<HTMLTextAreaElement | null>(null);
	const queryClient = useQueryClient();

	const [commentEditState, setCommentEditState] = useState(false);
	const context = useContext(userContext);
	const { userInfo } = context.state;
	const loginNickname = userInfo.nickname;

	const { mutate: commentEditHandler } = useMutation(commentsAPI.editComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(['post']);
		}
	});

	const { mutate: commentDelHandler } = useMutation(commentsAPI.deleteComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(['post']);
		}
	});

	const commentLike = async (id: string) => {
		if (data.like === true) {
			return await instance.delete(`/api/comment/${id}/likes`);
		} else {
			return await instance.post(`/api/comment/${id}/likes`);
		}
	};

	const { mutate: commentlikeHandler } = useMutation(commentLike, {
		onSuccess: () => {
			queryClient.invalidateQueries(['post']);
		}
	});

	const deleteBtnClickHandler = () => {
		const result = window.confirm('댓글을 삭제하시겠습니까?');
		if (result) commentDelHandler({ postingId, commentId: `${data.id}` });
		else return;
	};

	return (
		<>
			<Comment>
				<CommentWriter>
					<p>{data.nickname}</p>
					<p>{userTypeTrans(data.user_type)}</p>
				</CommentWriter>
				<CommentContent isShow={commentEditStateForSubmit}>{data.content}</CommentContent>
				<CommentContentEdit state={commentEditState}>
					<CommentArea ref={commentEditInput}></CommentArea>
					<CommentEditCancelAndSaveBtn>
						<CommentEditCancelBtn
							onClick={() => {
								setCommentEditState(false);
								setCommentEditStateForSubmit(false);
							}}
						>
							취소
						</CommentEditCancelBtn>
						<CommentEditSaveBtn
							onClick={() => {
								commentEditHandler({ postingId, commentId: `${data.id}`, data: { content: commentEditInput.current!.value } });
								setCommentEditState(false);
								setCommentEditStateForSubmit(false);
							}}
						>
							저장
						</CommentEditSaveBtn>
					</CommentEditCancelAndSaveBtn>
				</CommentContentEdit>
				<CommentLikeAndEditDelBox>
					{data.nickname === loginNickname ? (
						<>
							<CommentDateAndLikeBox>
								<p>{editPostingTime(data.date)}</p>
								<CommentLikeBtn
									onClick={() => {
										commentlikeHandler(`${data.id}`);
									}}
									isLike={data.like}
								>
									<AiOutlineLike />
									{data.like_count}
								</CommentLikeBtn>
							</CommentDateAndLikeBox>
							<CommentEditAndDelBox state={commentEditState}>
								<CommentEdit
									onClick={() => {
										setCommentEditState(true);
										setCommentEditStateForSubmit(true);
										commentEditInput.current!.value = data.content;
									}}
								>
									수정
								</CommentEdit>
								<CommentDel onClick={deleteBtnClickHandler}>삭제</CommentDel>
							</CommentEditAndDelBox>
						</>
					) : (
						<>
							<CommentDateAndLikeBox>
								<p>{editPostingTime(data.date)}</p>
								<CommentLikeBtn
									onClick={() => {
										commentlikeHandler(`${data.id}`);
									}}
									isLike={data.like}
								>
									<AiOutlineLike />
									{data.like_count}
								</CommentLikeBtn>
							</CommentDateAndLikeBox>
						</>
					)}
				</CommentLikeAndEditDelBox>
			</Comment>
		</>
	);
};

export default CommentCard;

const Comment = styled.div`
	padding: 10px 20px;
	text-align: left;
	line-height: 2rem;
	margin: 0 auto;
	box-sizing: border-box;
	border-bottom: 1px solid #e6e6e6;
`;

const CommentWriter = styled.div`
	display: flex;
	font-weight: bold;
	font-size: 15px;
	color: #656565;
	p:last-child {
		color: #3549ff;
		margin-left: 7px;
	}
`;

const CommentContent = styled.div<CommentContentProps>`
	font-size: 16px;
	display: ${(props) => (props.isShow ? 'none' : 'block')};
`;

const CommentContentEdit = styled.div<CommentContentEditProps>`
	display: ${(props) => (props.state ? 'block' : 'none')};
`;

const CommentArea = styled.textarea`
	border: none;
	resize: none;
	width: 94%;
	font-size: 16px;
	padding: 10px;
	border-radius: 5px;
	outline-color: #3549ff;
	margin: 0 auto;
`;

const CommentEditCancelAndSaveBtn = styled.div`
	display: flex;
	justify-content: right;
	height: 30px;
`;

const CommentEditCancelBtn = styled.button`
	width: 50px;
	text-align: center;
	margin-right: 10px;
	border: none;
`;

const CommentEditSaveBtn = styled.button`
	width: 50px;
	background: #3549ff;
	text-align: center;
	color: white;
	border: none;
`;

const CommentLikeAndEditDelBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const CommentDateAndLikeBox = styled.div`
	display: flex;
	color: #656565;
	p {
		display: flex;
		align-items: center;
		margin-right: 10px;
	}
`;

const CommentEditAndDelBox = styled.div<CommentContentEditProps>`
	display: ${(props) => (props.state ? 'none' : 'flex')};
	justify-content: space-between;
	color: #3549ff;
`;

const CommentEdit = styled.div`
	margin-right: 10px;
	cursor: pointer;
`;

const CommentDel = styled.div`
	cursor: pointer;
`;

const CommentLikeBtn = styled.div<CommentLikeBtnProps>`
	cursor: pointer;
	display: flex;
	align-items: center;
	color: ${(props) => props.isLike && '#3549ff'};
	svg {
		margin-right: 3px;
	}
`;
