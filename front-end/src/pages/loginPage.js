import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();

	const checkLogin = () => {
		alert('not done yes?');
	};
	return (
		<div className='content-container'>
			<h1>Log In</h1>
			{errorMessage && <div className='fail'>{errorMessage}</div>}
			<input
				placeholder='username'
				onChange={(event) => setUsername(event.target.value)}
			/>
			<input
				type='password'
				placeholder='password'
				onChange={(event) => setPassword(event.target.value)}
			/>
			<button disabled={!username || !password} onClick={checkLogin}>
				Login
			</button>
			<button onClick={() => history.push('/forgot-password')}>
				Forgot your password
			</button>
			<button onClick={() => history.push('/signup')}>Signup</button>
		</div>
	);
};

export default LoginPage;
