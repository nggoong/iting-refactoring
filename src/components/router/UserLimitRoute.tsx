import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
	authenticated: string | null;
	component: ReactElement;
}

const UserLimitRoute = ({ authenticated, component: Component }: Props) => {
	return authenticated ? <Navigate to="/viewer/posting/list" /> : Component;
};

export default UserLimitRoute;
