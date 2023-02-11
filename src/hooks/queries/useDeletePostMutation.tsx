import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { postingsAPI } from '../../shared/api';

const useDeletePostMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(postingsAPI.postDelete, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['postings']);
			navigate('/viewer/posting/list');
		},
		onError: (err: any) => {
			if (err.response.status === 401) return;
			alert('게시글을 삭제하지 못했습니다.');
			navigate('/viewer/posting/list');
		}
	});
};

export default useDeletePostMutation;
