import { testRoute } from './testRoute';
import { SignUpRoute } from './signUpRoute';
import { LoginRoute } from './loginRoute';
import { UpdateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
// import { testEmailRoute } from './testEmailRoute';

export const routes = [
	testRoute,
	// testEmailRoute,
	SignUpRoute,
	LoginRoute,
	UpdateUserInfoRoute,
	verifyEmailRoute,
];
