import { useInfiniteQuery } from '@tanstack/react-query';
import { postingsAPI } from '../../shared/api';

interface Props {
	storecode: string;
	paramHashtag: string;
}

const useScrollSearchPostQuery = ({ storecode, paramHashtag }: Props) => {
	return useInfiniteQuery(
		['postings', 'search', storecode],
		({ pageParam = 0 }) => postingsAPI.fetchSearchPostingsListWithScroll(pageParam, paramHashtag!),
		{
			enabled: !!paramHashtag,
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
			retry: false
		}
	);
};

export default useScrollSearchPostQuery;
