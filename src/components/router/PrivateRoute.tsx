import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_PATH } from './routePath';
import { useLocation } from 'react-router-dom';

interface Props {
	authenticated: string | null;
	component: ReactElement;
}

const PrivateRoute = ({ authenticated, component: Component }: Props) => {
	const { pathname } = useLocation();
	if (pathname === '/viewer/posting/list') return Component;
	return authenticated ? Component : <Navigate to={AUTH_PATH.LOGIN} />;
};

export default PrivateRoute;
