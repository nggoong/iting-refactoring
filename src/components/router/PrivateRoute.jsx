import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_PATH } from './routePath';
import { useLocation } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component }) => {
	const { pathname } = useLocation();
	if (pathname === '/viewer/posting/list') return Component;
	return authenticated ? Component : <Navigate to={AUTH_PATH.LOGIN} {...alert('로그인이 필요합니다.')} />;
};

export default PrivateRoute;
