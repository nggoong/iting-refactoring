import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postingsAPI } from '../../shared/api';
import { useNavigate } from 'react-router';

const usePostMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation(postingsAPI.postPosting, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['postings']);
			return navigate('/viewer/posting/list');
		},
		onError: (err: any) => {
			if (err.response.status === 401) return;
			alert('게시글을 등록하지 못했습니다.');
			navigate('/viewer/posting/list');
		}
	});
};

export default usePostMutation;
