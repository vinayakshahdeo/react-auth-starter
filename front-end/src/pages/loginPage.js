import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

const LoginPage = () => {
	const [token, setToken] = useToken();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const history = useHistory();

	const checkLogin = async () => {
		const response = await axios.post('/api/login', { username, password });
		const { token } = response.data;
		setToken(token);
		history.push('/');
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
