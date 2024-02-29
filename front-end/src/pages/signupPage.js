import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useToken } from '../auth/useToken';

const SignUpPage = () => {
	const [, setToken] = useToken();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();

	const checkSignup = async () => {
		try {
			const response = await axios.post('/api/signup', {
				username,
				password,
			});
			const { token } = await response.data;
			setToken(token);
			history.push('/please-verify');
		} catch (error) {
			setErrorMessage(error);
		}
	};
	return (
		<div className='content-container'>
			<h1>Sign Up</h1>
			{errorMessage && <div className='fail'>{errorMessage}</div>}
			<input
				placeholder='enter your email'
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
