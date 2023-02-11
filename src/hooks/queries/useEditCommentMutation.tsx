import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsAPI } from '../../shared/api';

const useEditCommentMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(commentsAPI.editComment, {
		onSuccess: async () => {
			queryClient.invalidateQueries(['post']);
		},
		onError: (err: any) => {
			alert(err.response.data);
		}
	});
};

export default useEditCommentMutation;
