import { testRoute } from './testRoute';
import { SignUpRoute } from './signUpRoute';
import { LoginRoute } from './loginRoute';
import { UpdateUserInfoRoute } from './updateUserInfoRoute';
import { VerifyEmailRoute } from './verifyEmailRoute';
// import { testEmailRoute } from './testEmailRoute';
import { ForgotPasswordRoute } from './forgotPasswordRoute';
import { ResetPasswordRoute } from './resetPasswordRoute';

export const routes = [
	testRoute,
	// testEmailRoute,
	SignUpRoute,
	LoginRoute,
	UpdateUserInfoRoute,
	VerifyEmailRoute,
	ForgotPasswordRoute,
	ResetPasswordRoute,
];
