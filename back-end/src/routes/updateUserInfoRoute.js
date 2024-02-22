import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
	path: '/api/users/:userId',
	method: 'put',
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const { userId } = req.params;

		const updates = ({ favoriteFood, hairColor, bio }) =>
			({
				favoriteFood,
				hairColor,
				bio,
			}(req.body));

		if (!authorization)
			return res
				.status(401)
				.json({ message: 'No authorization header sent' });
		//bearer sadhfbdhsafbsdhfbsdbfshd.sdfjsdfn.sdfjksndf
		const token = authorization.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			if (err)
				return res
					.status(401)
					.json({ message: 'Unable to verify token' });

			const { id } = decoded;

			if (id !== userId)
				return res
					.status(403)
					.json({ message: 'Not allowed to update the user data' });

			const db = getDbConnection('react-auth-db');

			const result = await db
				.collection('users')
				.findOneAndUpdate(
					{ _id: ObjectID(id) },
					{ $set: { info: updates } },
					{ returnOriginal: false }
				);
			const { username, isVerified, info } = result.value;
			jwt.sign(
				{
					id,
					username,
					info,
					isVerified,
				},
				process.env.JWT_SECRET,
				{ expiresIn: '2d' },
				(err, token) => {
					if (err) return res.status(200).send(err);
					res.status(200).json({ token });
				}
			);
		});
	},
};
