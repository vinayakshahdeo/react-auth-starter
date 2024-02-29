import { useHistory } from 'react-router-dom';

export const PasswordResetFailure = () => {
	const history = useHistory();
	return (
		<div className='content-container'>
			<h1>Failed!!</h1>
			<p>
				Something went wrong and we were unable to reset your password
			</p>
			<button onClick={() => history.push('/login')}>
				Back To Login
			</button>
		</div>
	);
};
