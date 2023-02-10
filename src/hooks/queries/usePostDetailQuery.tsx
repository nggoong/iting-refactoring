import { useQuery } from '@tanstack/react-query';
import { postingsAPI } from '../../shared/api';

interface Props {
	storecode: string;
	postingId: number;
}

const usePostDetailQuery = ({ storecode, postingId }: Props) => {
	return useQuery(['post', storecode], () => postingsAPI.fetchPostDetail(postingId), {
		refetchOnWindowFocus: false,
		staleTime: 3000,
		retry: false
	});
};

export default usePostDetailQuery;
