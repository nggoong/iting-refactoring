import React, { useState, createContext } from 'react';

export const userContext = createContext();

const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({});

	const value = {
		state: { userInfo },
		actions: { setUserInfo }
	};

	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserProvider;
