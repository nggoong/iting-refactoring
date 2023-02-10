import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { chatroomAPI } from '../../shared/api';

interface Props {
	storecode: QueryKey;
	paramHashtag: string;
}

const useScrollSearchChatRoomQuery = ({ storecode, paramHashtag }: Props) => {
	return useInfiniteQuery(
		['rooms', 'search', storecode],
		({ pageParam = 0 }) => chatroomAPI.fetchSearchRoomsListWithScroll(pageParam, paramHashtag!),
		{
			enabled: !!paramHashtag,
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
			retry: false
		}
	);
};

export default useScrollSearchChatRoomQuery;
