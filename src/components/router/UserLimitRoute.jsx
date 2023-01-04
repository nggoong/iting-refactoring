import React from 'react';
import { Navigate } from 'react-router-dom';

const UserLimitRoute = ({ authenticated, component: Component }) => {
	return authenticated ? <Navigate to="/viewer/posting/list" /> : Component;
};

export default UserLimitRoute;
