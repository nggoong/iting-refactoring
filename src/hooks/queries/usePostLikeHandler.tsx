import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface Props {
	mutateFunction: (postingId: number) => Promise<AxiosResponse<any, any>>;
	postingId: number;
}

const usePostLikeHandler = ({ mutateFunction, postingId }: Props) => {
	const queryClient = useQueryClient();
	return useMutation(() => mutateFunction(postingId), {
		onSuccess: () => {
			queryClient.invalidateQueries(['post']);
		}
	});
};

export default usePostLikeHandler;
