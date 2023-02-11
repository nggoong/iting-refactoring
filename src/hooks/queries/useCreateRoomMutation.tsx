import { useMutation } from '@tanstack/react-query';
import { chatroomAPI } from '../../shared/api';
import { useNavigate } from 'react-router';

interface Props {
	titleInput: string;
}
const useCreateRoomMutation = ({ titleInput }: Props) => {
	const navigate = useNavigate();
	return useMutation(chatroomAPI.createChatRoom, {
		onSuccess: (data) => {
			navigate(`/detail/room/chat/${data}`, { state: { title: titleInput, isHost: true } });
		}
	});
};

export default useCreateRoomMutation;
