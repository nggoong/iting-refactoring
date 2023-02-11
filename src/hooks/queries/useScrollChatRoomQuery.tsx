import { useInfiniteQuery } from '@tanstack/react-query';
import { chatroomAPI } from '../../shared/api';

interface Props {
	paramHashtag: string;
}

const useScrollChatRoomQuery = ({ paramHashtag }: Props) => {
	return useInfiniteQuery(['room'], ({ pageParam = 1 }) => chatroomAPI.fetchRoomsListWithScroll(pageParam), {
		enabled: !!!paramHashtag,
		staleTime: 3000,
		getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
		retry: false
	});
};

export default useScrollChatRoomQuery;
