import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postingsAPI } from '../shared/api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import PostingCard from '../components/card/PostingCard';
import Header from '../components/header/Header';
import Notice from '../components/notice/Notice';
import Loading from '../components/loading/Loading';
import ErrorFound from '../components/notice/NotFound';

import { Helmet } from 'react-helmet';
import { TypePosting } from '../typings';

interface PostingViewerWrapperProps {
	paramCategory: string;
}

const PostingViewer = () => {
	const paramCategory = useParams().category;
	const paramHashtag = useParams().hashtag;
	const { ref, inView } = useInView();

	const {
		data: listData,
		fetchNextPage: fetchListNextPage,
		isFetchingNextPage: isListFetching,
		isError: listFetchError
	} = useInfiniteQuery(
		['postings', paramCategory],
		({ pageParam = 0 }) => postingsAPI.fetchPostingsListWithScroll(pageParam, paramCategory!),
		{
			enabled: !!!paramHashtag,
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),

			retry: false
		}
	);

	const {
		data: searchListData,
		fetchNextPage: fetchSearchListNextPage,
		isFetchingNextPage: isSearchListFetching,
		isError: searchListFetchError
	} = useInfiniteQuery(
		['postings', 'search', paramHashtag],
		({ pageParam = 0 }) => postingsAPI.fetchSearchPostingsListWithScroll(pageParam, paramHashtag!),
		{
			enabled: !!paramHashtag,
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
			retry: false
		}
	);

	useEffect(() => {
		if (inView) {
			!paramHashtag ? fetchListNextPage() : fetchSearchListNextPage();
		}
	}, [inView]);

	if (listFetchError || searchListFetchError) {
		return <ErrorFound title={'Error!'} text={'에러가 발생했어요!'} />;
	}

	return (
		<PostingViewerWrapper paramCategory={paramCategory!}>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header />
			{!paramHashtag &&
				(listData!.pages[0]?.posts?.length === 0 ? (
					<Notice title={'게시글이 없습니다!'} text={'첫 게시글을 등록해보세요!'} />
				) : (
					listData!.pages?.map((page, index) => (
						<Page key={index}>
							{page.posts.map((post: TypePosting) => (
								<PostingCard key={post.posting_id} post={post}></PostingCard>
							))}
						</Page>
					))
				))}
			{!paramHashtag ||
				(searchListData!.pages[0]?.posts?.length === 0 ? (
					<Notice title={'게시글이 없습니다!'} text={'다른 해시태그로 검색해보세요!'} />
				) : (
					searchListData!.pages?.map((page, index) => (
						<Page key={index}>
							{page.posts.map((post: TypePosting) => (
								<PostingCard key={post.posting_id} post={post}></PostingCard>
							))}
						</Page>
					))
				))}
			{!paramHashtag && (isListFetching ? <Loading /> : <div ref={ref} style={{ height: '70px' }}></div>)}
			{!paramHashtag || (isSearchListFetching ? <Loading /> : <div ref={ref} style={{ height: '70px' }}></div>)}
		</PostingViewerWrapper>
	);
};

export default PostingViewer;

const PostingViewerWrapper = styled.div<PostingViewerWrapperProps>`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	padding-top: ${(props) => (props.paramCategory === 'mypostings' ? '60px' : '87px')};
`;

const Page = styled.div`
	display: flex;
	flex-direction: column;
`;
