import React from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { postingsAPI } from '../../shared/api';
import { AiOutlinePlus } from 'react-icons/ai';

const PageTitle = ({ title, isAction, postActions }) => {
	const queryClient = useQueryClient();
	const location = useLocation();
	const navigate = useNavigate();
	const postingId = useParams().postingId;
	const pathname = location.pathname;

	const postEditNavigateHandler = () => {
		navigate(`/posting/edit/${postingId}`);
	};

	const { mutate: deletePosting } = useMutation(postingsAPI.postDelete, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['postings']);
			return navigate('/viewer/posting/list');
		},
		onError: (err) => {
			if (err.response.status === 401) return;
			alert('게시글을 삭제하지 못했습니다.');
			navigate('/viewer/posting/list');
		}
	});
	const postDeleteHandler = async () => {
		const result = window.confirm('게시글을 삭제하시겠습니까?');
		if (result) {
			deletePosting(postingId);
		}
	};

	const backBtnHandler = () => {
		if (pathname === `/detail/posting/${postingId}`) {
			navigate('/viewer/posting/list');
		} else {
			navigate(-1);
		}
	};

	if (pathname === '/viewer/posting/list' || pathname.includes('/viewer/posting/search')) return <PageTitleEmpty />;
	return (
		<PageTitleWrapper>
			<PageTitleContent>
				{/* <div className='back-icon' onClick={()=>navigate(-1)}><p><MdArrowBackIosNew/></p></div> */}
				<div className="back-icon" onClick={backBtnHandler}>
					<p>
						<MdArrowBackIosNew />
					</p>
				</div>
				<p className="page-title-text">{pathname === '/viewer/posting/mypostings' ? '내가 쓴 글' : `${title}`}</p>
				<HeaderActions isShow={isAction}>
					{pathname === '/posting' && <p onClick={postActions}>등록</p>}
					{pathname === `/detail/posting/${postingId}` && (
						<>
							<p onClick={postEditNavigateHandler}>수정</p>
							<p onClick={postDeleteHandler}>삭제</p>
						</>
					)}
					{pathname === `/posting/edit/${postingId}` && <p onClick={postActions}>수정</p>}
					{pathname === '/viewer/room' && (
						<p style={{ fontSize: '25px', color: 'black' }} onClick={() => navigate('/create/room')}>
							<AiOutlinePlus />
						</p>
					)}
					{/* TODO: action이 필요한 페이지의 케이스를 위와 같이 다룸 */}
				</HeaderActions>
			</PageTitleContent>
		</PageTitleWrapper>
	);
};

export default PageTitle;

const PageTitleWrapper = styled.div`
	width: 100%;
	max-width: 480px;
	margin: 0 auto;
	/* background:blue; */
	display: flex;
	align-items: center;
	height: 60px;
	border-bottom: 1px solid lightgray;
	p {
		margin: 0;
	}
`;

const PageTitleContent = styled.div`
	width: calc(100% - 40px);
	margin: 0 auto;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.back-icon p {
		display: flex;
		align-items: center;
		font-size: 20px;
		cursor: pointer;
	}

	.page-title-text {
		max-width: 50%;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	p {
		font-size: 16px;
		letter-spacing: -0.3px;
		font-weight: 600;
	}
`;

const HeaderActions = styled.div`
	color: ${({ theme }) => theme.colors.mainBlue};
	font-size: 16px;
	letter-spacing: -0.3px;
	font-weight: 600;
	display: flex;
	min-width: 30px;
	p {
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	p:first-child {
		margin-right: 5px;
	}
	${(props) => {
		if (props.isShow === false) {
			return css`
				visibility: hidden;
			`;
		}
	}}
`;

const PageTitleEmpty = styled.div`
	height: 27px;
`;
