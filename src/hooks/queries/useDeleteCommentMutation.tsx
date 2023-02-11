import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsAPI } from '../../shared/api';

const useDeleteCommentMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(commentsAPI.deleteComment, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['post']);
		},
		onError: (err: any) => {
			alert(err.response.data);
		}
	});
};

export default useDeleteCommentMutation;
