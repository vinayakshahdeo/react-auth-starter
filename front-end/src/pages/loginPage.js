import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQueryParams } from '../util/useQueryParams';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';

const LoginPage = () => {
	const [, setToken] = useToken();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [googleOauthUrl, setGoogleOauthUrl] = useState('');

	const { token: oauthToken } = useQueryParams();
	const history = useHistory();

	useEffect(() => {
		if (oauthToken) {
			setToken(oauthToken);
			history.push('/');
		}
	}, [oauthToken, setToken, history]);

	useEffect(() => {
		const loadOauthUrl = async () => {
			try {
				const response = await axios.get('/auth/google/url');
				const {
					data: { url },
				} = response;
				setGoogleOauthUrl(url);
			} catch (error) {
				console.log(error);
			}
		};
		loadOauthUrl();
	}, []);

	const checkLogin = async () => {
		try {
			const response = await axios.post('/api/login', {
				username,
				password,
			});
			const { token } = response.data;
			setToken(token);
			history.push('/');
		} catch (error) {
			setErrorMessage(error);
		}
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
			<button
				disabled={!googleOauthUrl}
				onClick={() => (window.location.href = googleOauthUrl)}
			>
				log in with Google
			</button>
		</div>
	);
};

export default LoginPage;
