import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signupPage';
import PrivateRoute from './auth/privateRoute';
export const Routes = () => {
	return (
		<Router>
			<Switch>
				<PrivateRoute path='/' exact>
					<UserInfoPage />
				</PrivateRoute>
				<Route path='/login' exact>
					<LoginPage />
				</Route>
				<Route path='/signup' exact>
					<SignUpPage />
				</Route>
				<Route path='/forgot-password' exact>
					<div>lost t?</div>
				</Route>
			</Switch>
		</Router>
	);
};
