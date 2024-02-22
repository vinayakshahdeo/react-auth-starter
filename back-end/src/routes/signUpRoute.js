import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SignUpRoute = {
	path: '/api/signup',
	method: 'post',
	handler: async (req, res) => {
		const { username, password } = req.body;
		const db = getDbConnection('react-auth-db');
		const user = await db.collection('users').findOne({ username });
		if (user) {
			res.sendStatus(409);
		}
		const passwordHash = await bcrypt.hash(password, 10);
		const basicInfo = {
			hairColor: '',
			favoriteFood: '',
			bio: '',
		};
		const result = await db.collection('users').insertOne({
			username,
			passwordHash,
			info: basicInfo,
			isVerified: false,
		});
		const { insertedId } = result;
		jwt.sign(
			{
				id: insertedId,
				username,
				info: basicInfo,
				isVerified: false,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '2d' },
			(err, token) => {
				if (err) return res.status(500).send(err);
				res.status(200).json({ token });
			}
		);
	},
};
