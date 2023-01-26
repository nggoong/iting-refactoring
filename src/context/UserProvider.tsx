import React, { useReducer, createContext, PropsWithChildren, Dispatch } from 'react';

interface UserState {
	username: string;
	nickname: string;
	user_type: string;
	isKakao: boolean;
}

const defaultUserInfo = {
	username: '',
	nickname: '',
	user_type: '',
	isKakao: false
};

type Action = { type: 'SET_DEFAULT' } | { type: 'SET_INFO'; info: UserState };
type TypeUserDispatch = Dispatch<Action>;

export const userContextState = createContext<UserState | undefined>(undefined);

export const userContextDispatch = createContext<TypeUserDispatch | undefined>(undefined);

const userReducer = (state: UserState = defaultUserInfo, action: Action) => {
	switch (action.type) {
		case 'SET_DEFAULT': {
			return defaultUserInfo;
		}
		case 'SET_INFO': {
			return { ...state, ...action.info };
		}
		default: {
			return state;
		}
	}
};

const UserProvider = ({ children }: PropsWithChildren) => {
	const [userInfo, dispatch] = useReducer(userReducer, defaultUserInfo);

	return (
		<userContextDispatch.Provider value={dispatch}>
			<userContextState.Provider value={userInfo}>{children}</userContextState.Provider>
		</userContextDispatch.Provider>
	);
};

export default UserProvider;
