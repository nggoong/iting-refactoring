import React, { useEffect } from 'react';
import styled from 'styled-components';
import { postingsAPI } from '../shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Loading from '../components/loading/Loading';
import { Helmet } from 'react-helmet';
import Header from '../components/header/Header';
import CommentInPostCard from '../components/card/CommentInPostCard';

import { TypeCommentInPost } from '../typings';

const CommentInPost = () => {
	const { ref, inView } = useInView();

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		['commentInPost'],
		({ pageParam = 0 }) => postingsAPI.fetchCommentInPostListWithScroll(pageParam),
		{
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
			retry: false
		}
	);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView]);

	return (
		<CommentInPostWrapper>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title="댓글 단 글" isAction={true} />
			<CardList>
				{data?.pages.map((page, index) => (
					<Page key={index}>
						{page.posts.map((data: TypeCommentInPost, index: number) => (
							<CommentInPostCard key={index} data={data} />
						))}
					</Page>
				))}
			</CardList>
			{isFetchingNextPage ? <Loading /> : <div ref={ref} style={{ height: '70px' }}></div>}
		</CommentInPostWrapper>
	);
};

export default CommentInPost;

const CommentInPostWrapper = styled.div``;

const CardList = styled.div`
	margin-top: 60px;
`;

const Page = styled.div`
	display: flex;
	flex-direction: column;
`;
