import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const ForgotPasswordPage = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [emailValue, setEmailValue] = useState('');
	const history = useHistory();
	const onSubmitClick = async () => {
		try {
			await axios.put(`/api/forgot-password/${emailValue}`);
			setSuccess(true);
			setTimeout(() => {
				history.push('/login');
			}, 3000);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};
	return success ? (
		<div className='content-container'>
			<h1>Success</h1>
			<p>check your email for a reset password link.</p>
		</div>
	) : (
		<div className='content-container'>
			<h1>Forgot your password</h1>
			<p>Enter your password to get a reset link.</p>

			<input
				value={emailValue}
				onChange={(e) => setEmailValue(e.target.value)}
				placeholder='Enter your email'
			/>
			{errorMessage && <div className='fail'>{errorMessage}</div>}
			<button disabled={!emailValue} onClick={onSubmitClick}>
				Send Link
			</button>
		</div>
	);
};
