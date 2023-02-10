import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { postingsAPI } from '../../shared/api';

interface Props {
	storecode: QueryKey;
	paramCategory: string;
	paramHashtag: string;
}

const useScrollPostQuery = ({ storecode, paramCategory, paramHashtag }: Props) => {
	return useInfiniteQuery(
		['postings', storecode],
		({ pageParam = 0 }) => postingsAPI.fetchPostingsListWithScroll(pageParam, paramCategory!),
		{
			enabled: !!!paramHashtag,
			staleTime: 3000,
			getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
			retry: false
		}
	);
};

export default useScrollPostQuery;
