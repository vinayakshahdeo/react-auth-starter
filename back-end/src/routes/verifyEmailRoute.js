import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const verifyEmailRoute = {
	path: '/api/verify-email',
	method: 'put',
	handler: async (req, res) => {
		const { verificationString } = req.body;
		const db = getDbConnection('react-auth-db');
		const result = await db.collection('users').findOne({
			verificationString,
		});
		if (!result)
			return res
				.status(401)
				.json({ message: 'The email verification failed' });

		const { _id: id, username, info } = result;

		await db.collection('users').updateOne(
			{ _id: ObjectId(id) },
			{
				$set: { isVerified: true },
			}
		);
		jwt.sign(
			{ id, username, isVerified: true, info },
			process.env.JWT_SECRET,
			{ expiresIn: '2d' },
			(err, token) => {
				if (err) return res.sendStatus(500);
				res.status(200).json({ token });
			}
		);
	},
};
