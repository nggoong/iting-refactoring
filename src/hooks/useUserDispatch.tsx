import { useContext } from 'react';
import { userContextDispatch } from '../context/UserProvider';

const useUserDispatch = () => {
	const userDispatch = useContext(userContextDispatch);
	if (!userDispatch) throw new Error('User Provider not found!');
	return userDispatch;
};

export default useUserDispatch;
