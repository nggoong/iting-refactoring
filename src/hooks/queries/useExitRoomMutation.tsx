import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatroomAPI } from '../../shared/api';

const useExitRoomMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(chatroomAPI.exitRoom, {
		onSuccess: async () => {
			return queryClient.invalidateQueries(['rooms']);
		}
	});
};

export default useExitRoomMutation;
