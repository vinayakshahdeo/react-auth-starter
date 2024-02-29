import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';

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
		const verificationString = uuid();

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
			verificationString,
		});
		const { insertedId } = result;
		// console.log(verificationString);
		try {
			await sendEmail({
				to: username,
				from: 'vinayak.shahdeo.9@gmail.com',
				subject: 'Please verify your email address',
				text: `Thanks for signing up! To verify your email click here:
				http://localhost:3000/verify-email/${verificationString}`,
			});
		} catch (error) {
			console.log(err);
			res.sendStatus(500);
		}

		jwt.sign(
			{
				id: insertedId,
				username,
				info: basicInfo,
				isVerified: false,
				verificationString,
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
