import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface Props {
	mutateFunction: (id: string) => Promise<AxiosResponse<any, any>>;
}

const useCommentLikeMutation = ({ mutateFunction }: Props) => {
	const queryClient = useQueryClient();
	return useMutation(mutateFunction, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['post']);
		},
		onError: (err: any) => {
			alert(err.response.data);
		}
	});
};

export default useCommentLikeMutation;
