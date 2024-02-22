import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useUser } from './useUser';
import React from 'react';

const PrivateRoute = (props) => {
	const user = useUser();
	if (!user) {
		return <Redirect to='login' />;
	}
	return <Route {...props} />;
};

export default PrivateRoute;
