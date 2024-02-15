import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom';

import React from 'react';

const PrivateRoute = (props) => {
	const user = null;
	if (!user) {
		return <Redirect to='login' />;
	}
	return <Route {...props} />;
};

export default PrivateRoute;
