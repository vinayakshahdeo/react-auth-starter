import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { PasswordResetFailure } from './passwordResetFailure';
import { PasswordResetSuccess } from './passwordResetSuccess';
import { useState } from 'react';

export const PasswordResetLandingPage = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailure, setIsFailure] = useState(false);
	const [passwordValue, setPasswordValue] = useState(false);
	const [confirmPasswordValue, setConfirmPasswordValue] = useState(false);

	const { passwordResetCode } = useParams();

	const submitHandler = async () => {
		try {
			await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
				newPassword: passwordValue,
			});
			setIsSuccess(true);
		} catch (error) {
			setIsFailure(true);
		}
	};

	if (isSuccess) return <PasswordResetSuccess />;
	if (isFailure) return <PasswordResetFailure />;

	return (
		<div className='content-container'>
			<h1>Reset Password</h1>
			<p>Please enter a new passowrd</p>
			<input
				type='password'
				value={passwordValue}
				autoComplete='new-password'
				onChange={(e) => setPasswordValue(e.target.value)}
				placeholder={'Password'}
			/>
			<input
				type='password'
				autoComplete='new-password'
				value={confirmPasswordValue}
				onChange={(e) => setConfirmPasswordValue(e.target.value)}
				placeholder={'Confirm password'}
			/>
			<button
				onClick={submitHandler}
				disabled={
					!passwordValue.length > 4 ||
					passwordValue !== confirmPasswordValue
				}
			>
				Reset Password
			</button>
		</div>
	);
};
