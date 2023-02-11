import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsAPI } from '../../shared/api';

const useAddCommentMutation = ({ commentInputRef }) => {
	const queryClient = useQueryClient();

	return useMutation(commentsAPI.addComment, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['post']);
			commentInputRef.current.value = '';
		},
		onError: () => {
			alert('댓글 작성에 실패하였습니다.');
		}
	});
};

export default useAddCommentMutation;
