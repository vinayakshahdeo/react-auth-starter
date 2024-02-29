import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/userInfoPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signupPage';
import PrivateRoute from './auth/privateRoute';
import { PleaseVerifyEmail } from './pages/pleaseVerifyEmail';
import { EmailVerificationLandingPage } from './pages/emailVerificationLandingPage';
import { ForgotPasswordPage } from './pages/forgotPasswordPage';
import { PasswordResetLandingPage } from './pages/passwordResetLandingPage';

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
					<ForgotPasswordPage />
				</Route>
				<Route path='/please-verify'>
					<PleaseVerifyEmail />
				</Route>
				<Route path='/verify-email/:verificationString'>
					<EmailVerificationLandingPage />
				</Route>
				<Route path='/reset-password/:passwordResetCode'>
					<PasswordResetLandingPage />
				</Route>
			</Switch>
		</Router>
	);
};
