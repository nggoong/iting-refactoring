import React, { useState, createContext, PropsWithChildren } from 'react';

interface UserState {
	username: string;
	nickname: string;
	user_type: string;
	isKakao: boolean;
}

export const userContext = createContext<UserState | any>({});

const UserProvider = ({ children }: PropsWithChildren) => {
	const [userInfo, setUserInfo] = useState({});

	const value = {
		state: { userInfo },
		actions: { setUserInfo }
	};

	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserProvider;
