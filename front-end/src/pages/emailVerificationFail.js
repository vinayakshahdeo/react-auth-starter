import { useHistory } from 'react-router-dom';

export const EmailVerificationFail = () => {
	const history = useHistory();
	return (
		<div className='content-container'>
			<h1>Failed!!</h1>
			<p>Something went wrong and we were unable to verify your email</p>
			<button onClick={() => history.push('/signup')}>
				Go to Signup
			</button>
		</div>
	);
};
