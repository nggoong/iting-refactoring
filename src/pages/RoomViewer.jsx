import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import RoomCard from '../components/card/RoomCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { chatroomAPI } from '../shared/api';

import Notice from '../components/notice/Notice';
import Loading from '../components/loading/Loading';

import { Helmet } from 'react-helmet';
import ErrorFound from '../components/notice/NotFound';

const RoomViewer = () => {
	const paramHashtag = useParams().hashtag;
	const { ref, inView } = useInView();
	const navigate = useNavigate();

	const {
		data: listData,
		fetchNextPage: listFetchNextPage,
		isFetchingNextPage: isListFetchingNextPage,
		isError: listFetchError
	} = useInfiniteQuery(['rooms'], ({ pageParam = 1 }) => chatroomAPI.fetchRoomsListWithScroll(pageParam), {
		enabled: !!!paramHashtag,
		staleTime: 3000,
		getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),

		retry: false
	});

	const {
		data: searchListData,
		fetchNextPage: searchFetchNextPage,
		isFetchingNextPage: isSearchFetchingNextPage,
		isError: searchListFetchError
	} = useInfiniteQuery(
		['rooms', 'search', paramHashtag],
		({ pageParam = 0 }) => chatroomAPI.fetchSearchRoomsListWithScroll(pageParam, paramHashtag),
		{
			enabled: !!paramHashtag,
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),

			retry: false
		}
	);

	useEffect(() => {
		if (inView) {
			!paramHashtag ? listFetchNextPage() : searchFetchNextPage();
		}
	}, [inView]);

	if (listFetchError || searchListFetchError) {
		return <ErrorFound title={'Error!'} text={'에러가 발생했어요!'} />;
	}

	return (
		<RoomViewerWrapper>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title={'채팅 리스트'} isAction={true} />
			{!paramHashtag &&
				(listData.pages[0]?.rooms?.length === 0 ? (
					<Notice title={'채팅방이 없습니다!'} text={'채팅방을 개설하고 대화해보세요!'} />
				) : (
					listData.pages?.map((page, index) => (
						<Page key={index}>
							{page.rooms.map((room) => (
								<RoomCard key={room.roomId} room={room}></RoomCard>
							))}
						</Page>
					))
				))}
			{!paramHashtag ||
				(searchListData.pages[0]?.rooms?.length === 0 ? (
					<Notice title={'채팅방이 없습니다!'} text={'다른 해시태그로 검색해보세요!'} />
				) : (
					searchListData.pages?.map((page, index) => (
						<Page key={index}>
							{page.rooms.map((room) => (
								<RoomCard key={room.roomId} room={room}></RoomCard>
							))}
						</Page>
					))
				))}
			{!paramHashtag && (isListFetchingNextPage ? <Loading /> : <div ref={ref} style={{ height: '70px' }}></div>)}
			{!paramHashtag || (isSearchFetchingNextPage ? <Loading /> : <div ref={ref} style={{ height: '50px' }}></div>)}
		</RoomViewerWrapper>
	);
};

export default RoomViewer;

const RoomViewerWrapper = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	/* gap:0.5px; */
	width: 100%;
	/* background:red; */
	padding-top: 119px;
	/* box-sizing:border-box; */
	padding-bottom: 71px;
`;

const Page = styled.div`
	display: flex;
	flex-direction: column;
	/* gap:10px; */
`;
