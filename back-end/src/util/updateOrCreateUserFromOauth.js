import { getDbConnection } from '../db';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
	const {
		id: googleId,
		verified_email: isVerified,
		email: username,
	} = oauthUserInfo;
	const db = getDbConnection('react-auth-db');
	const existingUser = await db.collection('users').findOne({ username });
	if (existingUser) {
		const result = await db
			.collection('users')
			.findOneAndUpdate(
				{ username },
				{ $set: { googleId, isVerified } },
				{ returnOriginal: false }
			);
		return result.value;
	} else {
		const result = await db.collection('users').insertOne({
			username,
			googleId,
			isVerified,
			info: {},
		});
		result.ops[0];
	}
};
