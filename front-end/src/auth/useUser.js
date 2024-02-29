import { useState, useEffect } from 'react';
import { useToken } from './useToken';
export const useUser = () => {
	const [token] = useToken();

	const getPayloadFromToken = (token) => {
		const encodedPayload = token.split('.')[1];
		// console.log({ first: JSON.parse(atob(encodedPayload)) });
		return JSON.parse(atob(encodedPayload));
	};

	const [user, setUser] = useState(() => {
		if (!token) return null;
		return getPayloadFromToken(token);
	});

	useEffect(() => {
		if (!token) setUser(null);
		setUser(getPayloadFromToken(token));
	}, [token]);

	return user;
};
