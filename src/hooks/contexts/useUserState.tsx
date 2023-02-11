import { useContext } from 'react';
import { userContextState } from '../../context/UserProvider';

const useUserState = () => {
	const userState = useContext(userContextState);
	if (!userState) throw new Error('User Provider not found!');
	return userState;
};

export default useUserState;
