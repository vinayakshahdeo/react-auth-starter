import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const SignUpPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();

	const checkSignup = () => {
		alert('not done yes?');
	};
	return (
		<div className='content-container'>
			<h1>Sign Up</h1>
			{errorMessage && <div className='fail'>{errorMessage}</div>}
			<input
				placeholder='username'
				value={username}
				onChange={(event) => setUsername(event.target.value)}
			/>
			<input
				type='password'
				value={password}
				placeholder='password'
				onChange={(event) => setPassword(event.target.value)}
			/>
			<input
				type='password'
				value={confirmPassword}
				placeholder='confirm password'
				onChange={(event) => setConfirmPassword(event.target.value)}
			/>
			<button
				disabled={
					!username || !password || confirmPassword !== password
				}
				onClick={checkSignup}
			>
				Sign Up
			</button>
			<button onClick={() => history.push('/login')}>
				Already have an account?
			</button>
		</div>
	);
};

export default SignUpPage;
