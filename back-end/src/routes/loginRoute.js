import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const LoginRoute = {
	path: '/api/login',
	method: 'post',
	handler: async (req, res) => {
		const { username, password } = req.body;
		const db = getDbConnection('react-auth-db');
		const user = await db.collection('users').findOne({ username });
		if (!user) res.sendStatus(401);

		const { _id, isVerified, passwordHash, info } = user;
		// console.log({ user });
		const isCorrect = await bcrypt.compare(password, passwordHash);
		if (isCorrect) {
			jwt.sign(
				{ id: _id, isVerified, info, username },
				process.env.JWT_SECRET,
				{ expiresIn: '2d' },
				(err, token) => {
					if (err) return res.status(500).send(err);
					res.status(200).json({ token });
				}
			);
		} else {
			res.sendStatus(401);
		}
	},
};
