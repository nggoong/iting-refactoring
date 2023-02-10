import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postingsAPI } from '../../shared/api';
import { useNavigate } from 'react-router';

interface Props {
	postingId: number;
}

const usePostEditMutation = ({ postingId }: Props) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(postingsAPI.postEditing, {
		onSuccess: async () => {
			alert('게시글이 수정되었습니다.');
			await queryClient.invalidateQueries(['postings']);
			return navigate(`/detail/posting/${postingId}`);
		},
		onError: (err: any) => {
			if (err.response.status === 401) return;
			alert('게시글을 수정하지 못했습니다.');
			navigate('/viewer/posting/list');
		}
	});
};

export default usePostEditMutation;
