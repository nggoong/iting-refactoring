import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import RoomCard from '../components/card/RoomCard';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Notice from '../components/notice/Notice';
import Loading from '../components/loading/Loading';
import { Helmet } from 'react-helmet';
import ErrorFound from '../components/notice/NotFound';
import { TypeChatRoom } from '../typings';
import useScrollChatRoomQuery from '../hooks/queries/useScrollChatRoomQuery';
import useScrollSearchChatRoomQuery from '../hooks/queries/useScrollSearchChatRoomQuery';

const RoomViewer = () => {
	const paramHashtag = useParams().hashtag;
	const { ref, inView } = useInView();

	const {
		data: listData,
		fetchNextPage: listFetchNextPage,
		isFetchingNextPage: isListFetchingNextPage,
		isError: listFetchError
	} = useScrollChatRoomQuery({ paramHashtag: paramHashtag! });
	const {
		data: searchListData,
		fetchNextPage: searchFetchNextPage,
		isFetchingNextPage: isSearchFetchingNextPage,
		isError: searchListFetchError
	} = useScrollSearchChatRoomQuery({ storecode: paramHashtag!, paramHashtag: paramHashtag! });

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
				(listData!.pages[0]?.rooms?.length === 0 ? (
					<Notice title={'채팅방이 없습니다!'} text={'채팅방을 개설하고 대화해보세요!'} />
				) : (
					listData!.pages?.map((page, index) => (
						<Page key={index}>
							{page.rooms.map((room: TypeChatRoom) => (
								<RoomCard key={room.roomId} room={room}></RoomCard>
							))}
						</Page>
					))
				))}
			{!paramHashtag ||
				(searchListData!.pages[0]?.rooms?.length === 0 ? (
					<Notice title={'채팅방이 없습니다!'} text={'다른 해시태그로 검색해보세요!'} />
				) : (
					searchListData!.pages?.map((page, index) => (
						<Page key={index}>
							{page.rooms.map((room: TypeChatRoom) => (
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
	width: 100%;
	padding-top: 119px;
	padding-bottom: 71px;
`;

const Page = styled.div`
	display: flex;
	flex-direction: column;
`;
